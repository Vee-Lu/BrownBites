type StatusMessageProps = {
  title: string
  detail?: string
  actionLabel?: string
  onAction?: () => void
  tone?: 'loading' | 'empty' | 'error'
}

export function StatusMessage({
  title,
  detail,
  actionLabel,
  onAction,
  tone = 'empty',
}: StatusMessageProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className="rounded-2xl border border-dashed border-line bg-paper px-5 py-8 text-center"
    >
      <p className="font-display text-xl text-seal">{title}</p>
      {detail ? <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink/70">{detail}</p> : null}
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-4 rounded-full bg-cardinal px-4 py-2 text-sm font-semibold text-white transition hover:bg-cardinal/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cardinal"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}
