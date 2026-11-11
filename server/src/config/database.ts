import { Pool } from "pg";

// TODO: Read DATABASE_URL from the environment.
const databaseUrl = process.env.DATABASE_URL
// TODO: check databaseUrl here
if (!databaseUrl) {
    throw new Error("DATABASE_URL cannot be empty");
}
// TODO: Create a PostgreSQL Pool.
const pool = new Pool({
    connectionString: databaseUrl
});
// TODO: Export the pool so repositories can eventually use it.
export default pool;