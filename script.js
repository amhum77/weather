let appId = 'cf002751564a4c78f5f7ed479f1b9ba3';
let units = 'imperial';
let searchMethod;

//Get the appropriate json file associated with zip code, city name, or latitude&longitude from openweathermap.org to supply information in the init function
function searchWeather(primarySearchTerm,secondarySearchTerm, thirdSearchTerm){
    
    if ( thirdSearchTerm.length === 5 && Number.parseInt(thirdSearchTerm) + '' === thirdSearchTerm)
  
        fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${thirdSearchTerm}&APPID=${appId}&units=${units}`).then(result => {
            return result.json();
        }).then(result =>{
            init(result);
        })
    else if(primarySearchTerm <=90 && primarySearchTerm >= -90&&secondarySearchTerm <=180 && secondarySearchTerm >= -180)
        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${primarySearchTerm}&lon=${secondarySearchTerm}&APPID=${appId}&units=${units}`).then(result => {
            return result.json();
        }).then(result =>{
            init(result);
        })
    else
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${primarySearchTerm},${secondarySearchTerm},${thirdSearchTerm}&APPID=${appId}&units=${units}`).then(result => {
            return result.json();
        }).then(result =>{
            init(result);
        })

}


//the information from openweathermap.org is saved under appropriate variable names in order to load onto the server page using html
function init(resultFromServer){

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let countryHeader = document.getElementById('countryHeader');


    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription;
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176' + 'F';
    windSpeedElement.innerHTML = 'Winds at ' +Math.floor(resultFromServer.wind.speed) + ' m/s';
    cityHeader.innerHTML = resultFromServer.name;
    countryHeader.innerHTML = resultFromServer.sys.country;
    humidityElement. innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';
}

//when the searchBtn is clicked the data typed into the search boxes is passed into the 3 variables.
document.getElementById('searchBtn').addEventListener('click',() => {
    let primarySearchTerm = document.getElementById('primarySearchInput').value;
    let secondarySearchTerm = document.getElementById('secondarySearchInput').value;
    let thirdSearchTerm = document.getElementById('thirdSearchInput').value;

        searchWeather(primarySearchTerm,secondarySearchTerm, thirdSearchTerm);
    } 
)

