window.addEventListener("load", () => {
  let lon;
  let lat;
  let tempValue = document.querySelector('.temp-value')
  let tempDesc = document.querySelector('.temp-desc')
  let locationName = document.querySelector('.loc-name')

  function roundHalf(num) {
      return Math.round(num*2)/2;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        lon = position.coords.longitude;
        lat = position.coords.latitude;
        
        const proxy = 'https://cors-anywhere.herokuapp.com/'
        const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3e85992da7ddf1e2b6215a9bdddd3ffd`
        
        fetch(api)
        .then(response => {
            return response.json()
        })

        .then(data =>{
            console.log(data)
            // pulls data.main.temp and assigns it to temp
            const {temp} = data.main
            // weather is an array so notation needed to dive into it
            const {description} = data.weather[0]
            const {city} = data.name
            console.log(city)

            // lmao converting kelvin to celsius
            tempValue.textContent = Math.round((temp-273.15)*2)/2
            tempDesc.textContent = description
            locationName.textContent = city
        })

    });

  }

});
