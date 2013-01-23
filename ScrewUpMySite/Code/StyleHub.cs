using Microsoft.AspNet.SignalR;

namespace ScrewUpMySite
{
    public class StyleHub : Hub
    {
        public void SendStyleUpdate(string style)
        {
            Clients.All.addStyleUpdate(style);
        }
    }
}