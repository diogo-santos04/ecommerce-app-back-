const express = require("express");
const router = express.Router();
const pool = require("../database/pool"); 
const usuarios = require('../models/usuarios');

router.get("/dados", async (req, res) => {
  try {
    console.log(req.body);
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).send("Erro ao buscar dados");
  }
});

router.post('/usuario', async (req, res) => {
  try {
    const { nome, cpf } = req.body;
    const novoUsuario = await usuarios.create({ nome, cpf });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    res.status(500).json({ mensagem: 'Erro ao salvar usuário' });
  }
});

router.delete("/usuario/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
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

module.exports = router;
