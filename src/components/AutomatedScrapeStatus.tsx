import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Play, 
  Pause, 
  Settings,
  TrendingUp,
  Database,
  Globe,
  Calendar
} from 'lucide-react';
import { Company } from '@/data/comprehensiveCompanies';

interface ScrapingJob {
  id: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  companiesProcessed: number;
  errors: string[];
  results?: any;
}

interface SchedulerStatus {
  status: 'active' | 'disabled';
  nextRun: string;
  lastRun?: string;
  currentJob?: ScrapingJob;
  config: {
    enabled: boolean;
    schedule: string;
    timezone: string;
    batchSize: number;
    sources: string[];
  };
}

interface AutomatedScrapeStatusProps {
  companies: Company[];
  onDataUpdate: (companies: Company[]) => void;
}

export function AutomatedScrapeStatus({ companies, onDataUpdate }: AutomatedScrapeStatusProps) {
  const [schedulerStatus, setSchedulerStatus] = useState<SchedulerStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchSchedulerStatus();
    
    // Check status every 30 seconds
    const interval = setInterval(fetchSchedulerStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchSchedulerStatus = async () => {
    try {
      const response = await fetch('https://tteqegjf--daily-scheduler.functions.blink.new?action=status');
      if (response.ok) {
        const data = await response.json();
        setSchedulerStatus(data);
        setError('');
      }
    } catch (err) {
      console.error('Failed to fetch scheduler status:', err);
      setError('Failed to connect to scraping service');
    }
  };

  const triggerManualScrape = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://tteqegjf--daily-scheduler.functions.blink.new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'trigger_now' })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setLastUpdate(new Date().toISOString());
          // Refresh status to show running job
          setTimeout(fetchSchedulerStatus, 1000);
        } else {
          setError(result.message || 'Failed to trigger scraping');
        }
      } else {
        setError('Failed to trigger manual scrape');
      }
    } catch (err) {
      setError('Network error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleScheduler = async () => {
    if (!schedulerStatus) return;
    
    try {
      const response = await fetch('https://tteqegjf--daily-scheduler.functions.blink.new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'update_config',
          config: { enabled: !schedulerStatus.config.enabled }
        })
      });

      if (response.ok) {
        fetchSchedulerStatus();
      }
    } catch (err) {
      setError('Failed to update scheduler');
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now.getTime() - time.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `${diffHours}h ${diffMinutes}m ago`;
    }
    return `${diffMinutes}m ago`;
  };

  const formatNextRun = (timestamp: string) => {
    const time = new Date(timestamp);
    const now = new Date();
    const diffMs = time.getTime() - now.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffHours > 0) {
      return `in ${diffHours}h ${diffMinutes}m`;
    }
    return `in ${diffMinutes}m`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'running': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'disabled': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'running': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'failed': return <XCircle className="h-4 w-4" />;
      case 'disabled': return <Pause className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  if (!schedulerStatus) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-4">
            <RefreshCw className="h-5 w-5 animate-spin mr-2" />
            <span>Loading scraping system status...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentJob = schedulerStatus.currentJob;
  const isJobRunning = currentJob?.status === 'running';

  return (
    <div className="space-y-4 mb-6">
      {/* Main Status Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Automated Daily Scraping System
              </CardTitle>
              <CardDescription>
                Automatically updates company data every day at 6:00 AM EST
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={`${getStatusColor(schedulerStatus.status)} text-white border-0`}
              >
                {getStatusIcon(schedulerStatus.status)}
                <span className="ml-1 capitalize">{schedulerStatus.status}</span>
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Schedule Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Next Run</p>
                <p className="text-sm text-muted-foreground">
                  {formatNextRun(schedulerStatus.nextRun)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Last Run</p>
                <p className="text-sm text-muted-foreground">
                  {schedulerStatus.lastRun ? formatTimeAgo(schedulerStatus.lastRun) : 'Never'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">Companies Tracked</p>
                <p className="text-sm text-muted-foreground">
                  {companies.length} total
                </p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Current Job Status */}
          {currentJob && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Current Job Status</h4>
                <Badge variant="outline" className={`${getStatusColor(currentJob.status)} text-white border-0`}>
                  {getStatusIcon(currentJob.status)}
                  <span className="ml-1 capitalize">{currentJob.status}</span>
                </Badge>
              </div>
              
              {isJobRunning && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing companies...</span>
                    <span>{currentJob.companiesProcessed} processed</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              )}
              
              {currentJob.status === 'completed' && (
                <div className="text-sm text-green-600">
                  ✅ Successfully processed {currentJob.companiesProcessed} companies
                  {currentJob.completedAt && (
                    <span className="text-muted-foreground ml-2">
                      ({formatTimeAgo(currentJob.completedAt)})
                    </span>
                  )}
                </div>
              )}
              
              {currentJob.status === 'failed' && (
                <div className="text-sm text-red-600">
                  ❌ Job failed after processing {currentJob.companiesProcessed} companies
                  {currentJob.errors.length > 0 && (
                    <details className="mt-2">
                      <summary className="cursor-pointer">View errors</summary>
                      <ul className="mt-1 text-xs">
                        {currentJob.errors.map((error, i) => (
                          <li key={i}>• {error}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Controls */}
          <div className="flex items-center gap-2 pt-2">
            <Button
              onClick={triggerManualScrape}
              disabled={isLoading || isJobRunning}
              size="sm"
            >
              {isLoading || isJobRunning ? (
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {isJobRunning ? 'Scraping...' : 'Run Now'}
            </Button>
            
            <Button
              onClick={toggleScheduler}
              variant="outline"
              size="sm"
            >
              {schedulerStatus.config.enabled ? (
                <Pause className="h-4 w-4 mr-2" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              {schedulerStatus.config.enabled ? 'Disable' : 'Enable'}
            </Button>
            
            <Button
              onClick={fetchSchedulerStatus}
              variant="ghost"
              size="sm"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Sources Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4" />
            Data Sources
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {schedulerStatus.config.sources.map((source, index) => (
              <Badge key={index} variant="secondary" className="justify-center">
                {source.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            The system automatically scrapes company websites, news sources, business databases, 
            and social media to keep all company information up-to-date.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}