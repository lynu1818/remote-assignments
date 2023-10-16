const express = require("express");
const mysql = require("mysql2");
const bcrypt = require('bcrypt');
const app = express();
const port = 3000;
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});


app.get("/healthcheck", (req, res) => {
    res.status(200).json({status: "OK"});
});


app.use(express.json());

// User Sign Up API
app.post("/users", (req, res) => {
    const {name, email, password} = req.body;

    // Data validation
    const AZRegex = /[A-Z]/g
    const azRegex = /[a-z]/g
    const numRegex = /[0-9]/g
    const specialRegex = /[~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/|]/g

    // test password
    const validated_array = [
        password.match(AZRegex),
        password.match(azRegex),
        password.match(numRegex),
        password.match(specialRegex)
    ].filter((item) => item !== null)

    if (
        validated_array.length < 3 ||
        name == null ||
        email == null
    ) {
        return res.status(400).json({error: "Invalid input data"});
    }

    // Check if the email already exists in the database
    const emailCheckQuery = "SELECT * FROM users WHERE email = ?";
    connection.query(emailCheckQuery, [email], (err, results) => {
        if (err) {
            console.error("Error checking email:", err);
            return res.status(500).json({error: "Error checking email"});
        }

        if (results.length > 0) {
            return res.status(409).json({error: "Email already exists"});
        }

        // Insert data into the database
        const insertQuery =
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        connection.query(insertQuery, [name, email, bcrypt.hashSync(password, 10)], (err, results) => {
            if (err) {
                console.error("Error inserting data:", err);
                return res.status(500).json({error: "Error inserting data"});
            }

            const userId = results.insertId;
            const responseData = {
                user: {
                    id: userId,
                    name,
                    email,
                },
                "request-date": new Date().toUTCString(),
            };

            res.status(200).json({data: responseData});
        });
    });
});

// User Query API
app.get("/users", (req, res) => {
    // param query id
    const id = req.query.id;

    // Check if the id exists in the database
    const idCheckQuery = "SELECT * FROM users WHERE id = ?";
    connection.query(idCheckQuery, [id], (err, results) => {
        if(err) {
            console.error("Error checking id:", err);
            return res.status(400).json({error: "Error checking id"});
        }

        if(results.length === 0) {
            return res.status(403).json({error: "User not found"});
        }

        const responseData = {
            user: {
                id: results[0].id,
                name: results[0].name,
                email: results[0].email,
            },
            "request-date": new Date().toUTCString(),
        }
        res.status(200).json({data: responseData});
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

