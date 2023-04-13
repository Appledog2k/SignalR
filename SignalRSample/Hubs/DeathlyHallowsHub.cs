using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;
using SignalRSample;

public class DeathlyHallowsHub : Hub
{
    public Dictionary<string, int> GetRaceStatus()
    {
        return SD.DeathlyHallowRace;
    }
}