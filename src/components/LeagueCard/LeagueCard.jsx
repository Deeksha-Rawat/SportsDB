import useLeagueDetails from "../../hooks/useLeagueDetails";

export default function LeagueCard({ league, onSelect }) {
  const { details } = useLeagueDetails(league.idLeague);

  const strLeague = details?.strLeague ?? league.strLeague;
  const strSport = details?.strSport ?? league.strSport;
  const strLeagueAlternate = details?.strLeagueAlternate;

  return (
    <li
      onClick={() => onSelect(league)}
      className="flex cursor-pointer flex-col gap-2 rounded-xl border border-button-gray/40 bg-button-gray/10 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-accent-mint hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-text-main">{strLeague}</h3>

      {strLeagueAlternate && (
        <p className="text-xs text-text-main/50">{strLeagueAlternate}</p>
      )}
      <span className="inline-flex w-fit items-center rounded-full bg-accent-mint/15 px-2.5 py-1 text-xs font-medium text-accent-mint mt-1">
        {strSport}
      </span>
    </li>
  );
}
