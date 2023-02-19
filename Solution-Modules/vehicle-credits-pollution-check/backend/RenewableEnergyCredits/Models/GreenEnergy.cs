using System;

namespace RenewableEnergyCredits.Models
{
    public class GreenEnergy
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string BlockchainStatus { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsDeleted { get; set; }
    }

    public class CreateGreenEnergyResponse
    {
    }
}