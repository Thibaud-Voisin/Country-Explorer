# Country Explorer

![alt text](https://i.ibb.co/T8drLR8/ce2.png)

## 📝 Description

Country Explorer is a WebApp that allows the user to search data about the countries of the world.

Thanks to the user-friendly interface, it is possible to discover the map of the country, some images, the capital city, the region, and other information about any country.

## 🛠️ Installation

The application is up and running at https://country-explorer-lovat.vercel.app

You can also clone the repository of the project and run it locally.

- Start the backend
    - Go to the /backend folder
    - Comment the line 11: "app.use(cors(...vercel.app' }))" 
    - UnComment the line 12: "app.use(cors(...localhost:3000' }))"
    - Run:
    ```
    npm install
    node app.js
    ```
    - And you're ready to go !!
    - PS: In order to be able to get images on your local application, you must create a .env file in the backend repository containing an unsplash key named 'Image_api_key'

- Start the frontend
    - Go to the /frontend folder
    - Comment the line 11: "const API...vercel.app'" 
    - UnComment the line 9: "const API...localhost:4000"
    - Run:
    ```
    npm install
    npm start
    ```
    - And you're ready to go !!
    - PS: In order to be able to get the google map preview on your local application, you must create a .env file in the backend repository containing an google map key named 'REACT_APP_GOOGLE_API_KEY'

## 🚀 Usage

The Country Explorer Application is very easy to use:

Once the website is open, you can click in the search bar to type or select a country, then, click the search button.

You will then be able to see different informations about the selected country:
- The name of the country
- Its Unofficial name
- Its flag and arms
- 4 pictures of the country
- A usable map of the country
- Some statistics about the country (population, area ...) And for the numerical ones, a comparision with the average values.

Once you are done with this specific country, you can press the home button in the top right corner to go back and search for a new country

You can also click the moon/sun button in the top right corner to switch between dark and light mode depending on you preferences.

## 💻 Technologies Used

This application uses:
- Frontend:
    - React
    - Tailwind
    - Daisyui
    - Google Map API
    - Unsplash API

- Backend:
    - NodeJS
    - Express
    - Axios

## 📂 Project Structure

```bash
├───Backend
│   ├───controllers // Endpoints declaration
│   ├───services    // Logic of the backend
│   ├───test        // Jest tests for the backend
│   ├───utils       // Contains scripts to calculate averages
│   └───app.js      // Starting file of the backend
└───frontend
    ├───cypress     // Frontend tests
    ├───public
    └───src         // Javascript code of the frontend
        ├───fonts 
        └───Result  // Javascrip code of the page presenting the country
```

## 🌐 Endpoints

The endpoints used in this project are the following:
- GET - /home:
    - Endpoint to test if the Backend is up and running
- GET - /flags/all:
    - Return a list of country and a link to their their associated flag
- POST - /countries/info
    - Payload : JSON - {"country":"xxxxx"}
    - Return the data for the specified country

## 🌍 Deployment

The WebApp is hosted on Vercel, linked via github to be updated instantly every time a new verison is pushed to the repository

## 🧪 Testing

You can run the backend tests with:
```
Go to /backend
npx jest
```
You can also run the frontend tests with:
```
Go to /frontend
npm install cypress
npx cypress
npx cypress open
follow the instructions
Run the e2e fullTesting.cy script
```
