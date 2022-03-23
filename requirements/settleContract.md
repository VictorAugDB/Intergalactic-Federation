# Settle Contract

## Success case
- [ ] Receive a POST request in /contracts/settle
- [ ] Validate required fields **contractId, certificationDocument**
- [ ] Get contract in the repository
- [ ] Check if contract is already settled
- [ ] Check if pilotCertificationDocument exists in contract
- [ ] Check if cerificationDocument is the same as pilotCertificationDocument
- [ ] Get the pilot in the repository
- [ ] Check if pilot's locationPlanet is the same as contract's destinationPlanet
- [ ] Get the ship in the repository
- [ ] Check if weightLevel minus contract weight resources is less than zero
- [ ] Update the contract in the repository with settlementDate property
- [ ] Update the ship in the repository with currentWeight minus contract resources weight
- [ ] Update the pilot in the repository by adding the contract value to your credits
- [ ] Update the reports in the repository by adding the contract resources wieght to current amount of planet resources weight
- [ ] Update the reports in the repository by adding the percentage of each resource type transported by this pilot
- [ ] Update the reports in the repository with the transaction log
- [ ] Returns 200 with success message

## Exceptions
- [ ] Returns 404 error if the endpoint not exists
- [ ] Returns 400 if **contractId, certificationDocument** is not provided by the client
- [ ] Returns 400 if contract is not found in the repository
- [ ] Returns 400 if contract is already settled
- [ ] Returns 400 if pilotCertificationDocument not exists in contract
- [ ] Returns 400 if cerificationDocument is not the same as pilotCertificationDocument
- [ ] Returns 400 if pilot is not found in the repository
- [ ] Returns 400 if ship is not found in the repository
- [ ] Returns 400 if weightLevel minus contract weight resources is less than zero
- [ ] Returns 400 if pilot's locationPlanet is not the same as contract's destinationPlanet
- [ ] Returns 500 if something unexpected happens when updating contract in the repository
- [ ] Returns 500 if something unexpected happens when updating ship in the repository
- [ ] Returns 500 if something unexpected happens when updating pilot in the repository
- [ ] Returns 500 if something unexpected happens when updating reports in the repository