# Intergalactic-Federation
A complete system to manage your intergalatic travels

# Requirements
1. [AcceptTransportContract](./requirements/acceptTransportContract.md)
2. [AddPilot](./requirements/addPilot.md)
3. [AddShip](./requirements/addShip.md)
4. [ListOpenContract](./requirements/listOpenContracts.md)
5. [PublishContracts](./requirements/publishContract.md)
6. [RefuelShip](./requirements/refuelShip.md)
7. [SettleContract](./requirements/settleContract.md)
8. [TravelBetweenPlanets](./requirements/travelBetweenPlanets.md)

## Step by step to run application on your machine
### Prerequisite:
  * Have installed on your machine the Docker: Link and instructions to install an configure [Docker for Windows](https://docs.docker.com/desktop/windows/install/)
  * Have yarn installed `npm install --global yarn`
  * Beekeeper, or another database manager (Optional, only if you need to see the data and application reports) [Beekeeper](https://www.beekeeperstudio.io/)

### Run the following commands in sequence in the terminal 
OBS: it is necessary to wait for the previous one to finish executing (All the commands must be runned on application folder)

```shell
  yarn
  
  docker-compose up
```
or

```shell
  npm i
  
  docker-compose up
``` 
OBS: (I didn't test if the npm commands takes errors, prefer to use yarn to avoid errors)

If you se this the application is running correctly

![image](https://user-images.githubusercontent.com/50158294/160213579-986df38b-27e1-483a-97bf-634ff3b17f73.png)

After see this run the following command

`yarn typeorm migration:run`

or

`npm run typeorm migration:run`

## Testing the API
### To run the application tests run
```shell
  yarn test
```

### To make requests and test with REST you have two choices
With the application running, go to the browser and write `http://localhost:3333/docs/` check the swagger docs and make requests

Go to postman and import the file that has on the root called intergalatic_federation_REQUESTS and make requests

## Application flow
Create a ship --> Create a pilot --> Publish a contract --> Accept a contract --> Settle a contract

You can optionally Travel between planets, Refuel ship if you need, and List the open contracts

## View the application database
OBS: You need an database manager this images is from Beekeeper, but the credentials can be used on another database manager
On the new connection selection postgres

Add:
User: adminUser, 
password: root, 

Default database: intergalatic-federation

![image](https://user-images.githubusercontent.com/50158294/160209498-621fbc07-b167-4c6a-aba6-6d4031c52e29.png)

Click connect
If the migrations:run was succesful the entities must be equal to the next image

![image](https://user-images.githubusercontent.com/50158294/160209732-708de984-0a67-4de5-ac3c-b08724b622ad.png)

### ER Diagram

![image](https://user-images.githubusercontent.com/50158294/160210581-9f99b12e-2871-413c-aad0-a662b6de6387.png)

