const pool = require("./db");

async function testDB() {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connected!");
        console.log(result.rows);
    } catch (err) {
        console.error("DB connection error:", err);
    }
}

testDB();