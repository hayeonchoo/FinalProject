import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import {open} from 'sqlite';
import sqlite3 from 'sqlite3';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    console.log('fetch request data',data);
  })
  .post(async(req, res) => {
    console.log('POST request detected');
    const data = await fetch('https://api.spoonacular.com/recipes/analyzeInstructions');
    const json = await data.json();
    res.json(json);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});


// SQLite Settings

const dbSettings = {
	filename: './tmp/database.db',
	driver: sqlite3.Database
	};