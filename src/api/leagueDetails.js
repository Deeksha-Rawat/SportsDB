import { getData } from "./baseapi";

export async function getLeagueDetails(leagueId) {
  const data = await getData(`/lookupleague.php?id=${leagueId}`);
  return data.leagues?.[0] ?? null;
}
