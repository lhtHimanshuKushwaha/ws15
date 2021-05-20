
var amqp = require('amqplib/callback_api');
amqp.connect('amqp://localhost', (error, connection) => {
    if (error) {
        throw error;
    }
    connection.createChannel(function (error, channel) {
        if (error) {
            throw error;
        }
        const exchange = 'queuee'
        channel.assertExchange(exchange, 'fanout', {
            durable: false
        });
        channel.assertQueue('', { exclusive: true }, function (error, q) {
            if (error) {
                throw error;
            }
            channel.bindQueue(q.queue, exchange, '');
            channel.consume(q.queue, function (msg) {
                if (msg.content) {
                    console.log(typeof (msg));
                    console.log(" Received: ", msg.content.toString());
                }
            },
                {
                    noAck: true
                });
        });
    });
});
