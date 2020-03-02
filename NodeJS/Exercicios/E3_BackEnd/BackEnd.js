const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

let counter = 0;

const user = {};

app.get("/", (resquest, response) => {
    let sessionId = resquest.cookies['session-Id'];

    if (users[sessionId]) {
        users[sessionId], visitCout++;
    } else {
        sessionId = String(Math.random());
        response.cookie('session-Id', sessionId);
        users[sessionId] = { visitorNR: counter, visitCout: 1 };
        counter++;
    }
    const session = users[sessionId];
    response.end('Hello World!\nYou are a visitor number: ' + session.visitNR + '\nYou are visiting for: ' + session.visitCout + " times");
})

app.listen(8080);