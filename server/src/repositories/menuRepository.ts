import pool from "../config/database";

export async function getMenusByDiningLocationId(diningLocationId: number) {
    const result = await pool.query(
        `SELECT 
            id, 
            menu_date, 
            meal_type, 
            dining_location_id 
        FROM menus 
        WHERE dining_location_id = $1 ORDER BY menu_date ASC`,
        [diningLocationId]
    );
    return result.rows;
}