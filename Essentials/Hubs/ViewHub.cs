using Microsoft.AspNetCore.SignalR;

public class ViewHub : Hub
{
    private static int ViewCount { get; set; } = 0;
    public void IncrementServerView()
    {
        ViewCount++;
        Clients.All.SendAsync("incrementView", ViewCount);
    }
}