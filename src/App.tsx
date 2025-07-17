import { useState, useMemo } from 'react';
import { CompanyCard } from '@/components/CompanyCard';
import { CompanyModal } from '@/components/CompanyModal';
import { FilterBar } from '@/components/FilterBar';
import { StatsOverview } from '@/components/StatsOverview';
import { AutomatedScrapeStatus } from '@/components/AutomatedScrapeStatus';
import { comprehensiveCompanies, Company, allSeasons } from '@/data/comprehensiveCompanies';
import { Separator } from '@/components/ui/separator';

function App() {
  const [companies, setCompanies] = useState<Company[]>(comprehensiveCompanies);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedDealStatus, setSelectedDealStatus] = useState('all');
  const [selectedCurrentStatus, setSelectedCurrentStatus] = useState('all');
  const [selectedShark, setSelectedShark] = useState('all');

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Search filter
      const matchesSearch = searchTerm === '' || 
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.founders.some(founder => founder.toLowerCase().includes(searchTerm.toLowerCase()));

      // Season filter
      const matchesSeason = selectedSeason === 'all' || 
        company.season.toString() === selectedSeason;

      // Deal status filter
      const matchesDealStatus = selectedDealStatus === 'all' || 
        company.dealStatus === selectedDealStatus;

      // Current status filter
      const matchesCurrentStatus = selectedCurrentStatus === 'all' || 
        company.currentStatus === selectedCurrentStatus;

      // Shark filter
      const matchesShark = selectedShark === 'all' || 
        (company.dealDetails && company.dealDetails.sharks.includes(selectedShark));

      return matchesSearch && matchesSeason && matchesDealStatus && matchesCurrentStatus && matchesShark;
    });
  }, [companies, searchTerm, selectedSeason, selectedDealStatus, selectedCurrentStatus, selectedShark]);

  const hasActiveFilters = searchTerm !== '' || 
    selectedSeason !== 'all' || 
    selectedDealStatus !== 'all' || 
    selectedCurrentStatus !== 'all' || 
    selectedShark !== 'all';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSeason('all');
    setSelectedDealStatus('all');
    setSelectedCurrentStatus('all');
    setSelectedShark('all');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🦈</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Shark Tank Company Tracker
                </h1>
                <p className="text-sm text-muted-foreground">
                  Comprehensive database of all Shark Tank companies (Seasons 1-16+) with automated daily updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Automated Scrape Status */}
        <AutomatedScrapeStatus 
          companies={companies}
          onDataUpdate={setCompanies}
        />

        {/* Stats Overview */}
        <div className="mb-8">
          <StatsOverview companies={companies} />
        </div>

        <Separator className="mb-8" />

        {/* Filter Bar */}
        <div className="mb-8">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            selectedDealStatus={selectedDealStatus}
            onDealStatusChange={setSelectedDealStatus}
            selectedCurrentStatus={selectedCurrentStatus}
            onCurrentStatusChange={setSelectedCurrentStatus}
            selectedShark={selectedShark}
            onSharkChange={setSelectedShark}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {hasActiveFilters ? 'Filtered Results' : 'All Companies'}
          </h2>
          <p className="text-muted-foreground mt-1">
            Showing {filteredCompanies.length} of {companies.length} companies
          </p>
        </div>

        {/* Company Grid */}
        {filteredCompanies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onViewDetails={setSelectedCompany}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔍</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No companies found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </main>

      {/* Company Modal */}
      <CompanyModal
        company={selectedCompany}
        isOpen={selectedCompany !== null}
        onClose={() => setSelectedCompany(null)}
      />

      {/* Footer */}
      <footer className="bg-muted/30 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Comprehensive database covering all Shark Tank companies from Seasons 1-16+ with automated daily scraping from multiple sources. Company valuations and status are approximate and based on publicly available information including company websites, news sources, and business databases.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Built with ❤️ for Shark Tank fans • Data updated daily at 6:00 AM EST
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;