import express from "express";
import cors from "cors";
import router from './routes/index.js';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
