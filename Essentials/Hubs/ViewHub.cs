using Microsoft.AspNetCore.SignalR;

public class ViewCount : Hub
{
    public static int ViewCount { get; set; } = 0;
    public async Task NotifyWatching()
    {
        ViewCount++;

        // notify everyone that the view count has changed
        await Clients.All.SendAsync("viewCountUpdate", ViewCount);
    }
}