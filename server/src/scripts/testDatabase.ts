import pool from "../config/database";

async function testDatabase() {
    try {
        // TODO 1:
        // Execute SELECT 1 using pool.query()
        const text = 'SELECT 1'
        const result = await pool.query(text);

        // TODO 2:
        // Print the query result to the console
        console.log(result.rows[0]);
    } catch(error) {
        process.exitCode = 1;
        console.error("Error testing database:", error);
    } finally {
        // TODO 3:
        // Close the connection pool using pool.end()
        await pool.end();
        console.log('Connection pool closed');
    }
}

testDatabase();