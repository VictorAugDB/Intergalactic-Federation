# Add Pilot

## Success case
- [x] Receive a POST request in /pilots
- [x] Validate required fields **certificationDocument, shipId, name, age, credits, locationPlanet**
- [x] Get the pilot in the repository to check if already exists a pilot registered with the same certificationDocument in the repository
- [x] Get the ship in the repository
- [x] Check if the ship's location is the same as pilot's location planet
- [x] Check if the ship already has an owner
- [x] Save the pilot in the repository
- [x] Returns 200 with registered pilot data

## Exceptions
- [x] Returns 404 error if the endpoint not exists
- [x] Returns 400 if **certificationDocument, shipId, name, age, credits, locationPlanet** is not provided by the client
- [x] Returns 400 if pilot already exists in the repository
- [x] Returns 400 if ship is not found in the repository
- [x] Check if the ship's location is not the same as pilot's location planet
- [x] Returns 400 if the ship already has an owner
- [x] Returns 500 if something unexpected happens when saving the pilot in the repository