import * as signalR from "@microsoft/signalr";
import * as customLogger from "./CustomLogger";

// WebSocket = undefined; // disable websockets
let btn = document.getElementById("btnGetFullName");

// Create connection to the server
let connection = new signalR.HubConnectionBuilder()
  // .configureLogging(new customLogger.CustomLogger())
  .withUrl(
    "/hub/stringtools"
    // , {
    //   transport:
    //     signalR.HttpTransportType.WebSockets |
    //     signalR.HttpTransportType.ServerSentEvents |
    //     signalR.HttpTransportType.LongPolling,
    //   // timeout: 1,
    // }
  )
  .build();

btn.addEventListener("click", function (evt) {
  var firstName = (
    document.getElementById("inputFirstName") as HTMLInputElement
  ).value;
  var lastName = (document.getElementById("inputLastName") as HTMLInputElement)
    .value;

  connection.invoke("GetFullName", firstName, lastName).then((name) => {
    alert(name);
  });
});

function startSuccess() {
  console.log("Connected");
}
function startFail() {
  console.log("Connection failed");
}

connection.start().then(startSuccess, startFail);
