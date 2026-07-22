import FilterDropdown from "../../components/FilterDropdown/FilterDropdown";
import LeagueList from "../../components/LeagueList/LeagueList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { SeasonBadgeModal } from "../../components/SeasonBadgeModal/SeasonBadgeModal";
import useAllLeagues from "../../hooks/useAllLeagues";
import useFilterLeagues from "../../hooks/useFilterLeagues";
import { useState } from "react";
import { Logo } from "../../constants";
export default function Homepage() {
  const { leagues, isLoading, error } = useAllLeagues();
  const {
    searchText,
    setSearchText,
    filteredLeagues,
    sports,
    selectedOption,
    setSelectedOption,
  } = useFilterLeagues(leagues);

  const [selectedLeague, setSelectedLeague] = useState(null);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-dark">
        <p className="text-text-main/60">Loading leagues...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg-dark">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <header className="border-b border-button-gray/30 px-6 py-4">
        <img src={Logo} alt="Sporty logo" className="h-20 w-60" />

        <p className="mt-1 text-sm text-accent-mint">
          Browse leagues by name or sport
        </p>
      </header>

      <div className="flex flex-col gap-3 px-6 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar selectedText={searchText} setselectedText={setSearchText} />
        <FilterDropdown
          sports={sports}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>

      {filteredLeagues.length === 0 ? (
        <p className="px-6 py-16 text-center text-text-main/60">
          No leagues match your search.
        </p>
      ) : (
        <LeagueList
          filteredLeagues={filteredLeagues}
          onSelectLeague={setSelectedLeague}
        />
      )}

      <SeasonBadgeModal
        league={selectedLeague}
        onClose={() => setSelectedLeague(null)}
      />
    </div>
  );
}
