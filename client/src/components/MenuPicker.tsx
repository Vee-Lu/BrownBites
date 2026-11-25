import { formatMenuDate, mealRank, menuDateKey } from '../lib/format'
import type { Menu } from '../types/menu'
import { StatusMessage } from './StatusMessage'

type MenuPickerProps = {
  locationName: string | null
  menus: Menu[]
  status: 'idle' | 'loading' | 'ready' | 'error'
  error: string | null
  selectedMenuId: number | null
  onSelect: (id: number) => void
}

export function MenuPicker({
  locationName,
  menus,
  status,
  error,
  selectedMenuId,
  onSelect,
}: MenuPickerProps) {
  const groups = groupMenus(menus)

  return (
    <section id="menus" aria-labelledby="menus-heading" className="scroll-mt-24">
      <div className="mb-4">
        <h2 id="menus-heading" className="font-display text-2xl text-seal">
          Menus
        </h2>
        <p className="mt-1 text-sm text-ink/70">
          {locationName ? `Posted meals for ${locationName}.` : 'Choose a dining hall to see its menus.'}
        </p>
      </div>

      {status === 'loading' ? <MenuSkeleton /> : null}
      {status === 'error' ? (
        <StatusMessage tone="error" title="Menus could not be loaded" detail={error ?? undefined} />
      ) : null}
      {status === 'idle' ? (
        <StatusMessage title="No hall selected" detail="Select a dining hall to browse its posted menus." />
      ) : null}
      {status === 'ready' && groups.length === 0 ? (
        <StatusMessage
          title="No menus posted"
          detail={
            locationName
              ? `${locationName} does not have a menu in BrownBites yet.`
              : 'This dining hall does not have a menu yet.'
          }
        />
      ) : null}
      {status === 'ready' && groups.length > 0 ? (
        <div className="space-y-5">
          {groups.map((group) => (
            <div key={group.date}>
              <h3 className="text-sm font-semibold tracking-wide text-ink/60 uppercase">{formatMenuDate(group.date)}</h3>
              <ul className="mt-2 flex list-none flex-wrap gap-2 p-0">
                {group.menus.map((menu) => {
                  const selected = menu.id === selectedMenuId
                  return (
                    <li key={menu.id}>
                      <button
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onSelect(menu.id)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cardinal ${
                          selected
                            ? 'bg-cardinal text-white'
                            : 'bg-paper text-seal ring-1 ring-line hover:ring-brass'
                        }`}
                      >
                        {menu.meal_type}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function groupMenus(menus: Menu[]) {
  const groups = new Map<string, Menu[]>()
  for (const menu of menus) {
    const date = menuDateKey(menu.menu_date)
    const current = groups.get(date) ?? []
    current.push(menu)
    groups.set(date, current)
  }

  return [...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, items]) => ({
      date,
      menus: [...items].sort(
        (left, right) => mealRank(left.meal_type) - mealRank(right.meal_type) || left.meal_type.localeCompare(right.meal_type),
      ),
    }))
}

function MenuSkeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      <div className="h-4 w-32 animate-pulse rounded bg-line" />
      <div className="flex gap-2">
        <div className="h-10 w-24 animate-pulse rounded-full bg-line" />
        <div className="h-10 w-24 animate-pulse rounded-full bg-line" />
      </div>
    </div>
  )
}
