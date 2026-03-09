import { Pool } from "pg";

const pool = new Pool({
connectionString: process.env.DATABASE_URL
});

export async function handler(event){

const body = JSON.parse(event.body);

let signal="BUY (example signal)";

await pool.query(

"INSERT INTO signals(signal) VALUES($1)",

[signal]

);

return {

statusCode:200,

body:JSON.stringify({

signal:signal

})

};

}