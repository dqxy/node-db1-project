const express = require('express');

// database access using knex
const db = require('./data/dbConfig.js');

const router = express.Router();

router.get("/", (req, res) => {
    db.select("*")
      .from("accounts")
      .then(accounts => {
        res.status(200).json({ data: accounts });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  });

router.get('/:id', (req, res) => {
    // read http://knexjs.org/#Builder-where
  db("accounts")
  .where({ id: req.params.id })
  // .where('id', req.params.id)
  .first()
  .then(accounts => {
    res.status(200).json({ data: accounts });
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({ error: error.message });
  });
});

router.post('/', (req, res) => {
    const postData = req.body;
    db("accounts")
      .insert(postData, "id")
      .then(ids => {
        const id = ids[0];
        db("accounts")
          .where({ id })
          .first()
          .then(post => {
            res.status(201).json({ data: post });
          });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
});

router.patch("/:id", (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    // update posts set title = 'new title' where id = 5;
    db("accounts")
      .where({ id }) // remember to filter
      .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "update successful" });
        } else {
          res.status(404).json({ message: "no accounts by that id found" });
        }
      });
  });
  

router.delete('/:id', (req, res) => {
    db("accounts")
    .where({ id: req.params.id })
    // .where('id', req.params.id)
    .del()
    .then(accounts => {
      res.status(200).json({ message: "delete successful" });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;