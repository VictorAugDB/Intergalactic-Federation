# Add Ship

## Success case
- [x] Receive a POST request in /ships
- [x] Validate required fields **id, fuelCapacity, fuelLevel, weigthCapacity, location**
- [x] Save the ship in the repository
- [x] Returns 200 with registered ship data

## Exceptions
- [x] Returns 404 error if the endpoint not exists
- [x] Returns 400 if **id, fuelCapacity, fuelLevel, weigthCapacity, location** is not provided by the client
- [x] Returns 500 if something unexpected happens when saving ship in the repository