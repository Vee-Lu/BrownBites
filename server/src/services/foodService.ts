import { getFoodsByMenuId } from "../repositories/foodRepository";

export async function fetchFoodsByMenuId(menuId: number) {
    return await getFoodsByMenuId(menuId);
}