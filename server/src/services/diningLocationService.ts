import { getAllDiningLocations, getDiningLocationById } from "../repositories/diningLocationRepository"

export async function fetchAllDiningLocations() {
   return await getAllDiningLocations();
}

export async function fetchDiningLocationById(id: number) {
   return await getDiningLocationById(id);
}