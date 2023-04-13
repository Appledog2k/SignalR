// Create connection
var connectionUserCount = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Trace)
  .withUrl("/hubs/userCount", signalR.HttpTransportType.WebSockets)
  .build();
// Connect to methods that hub invokes aka receive notifications  from hub
connectionUserCount.on("updateTotalViews", (value) => {
  var newCountSpan = document.getElementById("totalViewsCounter");
  newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => {
  var newCountSpan = document.getElementById("totalUsersCounter");
  newCountSpan.innerText = value.toString();
});

// invoke hub methods aka send  notifications to hub
function newWindowLoadedOnClient() {
  connectionUserCount
    .invoke("NewWindowLoaded", "appledog2k")
    .then((value) => console.log(value));
}

// start connection
function fulfilled() {
  console.log("connection success");
  newWindowLoadedOnClient();
}
function rejected() {
  console.log("connection rejected");
}
connectionUserCount.start().then(fulfilled, rejected);
