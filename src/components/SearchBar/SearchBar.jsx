export default function SearchBar({ selectedText, setselectedText }) {
  return (
    <div className="relative w-full sm:max-w-sm">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-main/40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.15 6.15a7.5 7.5 0 0 0 10.5 10.5Z" />
      </svg>
      <input
        type="text"
        placeholder="Search leagues..."
        value={selectedText}
        onChange={(e) => setselectedText(e.target.value)}
        className="w-full rounded-lg border border-button-gray/40 bg-button-gray/10 py-2 pl-9 pr-3 text-sm text-text-main shadow-sm transition placeholder:text-text-main/40 focus:border-accent-mint focus:outline-none focus:ring-2 focus:ring-accent-mint/20"
      />
    </div>
  );
}
