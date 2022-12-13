//responsible for interacting with API to get data
const key = 'dyksLA5mszaJFMGCDB5XgMDef3WqFs5D';

// get weather information

const getWeather = async (locationKey) => {

    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${locationKey}?apikey=${key}`;
    //api key is query parameter so use '?'

    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
};


// get city information
const getCity = async (city) => {

    //resource URL / end point
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`; //template string
    //query parameters starts with a '?', '&': add another parameter

    const response = await fetch(base + query); //concatenate
    // if (response !== 200) {
    //     throw new Error('cannot fetch the data');
    // }

    const data = await response.json();
    return data[0];
};


getCity('singapore')
    .then((data) => {    
        return getWeather(data.Key); //promise
    })
    .then(data => console.log('resolved:', data)) //Key displayed!
    .catch(errors => console.log('rejected:', errors));



