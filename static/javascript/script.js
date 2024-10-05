const btnC = document.querySelector('.btn-c');
const btnF = document.querySelector('.btn-f');

function celsiusToFahrenheit(celsius) {
    return (celsius * (9 / 5)) + 32;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
}

btnC.addEventListener('click', function() {
    btnC.style.fontSize = '18px';
    btnC.style.color = '#000'
    btnF.style.color = '#403b3b'
    btnF.style.fontSize = '16px';

    const tempText = document.querySelector('.message-3').innerText;
    const tempValue = parseFloat(tempText.replace(/[^\d.-]/g, '')); // Убираем все, кроме цифр и точки

    if (!isNaN(tempValue)) {
        const celsius = fahrenheitToCelsius(tempValue);
        document.querySelector('.message-3').innerText = `Температура: ${celsius.toFixed(2)}`;
    }
});

btnF.addEventListener('click', function() {
    btnF.style.fontSize = '18px';
    btnF.style.color = '#000'
    btnC.style.color = '#403b3b'
    btnC.style.fontSize = '16px';

    const tempText = document.querySelector('.message-3').innerText;
    const tempValue = parseFloat(tempText.replace(/[^\d.-]/g, '')); // Убираем все, кроме цифр и точки

    if (!isNaN(tempValue)) {
        const fahrenheit = celsiusToFahrenheit(tempValue);
        document.querySelector('.message-3').innerText = `Температура: ${fahrenheit.toFixed(2)}`;
    }
});


document.getElementById('GetCityForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('CityInput').value;
    const apiKey = 'ключ';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`;

    if (!city) {
        document.querySelector('.message-1').style.color = '#141414';
        document.querySelector('.message-1').style.display = 'block';
        document.querySelector('.message-1').innerText = 'Введите город.';
        return;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Город не найден'); // Если город не найден
        }
        return response.json();
      })
      .then(data => {
        const land = data.sys.country;
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        document.querySelector('.message-1').style.color = '#141414';
        document.querySelector('.message-1').style.display = 'block';
        document.querySelector('.message-1').innerText = `${city} ${land}`;
        document.querySelector('.message-2').style.display = 'block';
        document.querySelector('.message-2').innerText = `Погода : ${weatherDescription}`;
        document.querySelector('.message-3').style.display = 'inline';
        document.querySelector('.message-3').innerText = `Температура : ${temperature}`;
        document.querySelector('.mes-1').style.display = 'inline';
        document.querySelector('.btn-c').style.display = 'inline';
        document.querySelector('.btn-f').style.display = 'inline';
      })
      .catch(error => {
        document.querySelector('.message-1').style.color = '#141414';
        document.querySelector('.message-1').style.display = 'block';
        document.querySelector('.message-1').innerText = error.message; // Если произошла ошибка
      });
});
