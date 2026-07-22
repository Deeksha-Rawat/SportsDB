import { useState, useEffect } from "react";
import { getAllLeagues } from "../api/allleagues";

export default function useAllLeagues() {
  const [leagues, setLeagues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    getAllLeagues()
      .then((data) => {
        if (!isCancelled) {
          setLeagues(data);
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
  }, []);

  return { leagues, isLoading, error };
}
