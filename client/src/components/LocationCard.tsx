import type { DiningLocation } from '../types/dining'

type LocationCardProps = {
  location: DiningLocation
  selected: boolean
  onSelect: (id: number) => void
}

export function LocationCard({ location, selected, onSelect }: LocationCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(location.id)}
      aria-pressed={selected}
      className={`group flex min-h-28 flex-col justify-between rounded-2xl border px-4 py-4 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cardinal ${
        selected
          ? 'border-seal bg-seal text-cream shadow-lg shadow-seal/15'
          : 'border-line bg-paper text-seal hover:-translate-y-0.5 hover:border-brass hover:shadow-md'
      }`}
    >
      <span className={`text-xs font-semibold tracking-[0.16em] uppercase ${selected ? 'text-brass' : 'text-cardinal'}`}>
        Dining hall
      </span>
      <span className="mt-3 font-display text-2xl leading-tight">{location.name}</span>
    </button>
  )
}
