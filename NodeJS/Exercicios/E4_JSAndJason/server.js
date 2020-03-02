const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());

let sessionCount = 0;
const sessions = {};

app.use((req, res, next) => {
    let sessionId = req.cookies['session-id'];

    if (sessions[sessionId]) {
        sessions[sessionId].visitCount++;
    } else {
        sessionId = String(Math.random());
        res.cookie('session-id', sessionId);
        sessionCount++;
        sessions[sessionId] = { visitorNr: sessionCount, visitCount: 1 };
    }

    const session = sessions[sessionId];
    req.session = session;
    next();
});


app.use(express.static('public'));

app.get('/greet', (request, response) => {
    const { session } = request;
    response.end(`Hello, world!\nYou are visitor number ${session.visitorNr}.\nYou are visiting for the ${session.visitCount} time`);
});

const songs = [
    {
        title: 'Smells Like Teen Spirit',
        artist: 'Nirvana',
        trackNr: 1,
        album: 'Nevermind'
    },
    {
        title: 'Lithium',
        artist: 'Nirvana',
        trackNr: 5,
        album: 'Nevermind'
    }
];

app.get('/song', (_request, response) => {
    response.json(songs);
});

app.post('/song', express.json(), (request, response) => {
    songs.push(request.body);
    response.writeHead(204).end();
});


app.get('*', (_req, res) => {
    res.status(404);
    res.end('This is not the page you\'re looking for');
});

app.listen(8080);
