using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RenewableEnergyCredits.Models
{
    public class TransferRequest
    {        
        public string RecipientEmail { get; set; }
        public string AssetId { get; set; }
        public int Amount { get; set; }
        public string SenderEmail { get; set; }
    }
}
