import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Company } from '@/data/companies';

interface CompanyCardProps {
  company: Company;
  onViewDetails: (company: Company) => void;
}

export function CompanyCard({ company, onViewDetails }: CompanyCardProps) {
  const getStatusColor = (status: Company['currentStatus']) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'Acquired':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'Closed':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
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

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const getPerformanceIcon = () => {
    if (company.currentStatus === 'Acquired' || (company.currentValuation && company.currentValuation > company.originalAsk.amount * 10)) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    } else if (company.currentStatus === 'Closed') {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer" onClick={() => onViewDetails(company)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {company.logo && (
              <img 
                src={company.logo} 
                alt={`${company.name} logo`}
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Season {company.season}, Episode {company.episode}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {getPerformanceIcon()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {company.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            {company.industry}
          </Badge>
          <Badge className={getDealStatusColor(company.dealStatus)}>
            {company.dealStatus}
          </Badge>
          <Badge className={getStatusColor(company.currentStatus)}>
            {company.currentStatus}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Original Ask</p>
            <p className="font-medium">
              {formatCurrency(company.originalAsk.amount)} for {company.originalAsk.equity}%
            </p>
          </div>
          {company.currentValuation && (
            <div>
              <p className="text-muted-foreground">Current Value</p>
              <p className="font-medium text-green-600">
                {formatCurrency(company.currentValuation)}
              </p>
            </div>
          )}
        </div>
        
        {company.dealDetails && (
          <div className="pt-2 border-t">
            <p className="text-xs text-muted-foreground mb-1">Deal with {company.dealDetails.sharks.join(', ')}</p>
            <p className="text-sm font-medium">
              {formatCurrency(company.dealDetails.amount)} for {company.dealDetails.equity}%
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(company);
            }}
          >
            View Details
          </Button>
          {company.website && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.open(company.website, '_blank');
              }}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}