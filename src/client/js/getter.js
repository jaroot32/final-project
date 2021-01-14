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

export { getter }