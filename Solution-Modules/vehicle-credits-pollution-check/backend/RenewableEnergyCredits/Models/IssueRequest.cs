using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RenewableEnergyCredits.Models
{
    public class IssueRequest
    {
        public string AssetId { get; set; }
        public string RecipientEmail { get; set; }
        public int Amount { get; set; }
    }
    public class MantleIssueRequest
    {
        public string RecipientEmail { get; set; }
        public int Amount { get; set; }
    }
}
