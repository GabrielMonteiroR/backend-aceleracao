import express from "express";
import routes from "./routes.js";
import db from "./db.js";

const app = express();
const port = 3002;

app.use(express.json());
app.use(routes);

db.sync(() => console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`));

app.listen(port);
console.log(`Aplicação rodando na porta ${port}`);
