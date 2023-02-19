# Vehicle Credits Platform using Mantle

We are using Mantle to develop a platform where users can issue, manage and transfer credits of ratings earned for vehicle owners and their respective vehicles via pollution checks, green fuel adoption in vehicles: 

- User creation procedure; User identification with NFC tags; 

- Create credits of ratings earned via pollution checks, green fuel assets; 

- Issue green credits for vehicles via pollution checks; 

- List your green credits per vehicle; Handle multiple vehicles.

We are extending an existing template, [Tracker](https://www.mantleblockchain.com/tracker) to build a simple platform where users can issue, manage and transfer credits of green energy.


## Prerequisites
### Backend
You will need the update the values following values `mantle-config.yaml` to run the backend project:

``` yaml
# This is the product id of the Tracker you are going to use
productId: your-product-id
# This is the API key you will use to make calls to the Mantle API
apiKey: your-api-key
# This is the URL of the Mantle API you are going to call
apiUrl: your-api-url
```

### Frontend
You will need to update the `userEmail` variable in this file: `src/components/IssueBtn.vue`
This is user email that will be issued some green credits.
The user must exist in the Mantle platform.

## Getting started
### Install dependencies:
- [.NET Core](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/en/)

After the installations, run the following commands in your terminal at the root of the frontend directory: `npm install`
### Run the application:
##### Frontend:
1. Go in the frontend directory
2. Run the following command: `npm run start`

##### Backend:
There's two ways to run the backend:
- Use your favorite IDE to run the backend
- Go in this directory `backend/RenewableEnergyCredits` and run this command : `dotnet run`

## Mantle API calls
In this section, we will explain how we used [Tracker](https://www.mantleblockchain.com/tracker) in our application.

**Get all assets**
`GET http://<mantle api url>/tracker/{productId}/assets`
This is used to fetch all the assets created in Tracker. In our case, we would fetch all the created green energies.

**Create an asset**
`POST http://<mantle api url>/tracker/{productId}/assets`
This is used to create an asset in Tracker. In our case, we would create a new green energy.

**Get all authenticated user's assets balances**
`GET http://<mantle api url>/tracker/{productId}/balances`
This is used to fetch all the authenticated user's balances. In our case, we would fetch all the amount of green credits of the owner of the API key.

**Get a specific asset's details**
`GET http://<mantle api url>/tracker/{productId}/assets/{assetId}`
This is used to fetch a specific asset in Tracker. In our case, we would fetch a specific green energy.

**Issue an amount of an asset**
`POST http://<mantle api url>/tracker/{productId}/assets/{assetId}/issue`
This is used to issue an amount of a specific asset in Tracker. In our case, we would issue an amount of green credits to a user.


