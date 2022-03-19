# Add Pilots

## Success case
- [] Receive a POST request in /pilots route
- [] Validate required fields **certificationDocument, shipId, name, age, credits, locationPlanet**
- [] Check if already exists a pilot registered with the same certificationDocument in the repository
- [] Check if the ship exists
- [] Check if the ship's location is the same
- [] Check if the ship is already in use
- [] Save the pilot in the repository
- [] Update the ship with pilot certificationDocument
- [] Returns 200 with registered pilot data

## Exceptions
- [] Returns 404 error if the endpoint not exists
- [] Returns 400 if **certificationDocument, shipId, name, age, credits, locationPlanet** is not provided by the client
- [] Returns 400 if pilot already exists in the repository
- [] Returns 400 if ship not does exists
- [] Returns 400 if ship's location is not the same
- [] Returns 400 if the ship is already in use
- [] returns 500 if something unexpected happens when saving the pilot in the repository
- [] returns 500 if something unexpected happens when updating the ship in the repository