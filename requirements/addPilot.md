# Add Pilot

## Success case
- [] Receive a POST request in /pilots route
- [] Validate required fields **certificationDocument, shipId, name, age, credits, locationPlanet**
- [] Get the pilot in the repository to check if already exists a pilot registered with the same certificationDocument in the repository
- [] Get the ship in the repository
- [] Check if the ship's location is the same as pilot's location planet
- [] Check if the ship already has an owner
- [] Save the pilot in the repository
- [] Returns 200 with registered pilot data

## Exceptions
- [] Returns 404 error if the endpoint not exists
- [] Returns 400 if **certificationDocument, shipId, name, age, credits, locationPlanet** is not provided by the client
- [] Returns 400 if pilot already exists in the repository
- [] Returns 400 if ship is not found in the repository
- [] Check if the ship's location is not the same as pilot's location planet
- [] Returns 400 if the ship already has an owner
- [] Returns 500 if something unexpected happens when saving the pilot in the repository