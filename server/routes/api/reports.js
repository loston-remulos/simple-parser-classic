const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Reports
router.get('/', async (req, res) => {
  const reports = await loadReportsCollection();

  res.send(await reports.find({}).toArray());
});

// Add Report
router.post('/', async (req, res) => {
  const reports = await loadReportsCollection();
  await reports.insertOne({
    text: req.body.text,
    createdAt: new Date(),
  });
  res.status(201).send();
});

// Delete Report
router.delete('/:id', async (req, res) => {
  const reports = await loadReportsCollection();
  await reports.deleteOne({
    _id: new mongodb.ObjectId(req.params.id)
  });
  res.status(200).send();
});

async function loadReportsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb+srv://loston:QqLPE6rkECqSr4ae@simpleparserclassic.klsrc.mongodb.net/SimpleParserClassic', { useNewUrlParser: true });

  return client.db('SimpleParserClassic').collection('reports');
}

module.exports = router;
