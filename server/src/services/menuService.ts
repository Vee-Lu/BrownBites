import { getMenusByDiningLocationId } from "../repositories/menuRepository";

export async function fetchMenusByDiningLocationId(diningLocationId: number) {
    return await getMenusByDiningLocationId(diningLocationId);
}