import { formatNutrition, nutritionNumber } from '../lib/format'
import type { FoodItem } from '../types/food'
import type { Menu } from '../types/menu'
import { StatusMessage } from './StatusMessage'

type FoodListProps = {
  menu: Menu | null
  foods: FoodItem[]
  status: 'idle' | 'loading' | 'ready' | 'error'
  error: string | null
}

export function FoodList({ menu, foods, status, error }: FoodListProps) {
  return (
    <section id="foods" aria-labelledby="foods-heading" className="scroll-mt-24">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 id="foods-heading" className="font-display text-2xl text-seal">
            Foods
          </h2>
          <p className="mt-1 text-sm text-ink/70">
            {menu ? `${menu.meal_type} nutrition for one posted serving.` : 'Select a meal to see its foods.'}
          </p>
        </div>
        {status === 'ready' && foods.length > 0 ? (
          <p className="text-sm font-medium text-ink/60">{foods.length === 1 ? '1 item' : `${foods.length} items`}</p>
        ) : null}
      </div>

      {status === 'loading' ? <FoodSkeleton /> : null}
      {status === 'error' ? (
        <StatusMessage tone="error" title="Foods could not be loaded" detail={error ?? undefined} />
      ) : null}
      {status === 'idle' ? (
        <StatusMessage title="No meal selected" detail="Choose a date and meal type to see the foods on that menu." />
      ) : null}
      {status === 'ready' && foods.length === 0 ? (
        <StatusMessage
          title="No foods on this menu"
          detail="This meal is posted, but it does not have any food items yet."
        />
      ) : null}
      {status === 'ready' && foods.length > 0 ? (
        <ul className="space-y-3">
          {foods.map((food, index) => (
            <li key={`${food.name}-${food.serving_size ?? 'serving'}-${index}`}>
              <FoodCard food={food} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}

function FoodCard({ food }: { food: FoodItem }) {
  const protein = nutritionNumber(food.protein_g) ?? 0
  const carbs = nutritionNumber(food.carbs_g) ?? 0
  const fat = nutritionNumber(food.fat_g) ?? 0
  const total = protein + carbs + fat

  return (
    <article className="rounded-2xl border border-line bg-paper p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-display text-xl text-seal">{food.name}</h3>
          <p className="mt-1 text-sm text-ink/70">
            {food.serving_size ? `Serving ${food.serving_size}` : 'Serving size not listed'}
          </p>
        </div>
        <p className="sm:text-right">
          <span className="font-display text-3xl leading-none text-cardinal">{formatNutrition(food.calories)}</span>
          <span className="mt-1 block text-xs font-semibold tracking-[0.14em] text-ink/50 uppercase">Calories</span>
        </p>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        <Macro label="Protein" value={formatNutrition(food.protein_g)} unit="g" />
        <Macro label="Carbs" value={formatNutrition(food.carbs_g)} unit="g" />
        <Macro label="Fat" value={formatNutrition(food.fat_g)} unit="g" />
      </dl>

      {total > 0 ? (
        <div className="mt-4">
          <div
            className="flex h-2 overflow-hidden rounded-full bg-line"
            aria-hidden="true"
          >
            <span className="bg-cardinal" style={{ width: `${(protein / total) * 100}%` }} />
            <span className="bg-brass" style={{ width: `${(carbs / total) * 100}%` }} />
            <span className="bg-seal" style={{ width: `${(fat / total) * 100}%` }} />
          </div>
          <p className="mt-2 text-xs text-ink/55">Macro mix by grams. Protein, carbohydrates, then fat.</p>
        </div>
      ) : null}
    </article>
  )
}

function Macro({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="rounded-xl bg-cream px-3 py-2">
      <dt className="text-xs font-semibold tracking-wide text-ink/55 uppercase">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-seal">
        {value}
        <span className="ml-0.5 text-sm font-medium text-ink/50">{unit}</span>
      </dd>
    </div>
  )
}

function FoodSkeleton() {
  return (
    <div className="space-y-3" aria-hidden="true">
      <div className="h-32 animate-pulse rounded-2xl bg-line/80" />
      <div className="h-32 animate-pulse rounded-2xl bg-line/60" />
    </div>
  )
}
