# Travel Between Planets

## Success case
- [x] Receive a POST request in /travelToPlanet
- [x] Validate required fields **certificationDocument, destinationPlanet**
- [x] Get pilot from repository
- [x] Check if the travel is possible by checking the pilot **locationPlanet**
- [x] Get ship from repository
- [x] Check if the ship has enough fuel to travel
- [x] Update the pilot in the repository with the **locationPlanet**
- [x] Update the ship in the repository with the fuelLevel minus fuel travel cost
- [x] Returns 200 with success message

## Exceptions
- [x] Returns 404 error if the endpoint not exists
- [x] Returns 400 if **certificationDocument, destinationPlanet** is not provided by the client
- [x] Returns 400 if pilot is not found in the repository
- [x] Returns 400 if the travel is not possible
- [x] Returns 400 if ship is not found in the repository
- [x] Returns 400 if the ship does not have enough fuel
- [x] Returns 500 if something unexpected happens when updating pilot in the repository
- [x] Returns 500 if something unexpected happens when updating ship in the repository