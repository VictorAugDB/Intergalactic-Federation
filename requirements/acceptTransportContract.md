# Accept Transport Contract

## Success case
- [x] Receive a POST request in /contracts/accept
- [x] Validate required fields **contractId, certificationDocument**
- [x] Get pilot in the repository
- [x] Get contract in the repository
- [x] Check if contract's originPlanet the same as pilot's locationPlanet
- [x] Get ship in the repository
- [x] Check if ship weightLevel plus contract resources weight is less than weightCapacity
- [x] Update the contract in the repository with the certificationDocument and acceptanceDate
- [x] Update the ship weightLevel plus the weight of contract resources
- [x] Update the reports in the repository by adding the contract resources weight to current amount of planet send resources weight
- [x] Returns 200 with **contractId, shipWeightLevel, acceptanceDate**

## Exceptions
- [x] Returns 404 error if the endpoint not exists
- [x] Returns 400 if **id, certificationDocument** is not provided by the client
- [x] Returns 400 if pilot is not found in the repository
- [x] Returns 400 if contract is not found in the repository
- [x] Returns 400 if ship is not found in the repository
- [x] Returns 400 if contract's originPlanet is not the same as pilot's locationPlanet
- [x] Returns 400 if ship weightLevel plus contract resources weight is higher than weightCapacity
- [x] Returns 500 if something unexpected happens when updating contract to repository
- [x] Returns 500 if something unexpected happens when updating ship to repository
- [x] Returns 500 if something unexpected happens when updating reports to repository