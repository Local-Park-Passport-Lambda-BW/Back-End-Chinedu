const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mainRouter = require('../routes')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/', mainRouter)

module.exports = server