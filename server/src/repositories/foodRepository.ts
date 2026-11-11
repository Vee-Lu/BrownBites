import pool from "../config/database";

/**
 * Retrieves food items info for a given menu ID from the database, joining with the menu_items table
 * @param menuId - The ID of the menu to get foods for
 * @returns An array of food items for the given menu
 */
export async function getFoodsByMenuId(menuId: number) {
    const result = await pool.query (
        `SELECT 
            f.name, 
            f.serving_size, 
            f.calories, 
            f.protein_g, 
            f.carbs_g,
            f.fat_g
        FROM food_items f
        JOIN menu_items mi ON f.id = mi.food_item_id
        WHERE mi.menu_id = $1`,
        [menuId]
    );

    return result.rows;
}