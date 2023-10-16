const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;
const connection = mysql.createConnection({
    host: "ubuntu.cqs8aumtlhcg.ap-southeast-2.rds.amazonaws.com",
    user: "admin",
    password: "lynu**18",
    database: 'assignment'
});


app.get("/healthcheck", (req, res) => {
    res.status(200).json({status: "OK"});
});


app.use(express.json());

// User Sign Up API
app.post("/users", (req, res) => {
    const {name, email, password} = req.body;

    // Data validation
    const passwordRegex = /[A-Z]/g
    //
    if (
        false &&
        !password.match(passwordRegex)
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
        connection.query(insertQuery, [name, email, password], (err, results) => {
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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

