//the fetch API is not accessible in Node.js, so the JavaScript code in the client/this file can't be written on the back-end which uses Node.js

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');




 const getLocationWeather = async (userLocation) =>  {
    try {
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';   //before we fetch we make the second message empty, resetting it each time user enters a location
        const response = await fetch(`/weather?address=${userLocation}`);
        const dataJson = await response.json();  //Output: Promise { <pending> } it is not JSON but a Promise Object, that's why we use await to wait until response is parsed into JSON
        messageOne.textContent = dataJson.location;
        messageTwo.textContent = dataJson.forecast;

        if(dataJson.error) {
            messageOne.textContent = dataJson.error;
        }

    } catch (e) {
        messageTwo.style.color = 'red';
        messageTwo.textContent = e.message;

    }
}


 weatherForm.addEventListener('submit', (e) => {
     e.preventDefault();
     const location = search.value;

     getLocationWeather(location);

 })