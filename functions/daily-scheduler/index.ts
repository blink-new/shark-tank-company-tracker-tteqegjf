import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface SchedulerConfig {
  enabled: boolean;
  schedule: string; // Cron format
  timezone: string;
  batchSize: number;
  sources: string[];
  lastRun?: string;
  nextRun?: string;
}

interface ScrapingJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  companiesProcessed: number;
  errors: string[];
  results?: any;
}

const DEFAULT_CONFIG: SchedulerConfig = {
  enabled: true,
  schedule: '0 6 * * *', // Daily at 6 AM EST
  timezone: 'America/New_York',
  batchSize: 10,
  sources: ['comprehensive-scraper', 'news-apis', 'social-media', 'company-websites']
};

// In production, this would be stored in a database
let currentJob: ScrapingJob | null = null;
let schedulerConfig: SchedulerConfig = DEFAULT_CONFIG;

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  try {
    const url = new URL(req.url);
    const action = url.searchParams.get('action') || 'status';

    if (req.method === 'GET') {
      switch (action) {
        case 'status':
          return handleGetStatus();
        case 'config':
          return handleGetConfig();
        case 'job':
          return handleGetCurrentJob();
        default:
          return handleGetStatus();
      }
    }

    if (req.method === 'POST') {
      const body = await req.json();
      const { action: postAction } = body;

      switch (postAction) {
        case 'trigger_now':
          return await handleTriggerNow();
        case 'check_schedule':
          return await handleCheckSchedule();
        case 'update_config':
          return await handleUpdateConfig(body.config);
        case 'stop_job':
          return await handleStopJob();
        default:
          return new Response('Invalid action', { status: 400 });
      }
    }

    return new Response('Method not allowed', { status: 405 });

  } catch (error) {
    console.error('Scheduler error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
});

async function handleGetStatus(): Promise<Response> {
  const nextRun = getNextRunTime();
  const lastRun = schedulerConfig.lastRun;
  
  return new Response(JSON.stringify({
    status: schedulerConfig.enabled ? 'active' : 'disabled',
    config: schedulerConfig,
    currentJob: currentJob,
    nextRun: nextRun.toISOString(),
    lastRun: lastRun,
    uptime: getUptime(),
    message: `Daily scraper scheduler is ${schedulerConfig.enabled ? 'active' : 'disabled'}`
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function handleGetConfig(): Promise<Response> {
  return new Response(JSON.stringify({
    success: true,
    config: schedulerConfig
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function handleGetCurrentJob(): Promise<Response> {
  return new Response(JSON.stringify({
    success: true,
    job: currentJob
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function handleTriggerNow(): Promise<Response> {
  if (currentJob && currentJob.status === 'running') {
    return new Response(JSON.stringify({
      success: false,
      message: 'A scraping job is already running',
      currentJob: currentJob
    }), {
      status: 409,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const jobId = `manual-${Date.now()}`;
  await startScrapingJob(jobId, 'manual');

  return new Response(JSON.stringify({
    success: true,
    message: 'Scraping job triggered manually',
    jobId: jobId,
    timestamp: new Date().toISOString()
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function handleCheckSchedule(): Promise<Response> {
  if (!schedulerConfig.enabled) {
    return new Response(JSON.stringify({
      success: true,
      message: 'Scheduler is disabled',
      nextRun: null
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const shouldRun = shouldRunNow();
  
  if (shouldRun && (!currentJob || currentJob.status !== 'running')) {
    const jobId = `scheduled-${Date.now()}`;
    await startScrapingJob(jobId, 'scheduled');
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Daily scraping job executed',
      jobId: jobId,
      nextRun: getNextRunTime().toISOString()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } else {
    return new Response(JSON.stringify({
      success: true,
      message: shouldRun ? 'Job already running' : 'Not scheduled to run now',
      nextRun: getNextRunTime().toISOString(),
      currentJob: currentJob
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

async function handleUpdateConfig(newConfig: Partial<SchedulerConfig>): Promise<Response> {
  schedulerConfig = { ...schedulerConfig, ...newConfig };
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Configuration updated',
    config: schedulerConfig
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function handleStopJob(): Promise<Response> {
  if (!currentJob || currentJob.status !== 'running') {
    return new Response(JSON.stringify({
      success: false,
      message: 'No running job to stop'
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  currentJob.status = 'failed';
  currentJob.completedAt = new Date().toISOString();
  currentJob.errors.push('Job stopped manually');

  return new Response(JSON.stringify({
    success: true,
    message: 'Job stopped successfully',
    job: currentJob
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

async function startScrapingJob(jobId: string, trigger: 'manual' | 'scheduled'): Promise<void> {
  currentJob = {
    id: jobId,
    status: 'running',
    startedAt: new Date().toISOString(),
    companiesProcessed: 0,
    errors: []
  };

  console.log(`🚀 Starting scraping job ${jobId} (${trigger})`);

  try {
    // Call the comprehensive scraper
    const response = await fetch('https://tteqegjf--comprehensive-scraper.functions.blink.new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'full',
        trigger: trigger,
        jobId: jobId
      })
    });

    if (response.ok) {
      const result = await response.json();
      
      currentJob.status = 'completed';
      currentJob.completedAt = new Date().toISOString();
      currentJob.companiesProcessed = result.count || 0;
      currentJob.results = result;
      
      if (result.errors && result.errors.length > 0) {
        currentJob.errors = result.errors;
      }

      schedulerConfig.lastRun = new Date().toISOString();
      
      console.log(`✅ Scraping job ${jobId} completed successfully`);
      console.log(`📊 Processed ${currentJob.companiesProcessed} companies`);
      
      await logScrapingResult(currentJob);
    } else {
      throw new Error(`Scraping API returned ${response.status}: ${response.statusText}`);
    }
    
  } catch (error) {
    console.error(`❌ Scraping job ${jobId} failed:`, error);
    
    currentJob.status = 'failed';
    currentJob.completedAt = new Date().toISOString();
    currentJob.errors.push(error.message);
    
    await logScrapingError(currentJob, error);
  }
}

function shouldRunNow(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const minute = now.getMinutes();
  
  // Parse cron schedule (simplified for daily at 6 AM)
  // In production, use a proper cron parser
  const [cronMinute, cronHour] = schedulerConfig.schedule.split(' ');
  
  const targetHour = parseInt(cronHour);
  const targetMinute = parseInt(cronMinute);
  
  // Check if it's the right time (within 5-minute window)
  return hour === targetHour && minute >= targetMinute && minute < targetMinute + 5;
}

function getNextRunTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  
  // Parse schedule for next run time
  const [cronMinute, cronHour] = schedulerConfig.schedule.split(' ');
  const targetHour = parseInt(cronHour);
  const targetMinute = parseInt(cronMinute);
  
  // If we haven't reached today's run time, schedule for today
  if (now.getHours() < targetHour || (now.getHours() === targetHour && now.getMinutes() < targetMinute)) {
    now.setHours(targetHour, targetMinute, 0, 0);
    return now;
  }
  
  // Otherwise, schedule for tomorrow
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(targetHour, targetMinute, 0, 0);
  return tomorrow;
}

function getUptime(): string {
  // In production, this would track actual uptime
  return 'N/A (stateless function)';
}

async function logScrapingResult(job: ScrapingJob): Promise<void> {
  // In production, this would log to your monitoring system
  console.log('📊 Scraping job completed:', {
    jobId: job.id,
    status: job.status,
    companiesProcessed: job.companiesProcessed,
    duration: job.completedAt ? 
      new Date(job.completedAt).getTime() - new Date(job.startedAt).getTime() : 
      null,
    errors: job.errors.length
  });
}

async function logScrapingError(job: ScrapingJob, error: any): Promise<void> {
  // In production, this would alert your monitoring system
  console.error('❌ Scraping job error:', {
    jobId: job.id,
    error: error.message,
    stack: error.stack,
    companiesProcessed: job.companiesProcessed,
    duration: job.completedAt ? 
      new Date(job.completedAt).getTime() - new Date(job.startedAt).getTime() : 
      null
  });
}