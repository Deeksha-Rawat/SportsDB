import { getData } from "./baseapi";

export async function getSeasonBadge(leagueId) {
  const data = await getData(`/search_all_seasons.php?badge=1&id=${leagueId}`);
  return data.seasons ?? [];
}
