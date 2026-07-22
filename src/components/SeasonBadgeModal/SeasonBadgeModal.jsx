import { createPortal } from "react-dom";
import useBadge from "../../hooks/useBadge";

export function SeasonBadgeModal({ league, onClose }) {
  const { badgeUrl, isLoading, error } = useBadge(league);

  if (!league) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-button-gray/30 bg-bg-dark p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-text-main">
              {league.strLeague}
            </h2>
            <span className="mt-2 inline-flex w-fit items-center rounded-full bg-accent-mint/15 px-2.5 py-1 text-xs font-medium text-accent-mint">
              {league.strSport}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-xl leading-none text-button-gray hover:text-text-main"
          >
            ×
          </button>
        </div>

        <div className="mt-4 flex min-h-24 items-center justify-center">
          {isLoading && (
            <p className="text-sm text-text-main/60">Loading badge...</p>
          )}
          {error && <p className="text-sm text-red-400">Could not load badge.</p>}
          {!isLoading && !error && badgeUrl && (
            <img
              src={badgeUrl}
              alt={`${league.strLeague} season badge`}
              className="max-h-48"
            />
          )}
          {!isLoading && !error && !badgeUrl && (
            <p className="text-sm text-text-main/60">No badge available.</p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
