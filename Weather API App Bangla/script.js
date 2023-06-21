//getWeatherData function
function getWeatherData(location) {
  //api key
  const apiKey = "6eb1180161eccb06843669dbee0f87b3";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherData = {
        location: data.name,
        country : data.sys.country,
        longitude : data.coord.lon,
        latitude : data.coord.lat,
        description: data.weather['0'].description,
        icon : data.weather['0'].icon,
        temperature: data.main.temp,
        windSpeed : data.wind.speed,
        humidity : data.main.humidity,
        pressure : data.main.pressure,
      }
      
      return weatherData
  })
}

//updateUI
function updateUI(weatherData) {

  //api variables dom
  const city = document.querySelector('#cityoutput')
  const latitudeLongitude = document.querySelector('#latitudeLongitude')
  const description = document.querySelector('#description')
  const icon = document.querySelector('#icon')
  const temperature = document.querySelector('#temperature')
  const windSpeed = document.querySelector('#windSpeed')
  const humidity = document.querySelector('#humidity')
  const pressure = document.querySelector('#pressure')


  city.innerHTML=`<img width="50" height="50" src="./img/country.png"/> শহর ও দেশের নামঃ <span>${weatherData.location}, ${weatherData.country}<span>`

  latitudeLongitude.innerHTML=`<img width="50" height="50" src="./img/latitudeLongitude.png"/> অক্ষাংশ ও দ্রাঘিমাংশঃ <span>${weatherData.longitude.toString().getDigitBanglaFromEnglish()} ডিগ্রি ও ${weatherData.latitude.toString().getDigitBanglaFromEnglish()} ডিগ্রি<span>`


  let condition = (weatherData.description === 'very heavy rain') ? "প্রচন্ড বৃষ্টি" : (weatherData.description === 'haze') ? "মেঘাচ্ছন্ন" : (weatherData.description === 'clear sky') ? "মেঘমুক্ত আকাশ" : (weatherData.description === 'broken clouds') ? "হালকা মেঘ"  : (weatherData.description === 'overcast clouds') ? "মেঘ ও বৃষ্টি"   : (weatherData.description === 'scattered clouds') ? "বিক্ষিপ্ত মেঘ" : (weatherData.description === 'moderate rain') ? "মোটামুটি বৃষ্টি" :  (weatherData.description === 'light rain') ? "হালকা বৃষ্টি" :   (weatherData.description === 'few clouds') ? "হালকা মেঘ" : weatherData.description

  description.innerHTML = `<img src="https://openweathermap.org/img/w/${weatherData.icon}.png"/> আকাশের অবস্থাঃ <span>${condition}<span>`
  icon.innerHTML = ``

  temperature.innerHTML = `<img width="50" height="50" src="./img/temperature.png"/> তাপমাত্রাঃ <span>${ weatherData.temperature.toString().getDigitBanglaFromEnglish()} ডিগ্রি সেলসিয়াস</span>`

  windSpeed.innerHTML = `<img width="50" height="50" src="./img/windSpeed.png"/> বাতাসের বেগঃ <span>${weatherData.windSpeed.toString().getDigitBanglaFromEnglish()} কিলোমিটার/ঘন্টা<span>`

  humidity.innerHTML = `<img width="50" height="50" src="./img/humidity.png"/> বাতাসের আদ্রতাঃ <span>${weatherData.humidity.toString().getDigitBanglaFromEnglish()}%<span>`

  pressure.innerHTML = `<img width="50" height="50" src="./img/pressure.png"/>বাতাসের চাপঃ <span>${weatherData.pressure.toString().getDigitBanglaFromEnglish()} মিলিবার</span>`
}


const inputValue = document.querySelector('#cityinput')
const button = document.querySelector('#add');

//button, display
button.addEventListener('click', function(){
  const location = inputValue.value;
    getWeatherData(location)
      .then(weatherData => {
        updateUI(weatherData);
      })
      .catch(error => alert('আপনি ভুল শহরের নাম প্রবেশ করিয়েছেন বা কিছু প্রবেশ করাননি।'))
})

//bangla to english number converter
let finalEnlishToBanglaNumber ={'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
 
String.prototype.getDigitBanglaFromEnglish = function() {
    let returnString = this;
    for (let x in finalEnlishToBanglaNumber) {
         returnString = returnString.replace(new RegExp(x, 'g'), finalEnlishToBanglaNumber[x]);
    }
    return returnString;
}



