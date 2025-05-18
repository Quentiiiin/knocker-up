import { Hono } from "hono";
const wol = require('wakeonlan');

const MAC_ADDRESS = process.env.TARGET_MAC_ADDRESS;

const PORT = 57771;

const app = new Hono();

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Knocker-Up WakeOnLan service sourcecode: https://github.com/Quentiiiin/knocker-up -->
    <meta charset="UTF-8">
    <title>Knocker-Up</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            text-align: center;
            padding: 50px;
        }
        #addr {
            font-size: 1.2em;
            margin: 20px 0;
        }
        button {
            padding: 10px 20px;
            font-size: 1em;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
    </style>
</head>
<body>
    <h1>Knocker-Up</h1>
    <p>Click the button below to send a magic packet to wake up the target device.</p>
    <p id="addr">MAC Address: ${MAC_ADDRESS}</p>
    <form action="/wake" method="post">
        <button type="submit">Knock up</button>
    </form>
</body>
</html>
`;

app.get("/", async (c) => {
    return c.html(html);
});

app.post("/wake", async (c) => {
    await wol(MAC_ADDRESS);
    return c.redirect("/");
});

export default {
    port: PORT,
    fetch: app.fetch,
};