# Publish Contract

## Success case
- [x] Receive a POST request in /contracts
- [x] Validate required fields **id, description, payload, originPlanet, destinationPlanet, value**
- [x] Check if already exists a contract registered with the same id in the repository
- [x] Save the contract in the repository
- [x] Returns 200 with registered contract data

## Exceptions
- [x] Returns 404 error if the endpoint not exists
- [x] Returns 400 if **id, description, payload, originPlanet, destinationPlanet, value** is not provided by the client
- [x] Returns 400 if contract already exists in the repository
- [x] Returns 500 if something unexpected happens when saving contract in the repository