import express = require('express');

const app: express.Application = express();

app.get('/', (req:express.Request, res:express.Response) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log(`TypeScript Company listening on port: 3000`);
})