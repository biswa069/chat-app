import amql from 'amqplib';

let channel: amql.Channel;

export const connectRabbitMQ = async () => {

    try{
        const connection = await amql.connect({
            protocol: "amqp",
            hostname: process.env.Rabbitmq_Host,
            port: 5672,
            username: process.env.Rabbitmq_Username,
            password: process.env.Rabbitmq_Password,
            
        });

        channel = await connection.createChannel();
        console.log("✅ Connected to RabbitMQ successfully");
    } catch (error) {

    }
};

export const publishToQueue = async (queueName: string, message: any) =>{
    if(!channel){
        console.error("RabbitMQ channel is not initialized");
        return;
    }
    await channel.assertQueue(queueName, {durable: true});
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)),{
        persistent: true,
    });
};