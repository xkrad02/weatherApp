const chooseLocation = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const weatherImage = document.querySelector('img.time'); //.card img
const icon = document.querySelector('.icon img');

const updateUI = (data) => {

    // console.log(data);

    // const locationDetails = data.locationDetails;
    // const weather = data.weather;

    // destructure properties
    const { locationDetails, weather } = data; //get properties of object and store in same name

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${locationDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    // console.log(weather);
    
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    weatherImage.setAttribute('src', timeSrc);

    //remove d-none class if present    
    if (locationDetails !== '') {
        card.classList.remove('d-none');
    }
};

//asyn as it takes some time to complete
const updateLocation = async (location) => {
    //console.log(location);
    const locationDetails = await getCity(location);
    const weather = await getWeather(locationDetails.Key)

    //return new objects
    //object short-hand method
    return { locationDetails, weather };

    // return {
    //     locationDetails: locationDetails,
    //     weather: weather
    // };
};

chooseLocation.addEventListener('submit', e => {
    e.preventDefault();

    // get city value
    const location = chooseLocation.location.value.trim();
    chooseLocation.reset();
    
    //update UI with new city
    updateLocation(location)
        .then(data => updateUI(data))
        .catch(errors => console.log(errors));
});