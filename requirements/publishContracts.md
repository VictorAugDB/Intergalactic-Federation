# Add Contracts

## Success case
- [] Receive a POST request in /contracts route
- [] Validate required fields **id, description, payload, originPlanet, destinationPlanet, value**
- [] Check if already exists a contract registered with the same id in the repository
- [] Save the contract in the repository
- [] Returns 200 with registered contract data

## Exceptions
- [] Returns 404 error if the endpoint not exists
- [] Returns 400 if **id, description, payload, originPlanet, destinationPlanet, value** is not provided by the client
- [] Returns 400 if contract already exists in the repository
- [] Returns 500 if something unexpected happens when saving contract in the repository