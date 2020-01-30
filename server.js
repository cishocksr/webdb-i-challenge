const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.json(accounts);
  } catch (err) {
    res.status(500).json({
      message: 'Failed to get accounts'
    });
  }
});

server.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { accounts } = await db('accounts').where('id', req.params.id);
    res.json(accounts);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to get post'
    });
  }
});

server.post('/', async (req, res) => {
  const acctData = req.body;
  try {
    const account = await db('accounts').insert(acctData);
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({
      error: 'Failed to insert account.'
    });
  }
});

module.exports = server;
