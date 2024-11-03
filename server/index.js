// Import configuration keys for PostgreSQL from the keys module
const keys = require("./keys");

// Express application setup
const express = require("express"); // Import Express for building the server
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing (CORS)

const app = express(); // Create an Express application instance
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(bodyParser.json()); // Parse JSON bodies in requests

// PostgreSQL client setup
const { Pool } = require("pg"); // Import Pool from pg module to manage PostgreSQL connections
const pgClient = new Pool({
  user: keys.pgUser, // PostgreSQL username from configuration
  host: keys.pgHost, // Host address of the PostgreSQL server
  database: keys.pgDatabase, // Name of the PostgreSQL database
  password: keys.pgPassword, // Password for the PostgreSQL user
  port: keys.pgPort, // Port number for the PostgreSQL server
});

// Ensure PostgreSQL connection is established and initialize table if it doesn't exist
pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS values (number INT)") // Create table "values" if it doesn't exist
    .catch((err) => console.log("PG ERROR", err)); // Log any errors during table creation
});

// Express route definitions

// Root route for testing the server
app.get("/", (req, res) => {
  res.send("Hi"); // Respond with a simple greeting message
});

// Route to retrieve all values stored in the database
app.get("/values/all", async (req, res) => {
  const values = await pgClient.query("SELECT * FROM values"); // Fetch all rows from "values" table
  res.send(values); // Send the retrieved values as the response
});

// Route to insert a new value into the database
app.post("/values", async (req, res) => {
  if (!req.body.value) res.send({ working: false }); // Validate that a value is provided in the request body

  pgClient.query("INSERT INTO values(number) VALUES($1)", [req.body.value]); // Insert the new value into "values" table

  res.send({ working: true }); // Confirm the operation was successful
});

// Start the server and listen on port 5000
app.listen(5000, (err) => {
  console.log("Listening"); // Log that the server is up and running
});
