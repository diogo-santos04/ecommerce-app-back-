const express = require('express');
const router = express.Router();
const usuarios = require('../models/usuarios'); // Importa o modelo criado

router.post('/usuario', async (req, res) => {
  try {
    const { nome, cpf } = req.body; // Dados recebidos do frontend
    const novoUsuario = await usuarios.create({ nome, cpf });
    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    res.status(500).json({ mensagem: 'Erro ao salvar usuário' });
  }
});

module.exports = router;
