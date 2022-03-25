# Refuel Ship

## Success case
- [x] Receive a POST request in /ships/refuel
- [x] Validate required fields **certificationDocument, amountOfFuel**
- [x] Get the pilot in the repository
- [x] Check if pilot has enough **credits**
- [x] Get the ship in the repository
- [x] Check if the **fuelLevel** plus the **amountOfFuel** is less than the fuelCapacity
- [x] Update ship in the repository with **fuelLevel** plus **amountOfFuel**
- [x] Update pilot in the repository with your **credits** - fuelPrice
- [x] Update the reports in the repository with the transaction log
- [x] Returns 200 with updated amount of fuel of pilot ship

## Exceptions
- [x] Returns 404 error if the endpoint not exists
- [x] Returns 400 if **certificationDocument, amountOfFuel** is not provided by the client
- [x] Returns 400 if pilot is not found in the repository
- [x] Returns 400 if the pilot does not have enough **credits**
- [x] Returns 400 if ship is not found in the repository
- [x] Returns 400 if the **fuelLevel** plus the **amountOfFuel** is greater than the fuelCapacity
- [x] Returns 500 if something unexpected happens when updating ship in the repository
- [x] Returns 500 if something unexpected happens when updating pilot in the repository
- [x] Returns 500 if something unexpected happens when updating reports in the repository