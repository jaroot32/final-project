

// api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={your api key}

const apiUrl = 'http://api.openweathermap.org/data/2.5/weather?zip=';

let zip = document.getElementById("zip");
let text = document.getElementById("feelings");

const weatherMood = {};

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + 1;
let newDate = date + '.' + d.getDate() + '.' + d.getFullYear();

// Event listener to add function to existing HTML DOM element
let generate = document.getElementById("generate");

const generator = (event) => {
    
    let textInput = text.value

    let zipInput = zip.value;

    let call = apiUrl + zipInput + api;

    weatherMood["zipcode"] = zipInput;

    weatherMood["date"] = newDate;

    weatherMood["text"] = textInput;

    zip.value = "";
    text.value = "";

    const myHeaders = new Headers();

    const myRequest = new Request(call, {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default',
    });

    /* Function to GET Web API Data*/

    fetch(myRequest)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            weatherMood["weather"] = data;
        }).then(function () {
            poster('/add', weatherMood);
        }).then(function () {
            getter('/all')
        });
    console.log(weatherMood);
}

/* Function called by event listener */

generate.addEventListener('click', generator);

/* Function to POST data */

const poster = async (url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {

            'Content-Type': 'application/json',

        },
        body: JSON.stringify(data),
    });

    try {

        const newData = await response.json();

        return newData;

    } catch (error) {

        console.log('error', error);

    }
};

/* Function to GET Project Data */

const getter = async (url = '') => {

    const request = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {

            'Content-Type': 'application/json',

        }
    });

    try {

        const newList = await request.json();
        
        let entries = (arr) => {
            let html_entries = [];
                for (let i = 0; i < arr.length; i++) {
                    let div = document.createElement("div");
                    div.classList.add( "recent-entry" );
                    div.innerHTML = `<div id="entryHolder">
                    <h3>Time</h3>
                    <div id="time">${arr[i].date}</div>
                    <h3>Temperature</h3>
                    <div id="temp">${arr[i].weather.main.temp}</div>
                    <h3>Feeling</h3>
                    <div id="content">${arr[i].text}</div>
                </div>`
                    
                html_entries.push(div)
                }
            return html_entries;
        }
        
       
        let clearEntries = () => {

            let list_to_clear = document.getElementById("entryList");

            while (list_to_clear.firstChild) {
                list_to_clear.removeChild(list_to_clear.firstChild);
            }

        }

        let displayEntries = (arr) => {

            let list = document.getElementById("entryList");

            clearEntries();
            
            for (let i = 0; i < arr.length; i++) {
                list.append(arr[i])
            }

        }
        
        let newEntries = entries(newList)
        displayEntries(newEntries);


    } catch (error) {

        console.log('error', error);

    }
        
};

