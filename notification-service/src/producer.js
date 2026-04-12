const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:9092'] });
const producer = kafka.producer();

async function run() {
  await producer.connect();
  await producer.send({
    topic: 'pedido-criado',
    messages: [{ value: JSON.stringify({ orderId: '123', status: 'CRIADO' }) }],
  });
  console.log("Pedido enviado!");
  await producer.disconnect();
}
run();