import { useEffect, useState } from "react";
import { getSeasonBadge } from "../api/badges";

const badgeCache = new Map();

export default function useBadge(league) {
  const [badgeUrl, setBadgeUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!league) return;

    if (badgeCache.has(league.idLeague)) {
      setBadgeUrl(badgeCache.get(league.idLeague));
      setIsLoading(false);
      setError(null);
      return;
    }

    let isCancelled = false;
    setIsLoading(true);
    setError(null);

    getSeasonBadge(league.idLeague)
      .then((seasons) => {
        if (!isCancelled) {
          const seasonWithBadge = seasons.find((season) => season.strBadge);
          const url = seasonWithBadge?.strBadge ?? null;
          badgeCache.set(league.idLeague, url);
          setBadgeUrl(url);
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
  }, [league]);

  return { badgeUrl, isLoading, error };
}
