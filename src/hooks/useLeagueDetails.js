import { useEffect, useState } from "react";
import { getLeagueDetails } from "../api/leagueDetails";

const leagueDetailsCache = new Map();

export default function useLeagueDetails(leagueId) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!leagueId) return;

    if (leagueDetailsCache.has(leagueId)) {
      setDetails(leagueDetailsCache.get(leagueId));
      setIsLoading(false);
      setError(null);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    getLeagueDetails(leagueId)
      .then((league) => {
        if (!isCancelled) {
          leagueDetailsCache.set(leagueId, league);
          setDetails(league);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err.message);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [leagueId]);

  return { details, isLoading, error };
}
