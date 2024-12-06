import express from 'express';
import pool from '../../database/pool.js';
import usuarios from '../../models/usuarios.js';

const router = express.Router();

//adicionar
router.post('/', async (req, res) => {
  try {
    const { nome, cpf } = req.body;
    const novoUsuario = await usuarios.create({ nome, cpf });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    res.status(500).json({ mensagem: 'Erro ao salvar usuário' });
  }
});

router.get("/dados", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).send("Erro ao buscar dados");
  }
});

router.delete("/usuario/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
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

export default router;
