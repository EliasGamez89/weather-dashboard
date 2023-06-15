const searchBtn = document.getElementById('searchBtn');
const searchBar = document.getElementById('searchBar');
const cityDate = document.getElementById('cityDate');
const weather = document.getElementById('weather');
const temp = document.getElementById('temp');
const tempMin = document.getElementById('tempMin');
const tempMax = document.getElementById('tempMax');
const apiKey = "fdcf031f1f8844b2bf2191539233105";

searchBtn.addEventListener('click', () => {
  const city = searchBar.value;

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`)
    .then(response => response.json())
    .then(data => {
      // Update the UI with the received data
      cityDate.textContent = ` ${data.location.name} - ${data.location.localtime}`;
      weather.textContent = ` ${data.current.condition.text}`;
      tempMin.textContent = `Min: ${data.forecast.forecastday[0].day.mintemp_c}°C`;
      tempMax.textContent = `Max: ${data.forecast.forecastday[0].day.maxtemp_c}°C`;
    })
    .catch(error => {
      console.error('An error occurred:', error);
    });
});

const ctx = document.getElementById('myChart');
let chartInstance = null;

searchBtn.addEventListener('click', () => {
  const city = searchBar.value;

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`)
    .then(response => response.json())
    .then(data => {
      const temperatures = data.forecast.forecastday.map(day => day.day.avgtemp_c);

      // Update the chart data with the fetched temperatures
      const chartData = {
        labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [{
          label: 'Temperatures',
          data: temperatures,
          borderWidth: 1
        }]
      };

      // Destroy the previous chart instance
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Render the chart with the updated data
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});