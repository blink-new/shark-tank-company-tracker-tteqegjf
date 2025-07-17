import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Calendar, Users, DollarSign, TrendingUp, Building } from 'lucide-react';
import { Company } from '@/data/companies';

interface CompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyModal({ company, isOpen, onClose }: CompanyModalProps) {
  if (!company) return null;

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getStatusColor = (status: Company['currentStatus']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Acquired':
        return 'bg-blue-100 text-blue-800';
      case 'Closed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDealStatusColor = (status: Company['dealStatus']) => {
    switch (status) {
      case 'Got Deal':
        return 'bg-green-100 text-green-800';
      case 'No Deal':
        return 'bg-red-100 text-red-800';
      case 'Deal Fell Through':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-4">
            {company.logo && (
              <img 
                src={company.logo} 
                alt={`${company.name} logo`}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div>
              <DialogTitle className="text-2xl">{company.name}</DialogTitle>
              <p className="text-muted-foreground">
                Season {company.season}, Episode {company.episode}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-sm">
              <Building className="h-3 w-3 mr-1" />
              {company.industry}
            </Badge>
            <Badge className={getDealStatusColor(company.dealStatus)}>
              {company.dealStatus}
            </Badge>
            <Badge className={getStatusColor(company.currentStatus)}>
              {company.currentStatus}
            </Badge>
          </div>
          
          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-muted-foreground">{company.description}</p>
          </div>
          
          {/* Founders */}
          <div>
            <h3 className="font-semibold mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Founders
            </h3>
            <p>{company.founders.join(', ')}</p>
          </div>
          
          <Separator />
          
          {/* Shark Tank Pitch */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Shark Tank Pitch
            </h3>
            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
              <p className="text-sm">{company.pitchSummary}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Original Ask</p>
                  <p className="text-lg font-semibold">
                    {formatCurrency(company.originalAsk.amount)} for {company.originalAsk.equity}%
                  </p>
                </div>
                {company.dealDetails && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Deal Made</p>
                    <p className="text-lg font-semibold text-green-600">
                      {formatCurrency(company.dealDetails.amount)} for {company.dealDetails.equity}%
                    </p>
                    <p className="text-sm text-muted-foreground">
                      with {company.dealDetails.sharks.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Current Status */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Current Status
            </h3>
            <div className="space-y-3">
              <p className="text-muted-foreground">{company.currentUpdate}</p>
              {company.currentValuation && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-green-800 mb-1">Current Valuation</p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatCurrency(company.currentValuation)}
                  </p>
                  {company.dealDetails && (
                    <p className="text-sm text-green-700 mt-1">
                      {((company.currentValuation / (company.dealDetails.amount / company.dealDetails.equity * 100)) * 100).toFixed(0)}x return on investment
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          {company.website && (
            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => window.open(company.website, '_blank')}
                className="w-full md:w-auto"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Website
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}