interface Contract {
    address: string
    owner: string,
    renter: string,
    startDateTime: Date,
    endDateTime: Date,
    totalRentCost: number,
    totalBond: number,
    ownerCurrency: Currency,
    vehicleModel: Model,
    vehicleDescription: string,
    status: number,
    startOdometer: number,
    startChargeState: number,
    startVehicleLongitude: number,
    startVehicleLatitude: number,
    endOdometer: number,
    endChargeState: number,
    endVehicleLongitude: number,
    endVehicleLatitude: number,
    rentalAgreementEndDateTime: Date,
    totalLocationPenalty: number,
    totalOdometerPenalty: number,
    totalChargePenalty: number,
    totalTimePenalty: number,
    totalPlatformFee: number,
    totalRentPayable: number,
    totalBondReturned: number
}