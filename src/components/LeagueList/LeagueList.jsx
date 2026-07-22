import LeagueCard from "../LeagueCard/LeagueCard";

export default function LeagueList({ filteredLeagues, onSelectLeague }) {
  return (
    <ul className="grid list-none grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredLeagues.map((league) => (
        <LeagueCard
          key={league.idLeague}
          league={league}
          onSelect={onSelectLeague}
        />
      ))}
    </ul>
  );
}
