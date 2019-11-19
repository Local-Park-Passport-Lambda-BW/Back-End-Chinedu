require('dotenv').config()
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const parkRouter = require('../park/parkRouter')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use('/api/parks', parkRouter)

server.get('/', (req, res) => {
    res.json("Heloo phc")
})

module.exports = server