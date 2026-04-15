const { Kafka } = require('kafkajs');
const config = require('./config'); // Usando o config que já criamos

const kafka = new Kafka({ 
  clientId: 'order-api', 
  brokers: [config.kafka.broker] 
});

const producer = kafka.producer();

// Função para enviar a mensagem
async function sendOrderEvent(orderData) {
  await producer.connect();
  await producer.send({
    topic: 'pedido-criado',
    messages: [
      { value: JSON.stringify(orderData) }
    ],
  });
  console.log(`[KAFKA PRODUCER] Evento enviado: ${orderData.orderId}`);
}

// Exportamos a função em vez de rodar o run()
module.exports = { sendOrderEvent };