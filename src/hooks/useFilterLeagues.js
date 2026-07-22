import { useState, useMemo } from "react";

export default function useFilterLeagues(leagues = []) {
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  // for filterdropdown
  const sports = useMemo(() => {
    const uniqueSport = new Set(leagues.map((el) => el.strSport));
    return [...uniqueSport];
  }, [leagues]);

  const filteredLeagues = useMemo(() => {
    return leagues.filter((item) => {
      const matchedText = item.strLeague
        .toLowerCase()
        .includes(searchText.trim().toLowerCase());
      const matchedOption =
        !selectedOption ||
        selectedOption === "All Sports" ||
        item.strSport === selectedOption;

      return matchedOption && matchedText;
    });
  }, [leagues, searchText, selectedOption]);

  return {
    searchText,
    setSearchText,
    filteredLeagues,
    sports,
    selectedOption,
    setSelectedOption,
  };
}
