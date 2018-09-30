const express = require('express');
const app = express();
const { resolve } = require('path');
const appPort = 8080;


app.use(express.static(resolve(__dirname, '../frontend/dist/ng-maze')));

app.listen(appPort, () => {

  console.log(`Maze running on port: ${appPort}`);
});
