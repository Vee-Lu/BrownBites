import type { DiningLocation } from '../types/dining'
import { apiGet } from './apiClient'

export function getDiningLocations(signal?: AbortSignal): Promise<DiningLocation[]> {
  return apiGet<DiningLocation[]>('/api/v1/dining-locations', signal)
}
