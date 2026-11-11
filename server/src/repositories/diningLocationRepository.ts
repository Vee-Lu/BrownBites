import pool from "../config/database";

//Function to get all dining locations using SQL query
export async function getAllDiningLocations() {
    const result = await pool.query(
        'SELECT id, name FROM dining_locations ORDER BY name ASC'
    );

    return result.rows;
}

//Function to get dining location by id
export async function getDiningLocationById(id : number) {
    const result = await pool.query(
        'SELECT id, name FROM dining_locations WHERE id = $1',
        [id]
    );
    return result.rows[0];
}