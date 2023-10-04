import express from "express";
import pg from "pg";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Pool = pg.Pool
const db = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data.rows);
  });
});

app.post("/books",  (req, res) => {

  const q = {
    text: 'INSERT INTO books (title, description, price, cover) VALUES ($1, $2, $3, $4)',
    values: [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.cover,
    ]
  };

  db.query(q, (err, data) => {
    if (err) return res.send(err).toString();
    return res.json(data);
  });
});

app.delete("/books/:id", (req, res) => {
  const q = {
    text: 'DELETE FROM books WHERE id = $1',
    values: [
      req.params.id
    ]
  };

  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {

  const q = {
    text: 'UPDATE books SET title= $1, description= $2, price= $3, cover= $4 WHERE id = $5',
    values: [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.cover,
      req.params.id
    ]
  };

  db.query(q, (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8080, 'localhost',(err) => {
  if (err) {
    console.error(err);
  }
  console.log(`Connected to backend`);
});
