var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");
// Create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Trace)
  .withUrl("/hubs/deathlyhallows", signalR.HttpTransportType.WebSockets)
  .build();
// Connect to methods that hub invokes aka receive notifications  from hub
connectionDeathlyHallows.on(
  "updateDeathlyHallowCount",
  (cloak, stone, wand) => {
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
  }
);

// invoke hub methods aka send  notifications to hub

// start connection
function fulfilled() {
  connectionDeathlyHallows.invoke("GetRaceStatus").then((raceCounter) => {
    cloakSpan.innerText = raceCounter.cloak.toString();
    stoneSpan.innerText = raceCounter.stone.toString();
    wandSpan.innerText = raceCounter.wand.toString();
  });
  console.log("connection success");
}
function rejected() {
  console.log("connection rejected");
}
connectionDeathlyHallows.start().then(fulfilled, rejected);
