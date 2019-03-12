const WebSocket = require("ws");
let data;

const cs = params => {
  return new Promise(resolve => {
    const ws = new WebSocket("ws://192.168.0.20:8090");

    const msg = JSON.stringify({
      id: 200,
      method: "order.subscribe",
      params: [84, "BTCUSD"]
    });

    ws.on("open", function open() {
      ws.send(msg);
    });

    ws.on("message", function incoming(data) {
      // const dat = JSON.parse(data)
      // pubsub.publish(MESSAGE_CREATED, {
      // 	messageCreated:{message:dat },
      // })

      data = { message: data };
      resolve(data);
    });
  });
};
cs().then(data => console.log(data));

console.log(data);