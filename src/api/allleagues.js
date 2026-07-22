import { getData } from "./baseapi";

export async function getAllLeagues() {
  const data = await getData("/all_leagues.php");

  return data.leagues ?? [];
}
