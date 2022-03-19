# Add Ships

## Success case
- [] Receive a POST request in /ships route
- [] Validate required fields **id, fuelCapacity, fuelLevel, weigthCapacity**
- [] Check if already exists a ship registered with the same certificationDocument in the repository
- [] Save the ship in the repository
- [] Returns 200 with registered ship data

## Exceptions
- [] Returns 404 error if the endpoint not exists
- [] Returns 400 if **id, fuelCapacity, fuelLevel, weigthCapacity** is not provided by the client
- [] Returns 400 if ship already exists in the repository
- [] returns 500 if something unexpected happens when saving to repository