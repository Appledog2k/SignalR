import * as signalR from "@microsoft/signalr";
import { CustomLogger } from "./customLogger";

var counter = document.getElementById("viewCounter");
// Create connection to the server
let connection = new signalR.HubConnectionBuilder()
  .configureLogging(new CustomLogger())
  .withUrl("/hub/view")
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
