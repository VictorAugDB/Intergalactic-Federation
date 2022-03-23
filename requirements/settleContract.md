# Settle Contract

## Success case
- [x] Receive a POST request in /contracts/settle
- [x] Validate required fields **contractId, certificationDocument**
- [x] Get contract in the repository
- [x] Check if contract is already settled
- [x] Check if pilotCertificationDocument exists in contract
- [x] Check if cerificationDocument is the same as pilotCertificationDocument
- [x] Get the pilot in the repository
- [x] Check if pilot's locationPlanet is the same as contract's destinationPlanet
- [x] Get the ship in the repository
- [x] Check if weightLevel minus contract weight resources is less than zero
- [x] Update the ship in the repository with currentWeight minus contract resources weight
- [x] Update the contract in the repository with settlementDate property
- [x] Update the pilot in the repository by adding the contract value to your credits
- [x] Update the reports in the repository by adding the contract resources weight to current amount of planet resources weight
- [x] Update the reports in the repository by adding the percentage of each resource type transported by this pilot
- [x] Update the reports in the repository with the transaction log
- [ ] Returns 200 with success message

## Exceptions
- [x] Returns 404 error if the endpoint not exists
- [x] Returns 400 if **contractId, certificationDocument** is not provided by the client
- [x] Returns 400 if contract is not found in the repository
- [x] Returns 400 if contract is already settled
- [x] Returns 400 if pilotCertificationDocument not exists in contract
- [x] Returns 400 if cerificationDocument is not the same as pilotCertificationDocument
- [x] Returns 400 if pilot is not found in the repository
- [x] Returns 400 if ship is not found in the repository
- [x] Returns 400 if weightLevel minus contract weight resources is less than zero
- [ ] Returns 400 if pilot's locationPlanet is not the same as contract's destinationPlanet
- [ ] Returns 500 if something unexpected happens when updating contract in the repository
- [ ] Returns 500 if something unexpected happens when updating ship in the repository
- [ ] Returns 500 if something unexpected happens when updating pilot in the repository
- [ ] Returns 500 if something unexpected happens when updating reports in the repository