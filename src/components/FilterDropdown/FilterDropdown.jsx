export default function FilterDropdown({
  sports,
  selectedOption,
  setSelectedOption,
}) {
  return (
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className="w-full rounded-lg border border-button-gray/40 bg-button-gray/10 px-3 py-2 text-sm text-text-main shadow-sm transition focus:border-accent-mint focus:outline-none focus:ring-2 focus:ring-accent-mint/20 sm:w-auto"
    >
      <option value="">All Sports</option>
      {sports.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
