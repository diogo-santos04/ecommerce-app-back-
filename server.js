const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use(cors());
app.use(express.json());

// rota
app.use("/api", usuarioRoutes); // Rota para salvar dados do usuário

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

app.delete("/api/usuario/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido." });
    }

    const result = await pool.query(
      "DELETE FROM usuarios WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro ao processar a solicitação." });
  }
});

app.get("/dados", async (req, res) => {
  try {
    console.log(req, res);
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar dados");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
