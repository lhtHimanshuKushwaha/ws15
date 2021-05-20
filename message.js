const amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', (error, connection) => {
    if (error) {
        throw error;
    }
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        const queue = 'queuee'
        const message = 'Hey Message service is Available'
        channel.assertExchange(queue, 'fanout', { durable: false });
        channel.publish(queue, "", Buffer.from(JSON.stringify(message)));
        console.log('Message send successfully')

    })
    setTimeout(() => {
        connection.close();
    }, 500);

});