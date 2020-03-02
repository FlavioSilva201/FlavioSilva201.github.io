const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedURL = url.parse(req.url);
    const querey = new URLSearchParams(parsedURL.search);
    const name = querey.get("name");

    res.setHeader("Content-Type", "text/html; charset=utf-8")
    res.end(name ? greet(name) : form())
        // res.end("Hello, ${name}!");
});

server.listen(8080, () => {
    console.log("Listening on http://localhost:8080");
});


function greet(name) {
    name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello, ${name}</title>
</head>
<body>
    <h1> Hello, ${name} </h1>
</body>
</html>
    `;
}


function form() {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello</title>
</head>
<body>
    <form>
    <label for="name"> What is your name?</label>
    <input name = "name">
    <button> Continuar </button>
    </form>
</body>
</html>
    `;
}