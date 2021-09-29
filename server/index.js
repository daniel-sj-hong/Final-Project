require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const yelp = require('yelp-fusion');
const ClientError = require('./client-error');
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
      const list = result.rows;
      res.json(list);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

app.get('/api/business', (req, res, next) => {
  client.business(req.query.alias).then(response => {
    res.status(200).json(response.jsonBody);
  })
    .catch(err => next(err));
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

app.get('/api/favorites', (req, res, next) => {
  const sql = `
  select *
  from "Favorites"
  `;
  db.query(sql)
    .then(response => res.status(200).json(response.rows))
    .catch(err => next(err));
});

app.delete('/api/favorites', (req, res, next) => {
  const { alias } = req.body;
  const sql = `
  delete from "Favorites"
  where "alias" = $1
  returning *
  `;
  const params = [alias];
  db.query(sql, params)
    .then(result => {
      if (!result) {
        throw new ClientError(404, `Cannot find favorites with alias of ${alias}`);
      }
      res.status(204).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/getFavs', (req, res, next) => {
  const sql = `
  select * from "Favorites"
  where "alias" = $1
  `;
  const params = [req.query.alias];
  db.query(sql, params)
    .then(result => {
      const saved = result.rows;
      res.status(200).json(saved);
    })
    .catch(err => next(err));
});

app.post('/api/favorites', (req, res, next) => {
  const { details, alias } = req.body;
  const sql = `
  insert into "Favorites" ("details", "alias")
  values ($1, $2)
  returning *
  `;
  const params = [details, alias];
  db.query(sql, params)
    .then(result => {
      const favorite = result.rows[0];
      res.status(201).json(favorite);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
