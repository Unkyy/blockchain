const io = require("socket.io")(5656, {
    cors: {
      origin: "https://example.com",
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    }
  });

io.on("connection", (socket: any) => {
  // either with send()
//   socket.send("Hello!");

  // or with emit() and custom event names
  socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));

//   // handle the event sent with socket.send()
//   socket.on("message", (data) => {
//     console.log(data);
//   });

//   // handle the event sent with socket.emit()
//   socket.on("salutations", (elem1, elem2, elem3) => {
//     console.log(elem1, elem2, elem3);
//   });
});
class Socket {

    update(event: string, data: string){
        io.on("connection", (socket: any) => {
            socket.emit(event, data);
          });
    }
}