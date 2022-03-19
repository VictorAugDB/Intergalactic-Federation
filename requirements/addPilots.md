# Add Pilots

## Success case
- [] Receive a POST request in /pilots route
- [] Validate required fields **certificationDocument, name, age, credits, location**
- [] Check if already exists a pilot registered with the same certificationDocument in the repository
- [] Save the user in the repository
- [] Returns 200 with registered pilot data

## Exceptions
- [] Returns 404 error if the endpoint not exists
- [] Returns 400 if **certificationDocument, name, age, credits, location** is not provided by the client
- [] Returns 400 if pilot already exists in the repository
- [] returns 500 if something unexpected happens when saving to repository