import type { FoodItem } from '../types/food'
import { apiGet } from './apiClient'

export function getFoodsByMenuId(menuId: number, signal?: AbortSignal): Promise<FoodItem[]> {
  return apiGet<FoodItem[]>(`/api/v1/menus/${menuId}/foods`, signal)
}
