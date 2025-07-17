import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface SchedulerConfig {
  enabled: boolean;
  schedule: string; // Cron format
  timezone: string;
  batchSize: number;
  sources: string[];
}

const DEFAULT_CONFIG: SchedulerConfig = {
  enabled: true,
  schedule: '0 6 * * *', // Daily at 6 AM EST
  timezone: 'America/New_York',
  batchSize: 10,
  sources: ['web_search', 'company_websites', 'news_apis', 'social_media']
};

async function triggerScrapingJob(): Promise<void> {
  try {
    console.log('Triggering daily scraping job...');
    
    // Call the main scraping function
    const response = await fetch('/functions/scrape-shark-tank-updates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mode: 'daily',
        timestamp: new Date().toISOString()
      })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Daily scraping completed successfully:', result);
      
      // Log to monitoring system
      await logScrapingResult(result);
    } else {
      throw new Error(`Scraping failed with status: ${response.status}`);
    }
    
  } catch (error) {
    console.error('Daily scraping job failed:', error);
    await logScrapingError(error);
  }
}

async function logScrapingResult(result: any): Promise<void> {
  // In production, this would log to your monitoring system
  console.log('Scraping job completed:', {
    timestamp: new Date().toISOString(),
    companiesProcessed: result.results?.length || 0,
    success: result.success,
    duration: 'N/A' // Would calculate actual duration
  });
}

async function logScrapingError(error: any): Promise<void> {
  // In production, this would alert your monitoring system
  console.error('Scraping job error:', {
    timestamp: new Date().toISOString(),
    error: error.message,
    stack: error.stack
  });
}

function shouldRunToday(): boolean {
  const now = new Date();
  const hour = now.getHours();
  
  // Run daily at 6 AM EST (adjust for your timezone)
  return hour === 6;
}

function getNextRunTime(): Date {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(6, 0, 0, 0); // 6 AM tomorrow
  return tomorrow;
}

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
    if (req.method === 'POST') {
      const { action } = await req.json();
      
      if (action === 'trigger_now') {
        // Manual trigger for testing
        await triggerScrapingJob();
        
        return new Response(JSON.stringify({
          success: true,
          message: 'Scraping job triggered manually',
          timestamp: new Date().toISOString()
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
      
      if (action === 'check_schedule') {
        // Check if it's time to run the daily job
        if (shouldRunToday()) {
          await triggerScrapingJob();
          
          return new Response(JSON.stringify({
            success: true,
            message: 'Daily scraping job executed',
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
            message: 'Not scheduled to run now',
            nextRun: getNextRunTime().toISOString()
          }), {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
      }
    }
    
    if (req.method === 'GET') {
      // Return scheduler status
      return new Response(JSON.stringify({
        status: 'active',
        config: DEFAULT_CONFIG,
        nextRun: getNextRunTime().toISOString(),
        lastRun: null, // Would track in database
        message: 'Daily scraper scheduler is active'
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
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