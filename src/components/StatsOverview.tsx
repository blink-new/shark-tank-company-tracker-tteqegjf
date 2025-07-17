import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Handshake, Building, DollarSign } from 'lucide-react';
import { Company } from '@/data/companies';

interface StatsOverviewProps {
  companies: Company[];
}

export function StatsOverview({ companies }: StatsOverviewProps) {
  const totalCompanies = companies.length;
  const dealsCount = companies.filter(c => c.dealStatus === 'Got Deal').length;
  const activeCount = companies.filter(c => c.currentStatus === 'Active').length;
  const acquiredCount = companies.filter(c => c.currentStatus === 'Acquired').length;
  
  const totalValuation = companies
    .filter(c => c.currentValuation)
    .reduce((sum, c) => sum + (c.currentValuation || 0), 0);
  
  const dealSuccessRate = Math.round((dealsCount / totalCompanies) * 100);
  
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${amount.toLocaleString()}`;
  };

  const stats = [
    {
      title: 'Total Companies',
      value: totalCompanies.toString(),
      description: 'From seasons 1-10',
      icon: Building,
      color: 'text-blue-600'
    },
    {
      title: 'Deal Success Rate',
      value: `${dealSuccessRate}%`,
      description: `${dealsCount} out of ${totalCompanies} got deals`,
      icon: Handshake,
      color: 'text-green-600'
    },
    {
      title: 'Still Active',
      value: activeCount.toString(),
      description: `${acquiredCount} acquired, ${companies.filter(c => c.currentStatus === 'Closed').length} closed`,
      icon: TrendingUp,
      color: 'text-emerald-600'
    },
    {
      title: 'Combined Valuation',
      value: formatCurrency(totalValuation),
      description: 'Current market value',
      icon: DollarSign,
      color: 'text-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}