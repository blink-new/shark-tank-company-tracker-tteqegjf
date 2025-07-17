import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Clock, CheckCircle, AlertCircle, Database } from 'lucide-react';
import { SharkTankScrapeService } from '@/services/scrapeService';
import { Company } from '@/data/allCompanies';

interface ScrapeStatusProps {
  onDataUpdate: (companies: Company[]) => void;
  companies: Company[];
}

export function ScrapeStatus({ onDataUpdate, companies }: ScrapeStatusProps) {
  const [isScrapingActive, setIsScrapingActive] = useState(false);
  const [lastScrapeTime, setLastScrapeTime] = useState<string>('');
  const [scrapeStatus, setScrapeStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [updatedCount, setUpdatedCount] = useState(0);

  useEffect(() => {
    // Initialize scraping schedule
    SharkTankScrapeService.scheduleDailyScraping();
    setLastScrapeTime(SharkTankScrapeService.getLastScrapeTime());
  }, []);

  const handleManualScrape = async () => {
    setIsScrapingActive(true);
    setScrapeStatus('running');
    setUpdatedCount(0);

    try {
      // Simulate scraping process
      const scrapedData = await SharkTankScrapeService.scrapeCompanyUpdates();
      
      // Update companies with scraped data
      const updatedCompanies = SharkTankScrapeService.updateCompaniesWithScrapedData(
        companies, 
        scrapedData
      );

      // Count how many companies were updated
      const updateCount = scrapedData.length;
      setUpdatedCount(updateCount);

      // Update the parent component with new data
      onDataUpdate(updatedCompanies);

      setScrapeStatus('success');
      setLastScrapeTime(new Date().toISOString());
    } catch (error) {
      console.error('Scraping failed:', error);
      setScrapeStatus('error');
    } finally {
      setIsScrapingActive(false);
    }
  };

  const formatLastScrapeTime = (timestamp: string) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const getStatusIcon = () => {
    switch (scrapeStatus) {
      case 'running':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Database className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (scrapeStatus) {
      case 'running':
        return 'bg-blue-100 text-blue-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (scrapeStatus) {
      case 'running':
        return 'Scraping in progress...';
      case 'success':
        return `Updated ${updatedCount} companies`;
      case 'error':
        return 'Scraping failed';
      default:
        return 'Ready to scrape';
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="h-5 w-5 text-primary" />
            <span>Live Data Updates</span>
          </div>
          <Badge variant="outline" className="text-xs">
            Auto-scraping enabled
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Status */}
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div>
              <p className="text-sm font-medium">Status</p>
              <Badge className={getStatusColor()}>
                {getStatusText()}
              </Badge>
            </div>
          </div>

          {/* Last Update */}
          <div className="flex items-center space-x-3">
            <Clock className="h-4 w-4 text-gray-600" />
            <div>
              <p className="text-sm font-medium">Last Updated</p>
              <p className="text-xs text-muted-foreground">
                {formatLastScrapeTime(lastScrapeTime)}
              </p>
            </div>
          </div>

          {/* Manual Trigger */}
          <div className="flex items-center justify-end">
            <Button
              onClick={handleManualScrape}
              disabled={isScrapingActive}
              size="sm"
              variant="outline"
            >
              {isScrapingActive ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Scraping...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Update Now
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Scraping Info */}
        <div className="bg-muted/30 rounded-lg p-3">
          <h4 className="text-sm font-medium mb-2">Automated Data Collection</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted-foreground">
            <div>
              <p><strong>Schedule:</strong> Daily at 6:00 AM EST</p>
              <p><strong>Sources:</strong> Company websites, news sites, SEC filings</p>
            </div>
            <div>
              <p><strong>Data Points:</strong> Status, valuations, recent updates</p>
              <p><strong>Companies Tracked:</strong> {companies.length} total</p>
            </div>
          </div>
        </div>

        {scrapeStatus === 'success' && updatedCount > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <p className="text-sm text-green-800">
                Successfully updated {updatedCount} companies with the latest information!
              </p>
            </div>
          </div>
        )}

        {scrapeStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-800">
                Failed to update company data. Please try again later.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}