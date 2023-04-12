import * as signalR from "@microsoft/signalr";
import * as customLogger from "./CustomLogger";

// WebSocket = undefined; // disable websockets
var counter = document.getElementById("viewCounter");

// Create connection to the server
let connection = new signalR.HubConnectionBuilder()
  // .configureLogging(new customLogger.CustomLogger())
  .withUrl("/hub/view", {
    transport:
      signalR.HttpTransportType.WebSockets |
      signalR.HttpTransportType.ServerSentEvents |
      signalR.HttpTransportType.LongPolling,
    // timeout: 1,
  })
  .build();

// on view update message from client
connection.on("viewCountUpdate", (value: number) => {
  counter.innerText = value.toString();
});

// notify server we are watching the view
function notify() {
  connection.send("notifyWatching");
}

// start connection
function startSuccess() {
  console.log("Connected");
  notify();
}
function startFail() {
  console.log("Connection failed");
}

connection.start().then(startSuccess, startFail);
