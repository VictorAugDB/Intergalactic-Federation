# Add Ships

## Success case
- [] Receive a POST request in /acceptContract route
- [] Validate required fields **id, certificationDocument**
- [] Get pilot in the repository
- [] Get contract in the repository
- [] Get ship in the repository
- [] Check if contract's originPlanet the same as pilot's locationPlanet
- [] Check if ship currentWeight plus contract resources weight is less than weightCapacity
- [] Update the contract in the repository with the certificationDocument and acceptanceDate
- [] Update the ship currentWeight plus the weight of contract resources
- [] Returns 200 with a success message

## Exceptions
- [] Returns 404 error if the endpoint not exists
- [] Returns 400 if **id, certificationDocument** is not provided by the client
- [] Returns 400 if pilot is not found in the repository
- [] Returns 400 if contract is not found in the repository
- [] Returns 400 if ship is not found in the repository
- [] Returns 400 if contract's originPlanet is not the same as pilot's locationPlanet
- [] Returns 400 if ship currentWeight plus contract resources weight is higher than weightCapacity
- [] returns 500 if something unexpected happens when updating contract to repository
- [] returns 500 if something unexpected happens when updating ship to repository