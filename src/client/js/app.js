// changed zip to city
function app() {
    const geoUrl = 'api.geonames.org/search?name=';
    const key = '&username=jaroot1212'

    let city = document.getElementById("city");

    let text = document.getElementById("feelings");

    const travelDetail = {};
    console.log(travelDetail)

    // Create a new date instance dynamically with JS
    let d = new Date();
    let date = d.getMonth() + 1;
    let newDate = date + '.' + d.getDate() + '.' + d.getFullYear();

    // Event listener to add function to existing HTML DOM element
    let generate = document.getElementById("generate");

    const generator = (event) => {
        
        let textInput = text.value

        let cityInput = city.value;
        console.log(cityInput)

        let call = geoUrl + cityInput + key;
        console.log(call)

        travelDetail["city"] = cityInput;

        travelDetail["date"] = newDate;

        travelDetail["text"] = textInput;

        city.value = "";
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
                travelDetail["details"] = data;
            }).then(function () {
                Client.poster('/add', travelDetail);
            }).then(function () {
                Client.getter('/all')
            });
        console.log(travelDetail);
    }

    /* Function called by event listener */

    generate.addEventListener('click', generator);


}

export { app }