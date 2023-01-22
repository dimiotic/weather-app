const apiKey = '2efb7e226d3246b3acd83231232101';

// Получаємо назву міста
const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity')


function removeCard() {
  const prevCard =  document.querySelector('.card')
  if (prevCard) prevCard.remove();
}


function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`
  header.insertAdjacentHTML('afterend', html);
}

function showCard({name, country, temp, condition}) {
  const html = 
  `<div class="card">
      <h2 class="card-city">
        ${name} <span>${country}</span> 
      </h2>

      <div class="card-weather">
        <div class="card-value">${temp}<sup>°c</sup></div>
        <img class="card-img" src="./img/cloudy.png" alt="weather img">
      </div>    

      <div class="description">${condition}</div>
    </div>`


  header.insertAdjacentHTML('afterend', html);
}

async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
  const response = await fetch(url)
  const data = await response.json()
  return data
}

// Слухаємо відправку форми

form.onsubmit = async function (e) {
  e.preventDefault()

  let city = input.value.trim();

  const data = await getWeather(city)

  if (data.error) {
    removeCard();
    showError(data.error.message)
  } else {
    removeCard()

    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text
    }

    showCard(weatherData)
  }

}

