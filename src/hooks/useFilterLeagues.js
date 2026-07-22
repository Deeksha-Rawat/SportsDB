import { useState, useMemo } from "react";

const FAKE_LEAGUES = [
  { idLeague: "4328", strLeague: "English Premier League", strSport: "Soccer" },
  {
    idLeague: "4329",
    strLeague: "English League Championship",
    strSport: "Badminton",
  },
  {
    idLeague: "4330",
    strLeague: "Scottish Premier League",
    strSport: "Hockey",
  },
  { idLeague: "4331", strLeague: "German Bundesliga", strSport: "Soccer" },
  { idLeague: "4332", strLeague: "Italian Serie A", strSport: "Soccer" },
  { idLeague: "4334", strLeague: "French Ligue 1", strSport: "Soccer" },
  { idLeague: "4335", strLeague: "Spanish La Liga", strSport: "Soccer" },
  { idLeague: "4336", strLeague: "Greek Super League 1", strSport: "Soccer" },
  { idLeague: "4337", strLeague: "Dutch Eredivisie", strSport: "Soccer" },
  { idLeague: "4338", strLeague: "Belgian Pro League", strSport: "Soccer" },
];

export default function useFilterLeagues() {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // for filterdropdown
  const sports = useMemo(() => {
    const uniqueSport = new Set(FAKE_LEAGUES.map((el) => el.strSport));
    return [...uniqueSport];
  }, []);

  const filteredLeagues = useMemo(() => {
    return FAKE_LEAGUES.filter((item) => {
      const matchedText = item.strLeague
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());
      const matchedOption =
        !selectedOption ||
        selectedOption === "All Sports" ||
        item.strSport === selectedOption;

      return matchedOption && matchedText;
    });
  }, [searchText, selectedOption]);

  return {
    searchText,
    setSearchText,
    filteredLeagues,
    sports,
    selectedOption,
    setSelectedOption,
  };
}
