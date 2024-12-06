import express from 'express';
import usuarioRouter from './usuario.js';

const router = express.Router();

router.use('/usuario', usuarioRouter)

router.get('/ping', (req, res) => {
    res.json({ pong: true});
})

export default router;