const apiKey = '2efb7e226d3246b3acd83231232101';

// Получаємо назву міста
const header = document.querySelector('.header')
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity')



// Слухаємо відправку форми

form.onsubmit = function (e) {
  e.preventDefault()


  let city = input.value.trim();
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`


  fetch(url).then((response) => {
    return response.json()
  }).then((data) => {

    if (data.error) {
      const prevCard =  document.querySelector('.card')
      if (prevCard) prevCard.remove();

      const html = `<div class="card">${data.error.message}</div>`
      header.insertAdjacentHTML('afterend', html);
    } else {
    // Display on card

    const html = 
    `<div class="card">
        <h2 class="card-city">
          ${data.location.name} <span>${data.location.country}</span> 
        </h2>

        <div class="card-weather">
          <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
          <img class="card-img" src="./img/cloudy.png" alt="weather img">
        </div>    

        <div class="description">${data.current.condition.text}</div>
      </div>`


      header.insertAdjacentHTML('afterend', html);
    }

    console.log(data);
    console.log(data.location.name);
    console.log(data.location.country);
    console.log(data.current.temp_c);
    console.log(data.current.condition.text);

   
  })
}

