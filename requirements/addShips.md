# Add Ships

## Success case
- [] Receive a POST request in /ships route
- [] Validate required fields **id, fuelCapacity, fuelLevel, weigthCapacity, location**
- [] Save the ship in the repository
- [] Returns 200 with registered ship data

## Exceptions
- [] Returns 404 error if the endpoint not exists
- [] Returns 400 if **id, fuelCapacity, fuelLevel, weigthCapacity, location** is not provided by the client
- [] Returns 500 if something unexpected happens when saving ship in the repository