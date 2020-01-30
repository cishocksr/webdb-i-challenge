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

server.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const acctUpdate = await db('accounts')
      .where('id', id)
      .update(req.body);
    res.status(200).json({ updated: acctUpdate });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update post'
    });
  }
});

server.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const acctDeleted = await db('accounts')
      .where('id', id)
      .del();
    res.status(200).json({
      deletedAccount: acctDeleted
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update post'
    });
  }
});
module.exports = server;
