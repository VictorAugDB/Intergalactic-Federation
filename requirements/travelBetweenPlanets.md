# Travel Between Planets

## Success case
- [x] Receive a POST request in /travelToPlanet route
- [x] Validate required fields **certificationDocument, destinationPlanet**
- [x] Get pilot from repository
- [ ] Get ship from repository
- [ ] Check if the travel is possible by checking the pilot locationPlanet
- [ ] Check if the ship has enough fuel to travel
- [ ] Update the pilot in the repository with the planetLocation
- [ ] Update the ship in the repository with the fuelLevel minus fuel travel cost
- [ ] Returns 200 with success message

## Exceptions
- [x] Returns 404 error if the endpoint not exists
- [x] Returns 400 if **certificationDocument, destinationPlanet** is not provided by the client
- [x] Returns 400 if pilot is not found in the repository
- [ ] Returns 400 if ship is not found in the repository
- [ ] Returns 400 if the travel is not possible
- [ ] Returns 400 if the ship does not have enough fuel
- [ ] Returns 500 if something unexpected happens when updating pilot in the repository
- [ ] Returns 500 if something unexpected happens when updating ship in the repository