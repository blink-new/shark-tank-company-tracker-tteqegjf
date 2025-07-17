import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { allSeasons, sharks } from '@/data/comprehensiveCompanies';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSeason: string;
  onSeasonChange: (value: string) => void;
  selectedDealStatus: string;
  onDealStatusChange: (value: string) => void;
  selectedCurrentStatus: string;
  onCurrentStatusChange: (value: string) => void;
  selectedShark: string;
  onSharkChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedSeason,
  onSeasonChange,
  selectedDealStatus,
  onDealStatusChange,
  selectedCurrentStatus,
  onCurrentStatusChange,
  selectedShark,
  onSharkChange,
  onClearFilters,
  hasActiveFilters
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search companies by name or industry..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">Filters:</span>
        </div>
        
        <Select value={selectedSeason} onValueChange={onSeasonChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Season" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Seasons</SelectItem>
            {allSeasons.map((season) => (
              <SelectItem key={season} value={season.toString()}>
                Season {season}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedDealStatus} onValueChange={onDealStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Deal Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Deals</SelectItem>
            <SelectItem value="Got Deal">Got Deal</SelectItem>
            <SelectItem value="No Deal">No Deal</SelectItem>
            <SelectItem value="Deal Fell Through">Deal Fell Through</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedCurrentStatus} onValueChange={onCurrentStatusChange}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Acquired">Acquired</SelectItem>
            <SelectItem value="Closed">Closed</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={selectedShark} onValueChange={onSharkChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Shark" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sharks</SelectItem>
            {sharks.map((shark) => (
              <SelectItem key={shark} value={shark}>
                {shark}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearFilters}
            className="ml-2"
          >
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
      
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="text-xs">
              Search: "{searchTerm}"
            </Badge>
          )}
          {selectedSeason !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              Season {selectedSeason}
            </Badge>
          )}
          {selectedDealStatus !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {selectedDealStatus}
            </Badge>
          )}
          {selectedCurrentStatus !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {selectedCurrentStatus}
            </Badge>
          )}
          {selectedShark !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              {selectedShark}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}