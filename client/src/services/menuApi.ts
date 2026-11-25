import type { Menu } from '../types/menu'
import { apiGet } from './apiClient'

export function getMenusByDiningLocationId(
  diningLocationId: number,
  signal?: AbortSignal,
): Promise<Menu[]> {
  return apiGet<Menu[]>(`/api/v1/dining-locations/${diningLocationId}/menus`, signal)
}
