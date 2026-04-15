const express = require('express');
const { sendOrderEvent } = require('./producer');
const app = express();

app.use(express.json());

app.post('/orders', async (req, res) => {
  const { orderId, status } = req.body;

  // Validação simples
  if (!orderId || !status) {
    return res.status(400).json({ error: 'orderId e status são obrigatórios' });
  }

  try {
    // Dispara o evento para o Kafka
    await sendOrderEvent({ orderId, status });
    
    return res.status(202).json({ 
      message: 'Pedido recebido e processamento iniciado',
      orderId 
    });
  } catch (error) {
    console.error('Erro ao processar pedido:', error);
    return res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`[REST API] Servidor a correr na porta ${PORT}`);
});