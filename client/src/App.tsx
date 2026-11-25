import { FoodList } from './components/FoodList'
import { LocationCard } from './components/LocationCard'
import { MenuPicker } from './components/MenuPicker'
import { StatusMessage } from './components/StatusMessage'
import { useDiningBrowser } from './hooks/useDiningBrowser'

function App() {
  const browser = useDiningBrowser()

  return (
    <div className="min-h-screen bg-cream text-ink">
      <a
        href="#halls"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-20 focus:rounded-full focus:bg-paper focus:px-4 focus:py-2"
      >
        Skip to dining halls
      </a>
      <header className="border-b border-line bg-seal text-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-brass uppercase">Brown University</p>
            <h1 className="mt-1 font-display text-4xl tracking-tight sm:text-5xl">BrownBites</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-cream/75 sm:text-base">
              Browse dining halls, open a posted meal, and read the calories and macros for each food.
            </p>
          </div>
          <nav aria-label="Page" className="flex gap-2 text-sm font-semibold">
            <a className="rounded-full px-3 py-2 text-cream/80 hover:bg-white/10 hover:text-cream" href="#halls">
              Halls
            </a>
            <a className="rounded-full px-3 py-2 text-cream/80 hover:bg-white/10 hover:text-cream" href="#menus">
              Menus
            </a>
            <a className="rounded-full px-3 py-2 text-cream/80 hover:bg-white/10 hover:text-cream" href="#foods">
              Foods
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <section id="halls" aria-labelledby="halls-heading" className="scroll-mt-24">
          <div className="mb-4">
            <h2 id="halls-heading" className="font-display text-2xl text-seal">
              Dining halls
            </h2>
            <p className="mt-1 text-sm text-ink/70">Choose where you want to eat.</p>
          </div>

          {browser.locationsStatus === 'loading' ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
              <div className="h-28 animate-pulse rounded-2xl bg-line" />
              <div className="h-28 animate-pulse rounded-2xl bg-line" />
              <div className="h-28 animate-pulse rounded-2xl bg-line" />
            </div>
          ) : null}
          {browser.locationsStatus === 'error' ? (
            <StatusMessage
              tone="error"
              title="Dining halls could not be loaded"
              detail={browser.locationsError ?? undefined}
              actionLabel="Try again"
              onAction={browser.reloadLocations}
            />
          ) : null}
          {browser.locationsStatus === 'ready' && browser.locations.length === 0 ? (
            <StatusMessage title="No dining halls yet" detail="The database does not have any dining locations." />
          ) : null}
          {browser.locationsStatus === 'ready' && browser.locations.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {browser.locations.map((location) => (
                <LocationCard
                  key={location.id}
                  location={location}
                  selected={location.id === browser.selectedLocation?.id}
                  onSelect={browser.selectLocation}
                />
              ))}
            </div>
          ) : null}
        </section>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(16rem,22rem)_minmax(0,1fr)] lg:items-start">
          <MenuPicker
            locationName={browser.selectedLocation?.name ?? null}
            menus={browser.menus}
            status={browser.menusStatus}
            error={browser.menusError}
            selectedMenuId={browser.selectedMenu?.id ?? null}
            onSelect={browser.selectMenu}
          />
          <FoodList
            menu={browser.selectedMenu}
            foods={browser.foods}
            status={browser.foodsStatus}
            error={browser.foodsError}
          />
        </div>
      </main>
    </div>
  )
}

export default App
