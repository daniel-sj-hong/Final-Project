require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);
const app = express();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const JSONMiddleware = express.json();
app.use(JSONMiddleware);

app.use(staticMiddleware);

app.get('/api/categories', (req, res) => {
  const sql = `
    select *
      from "public"."Categories";
  `;
  db.query(sql)
    .then(result => {
      const grade = result.rows;
      res.json(grade);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.get('/api/restaurants', (req, res, next) => {
  const { category, location } = req.query;
  client.search({
    term: category,
    location: location
  })
    .then(response => {
      res.status(200).send(response.jsonBody.businesses);
    })
    .catch(err => next(err));
});

app.get('/api/reviews', (req, res, next) => {
  client.reviews(req.query.alias).then(response => {
    res.status(200).send(response.jsonBody.reviews);
  })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
