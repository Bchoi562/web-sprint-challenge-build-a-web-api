const express = require('express');
const server = express();

// Complete your server here!
// Do NOT `server.listen()` inside this file!
const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");

server.use(express.json())

function logger(req, res, next){
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}

server.use(logger)
server.use('/api/projects', projectsRouter)
server.use('/api/actions', actionsRouter)
server.get('/', (req, res) => {
   res.send(`<h2>Server Working!</h2>`)
});

module.exports = server;
