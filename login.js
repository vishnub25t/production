const http = require("http");
const querystring = require("querystring");

const PORT = 3000;

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Login Page</title>
    <style>
        body {
            font-family: Arial;
            background: #f4f4f4;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .login-box {
            background: white;
            padding: 30px;
            border-radius: 10px;
            width: 300px;
            box-shadow: 0px 0px 10px rgba(0,0,0,0.2);
        }

        h2 {
            text-align: center;
        }

        input {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
        }

        button {
            width: 100%;
            padding: 10px;
            margin-top: 15px;
            background: #007bff;
            color: white;
            border: none;
            cursor: pointer;
        }

        button:hover {
            background: #0056b3;
        }

        .msg {
            text-align: center;
            margin-top: 10px;
            color: green;
        }
    </style>
</head>
<body>

<div class="login-box">
    <h2>Login</h2>

    <form method="POST" action="/login">
        <input type="text" name="username" placeholder="Username" required />

        <input type="password" name="password" placeholder="Password" required />

        <button type="submit">Login</button>
    </form>
</div>

</body>
</html>
`;

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
    }

    else if (req.method === "POST" && req.url === "/login") {

        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {

            const data = querystring.parse(body);

            const username = data.username;
            const password = data.password;

            if (username === "admin" && password === "admin123") {

                res.writeHead(200, { "Content-Type": "text/html" });

                res.end(`
                    <h1 style="text-align:center; margin-top:50px;">
                        Login Successful ✅
                    </h1>
                `);

            } else {

                res.writeHead(401, { "Content-Type": "text/html" });

                res.end(`
                    <h1 style="text-align:center; margin-top:50px; color:red;">
                        Invalid Credentials ❌
                    </h1>
                `);
            }
        });
    }

    else {
        res.writeHead(404);
        res.end("Page Not Found");
    }
});

server.listen(PORT, () => {
    console.log('Server running at http://localhost:\${PORT}');
});
