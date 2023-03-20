const express = require('express');
const router = express.Router();

router.get('/ping', (req, res) => {
  try {
    res.send({ message: 'pong' });
  } catch (err) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

module.exports = router;
