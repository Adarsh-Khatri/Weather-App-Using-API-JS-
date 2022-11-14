let weather = {
    apiKey: 'yourKeyGoesHere',
    bgApiKey: '563492ad6f917000010000015bb042cdba964281960051f77b3e0fc1',
    fetchWeather: async function (city) {
        try {
            const response = await fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
            );
            if (!response.ok) {
                alert(`NO WEATHER FOUND FOR: ${city}`);
                throw new Error(response.statusText);
            }
            const data = await response.json();
            this.displayWeather(data);
        }
        catch (error) {
            console.log(error.message);
        }
    },
    displayWeather: function (data) {
        const degree = "°C";
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, temp_max, temp_min, humidity, feels_like } = data.main;
        const { speed } = data.wind;
        // Displaying City Name 
        const cityName = document.querySelector(".city");
        cityName.innerText = name;

        // For Weather Icon 
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + degree;
        document.querySelector('.feels-like').textContent = feels_like + degree;
        document.querySelector('.max-temp').textContent = temp_max + degree;
        document.querySelector('.min-temp').textContent = temp_min + degree;
        document.querySelector('.humidity').textContent = humidity + '%';
        document.querySelector('.speed').textContent = speed + ' km/h';
        document.querySelector(".weather").classList.remove("loading");

        // For Random Images Using City Name
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?' + name)";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-text").value);
    }
};

weather.fetchWeather("Ghaziabad");

document.querySelector(".search-text")
    .addEventListener('keyup', function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });



document.querySelector('.search-icon').addEventListener('click', () => {
    let searchBar = document.querySelector('.search-bar');
    searchBar.classList.toggle('increasing-width');
    document.querySelector('.search-text').focus();
})

document.querySelector('.search-text').addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        let searchBar = document.querySelector('.search-bar');
        searchBar.classList.toggle('increasing-width');
    }
})