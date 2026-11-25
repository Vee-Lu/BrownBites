const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:3001').replace(/\/$/, '')

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type ApiSuccess<T> = {
  success: true
  data: T
}

type ApiFailure = {
  success: false
  error?: string
}

export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      signal,
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw error
    }
    throw new ApiError('The BrownBites API could not be reached.', 0)
  }

  let body: ApiSuccess<T> | ApiFailure | null = null
  try {
    body = (await response.json()) as ApiSuccess<T> | ApiFailure
  } catch {
    body = null
  }

  if (!response.ok || !body || body.success === false) {
    const message =
      body && body.success === false && body.error
        ? body.error
        : `Request failed (${response.status}).`
    throw new ApiError(message, response.status)
  }

  return body.data
}
