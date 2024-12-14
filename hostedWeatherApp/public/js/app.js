//the fetch API is not accessible in Node.js, so the JavaScript code in the client/this file can't be written on the back-end which uses Node.js

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

const checkboxes = document.querySelectorAll('input[type="checkbox"]');


 const getLocationWeather = async (userLocation, userUnits = 'c') =>  {
    try {
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';   //before we fetch we make the second message empty, resetting it each time user enters a location
        const response = await fetch(`/weather?address=${userLocation}&units=${userUnits}`); //updated the path url to be relative to the website domain name by using /
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

if(weatherForm) {
    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const location = search.value;


        // Find the first checked checkbox (if any)
        const selectedCheckbox = [...checkboxes].find((checkbox) => checkbox.checked);

        if (selectedCheckbox) {
            getLocationWeather(location, selectedCheckbox.value);
        } else {
            getLocationWeather(location);
        }

    })
}

lottie.loadAnimation({
    container: document.getElementById('lottie-canvas'), // The DOM element (canvas) that will contain the animation
    renderer: 'svg',   // 'svg', 'canvas', or 'html'
    loop: true,
    autoplay: true,
    path: 'https://lottie.host/f657277b-386c-43eb-a1e5-86afebafea7e/BJClWNC0zo.json', // URL to the Lottie JSON file
});

