# Add Contracts

## Success case
- [] Receive a POST request in /contracts route
- [] Validate required fields **certificationDocument, amountOfFuel**
- [] Get the pilot in the repository
- [] Get the ship in the repository
- [] Check if pilot has enough credits
- [] Check if the fuelLevel plus the amountOfFuel is less than the fuelCapacity
- [] Update ship in the repository with fuelLevel plus amountOfFuel
- [] Update the reports in the repository with the transaction log
- [] Returns 200 with success message

## Exceptions
- [] Returns 404 error if the endpoint not exists
- [] Returns 400 if **certificationDocument, amountOfFuel** is not provided by the client
- [] Returns 400 if pilot is not found in the repository
- [] Returns 400 if ship is not found in the repository
- [] Returns 400 if contract already exists in the repository
- [] Returns 400 if the pilot does not have enough credits
- [] Returns 400 if the fuelLevel plus the amountOfFuel is greater than the fuelCapacity
- [] Returns 500 if something unexpected happens when updating ship in the repository
- [] Returns 500 if something unexpected happens when updating reports in the repository