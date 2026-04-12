const config = require('./config'); 
const { Kafka } = require('kafkajs');
const db = require('./database');

const kafka = new Kafka({ 
  clientId: 'notification-service', 
  brokers: [config.kafka.broker] 
});
const consumer = kafka.consumer({ groupId: 'notification-group' });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'pedido-criado', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const pedido = JSON.parse(message.value.toString());
      
      console.log(`[KAFKA] Recebido: Pedido #${pedido.orderId}`);

      try {
        // A mágica do Knex: simples e seguro
        await db('notifications').insert({
          order_id: pedido.orderId,
          status: pedido.status
        });
        
        console.log(`[BANCO] Salvo com sucesso: Pedido #${pedido.orderId}`);
      } catch (err) {
        console.error('[BANCO] Erro ao salvar:', err);
      }
    },
  });
}

run();