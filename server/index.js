require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);
// const fetch = require('node-fetch');
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

// app.get('https://api.yelp.com/v3/businesses/WavvLdfdP6g8aZTtbBQHTw', {
//   method: 'GET',
//   headers: {
//     'Authorization': 'Bearer ZZzEoImZA2NvtiETYewLjKxwPGzlcPLRidq6cUNAeGNWYUIhflVhUDtFooHe6Fxa5Hm9H-Iq4Cc6BN-sttsdxsyZ-6F6_gWpjNuAjfC5d0ATT7YHX1MTYnJKGKElYXYx'
//   }
// }

app.get('/api/test', (req, res, next) => {
  client.search({
    term: 'Korean',
    location: 'Irvine'
  }).then(response => {
    console.log(response.jsonBody.businesses);
  }).catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
