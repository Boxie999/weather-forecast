// 1. TODO: Style the current HTML
// 6. TODO: Populate history list from local storage when page loads



const history = JSON.parse(localStorage.getItem('history')) || [];
const apiKey = '0b3e4f59cef0c9aa37eaa33ae06633d0';
var userInput;


function weatherDays() {
    userInput = $('#search-input').val().trim();  //$(this).attr("data-name");
    const queryUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey + '&units=metric';
    
    // TODO: prepend the value to the list container

    // 5. Add the history to local storage
    history.push(userInput);
    localStorage.setItem('history', JSON.stringify(history));

    
    
    
    // 2. Call Geocoding API when search form is submitted to find city lat and long value
    $.ajax({ url: queryUrl })
        .then(function(response) {
            const lat = response[0].lat;
            const lon = response[0].lon;

            const weatherQueryUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';
            $('#today').empty();
            // 3. Call 5 day weather forecast API after we have city lat and long value
            $.ajax({ url: weatherQueryUrl })
                .then(function(weatherResponse) {
                    // Icon URL http://openweathermap.org/img/w/" + iconcode + ".png"
                    // 4. Put the response on the HTML page
                    const weatherList = weatherResponse.list;
                    // Now forecast
                    const today = weatherList[0];
                    console.log(today);
                     // a. TODO: put today's weather in container for today's weather
                     
                     var cityName = $('<h1>').text(weatherResponse.city.name).css('font-size', '60px');
                     var description = $('<h4>').text(today.weather[0].description);
                     var todaysDate = $('<h4>').text(today.dt_txt.slice(0, 10));
                        
                        var iconCodeforToday = today.weather[0].icon;
                
                        var iconToday = $('<img>').attr('src', "http://openweathermap.org/img/w/" +iconCodeforToday+ ".png").css('width', '100px');
                        var windSpeed = $('<p>').text('Wind-speed: ' + today.wind.speed);
                        var temperatureToday = $('<p>').text(today.main.temp + 'in Celsius.');
                        
                        var humidityToday = $('<p>').text('Humidity: ' + today.main.humidity);
                        var containerDiv = $('<div>').append(  todaysDate, temperatureToday, humidityToday).css({'position': 'absolute','right': '170px', 'height': '180px', 'width': '150px',});
                        $('#today').append(cityName , description , containerDiv, iconToday,).css({'padding': '20px', 'backgroundColor': 'rgba(0, 0, 0, 0.445)','color': 'white', 'border-radius': '15px','width': '780px', 'height': '250px'});
                        
                    // 5 days forecast
                    $('#forecast').empty();
                    for (let i = 1; i < weatherList.length; i += 8) {
                        const weather = weatherList[i];
                        //console.log(weather);
                        // b. TODO: put 5 day's forecast weather in container for the forecast
                        
                        var date = $('<h4>').text(weather.dt_txt.slice(0, 10));
                        
                        var iconCode = weather.weather[0].icon;
                        console.log(iconCode);

                        var icon = $('<img>').attr('src', "http://openweathermap.org/img/w/" +iconCode+ ".png").css('width', '30px');
                        
                        
                        var temperature = $('<p>').text(weather.main.temp + ' Celsius.');
                        
                        var humidity = $('<p>').text('Humidity: ' + weather.main.humidity);
                        
                        
                        var weatherDaysContainer = $('<div>').append(date,icon, temperature, humidity).css({'width': '150px', 'margin': '5px', 'padding': '5px', 'backgroundColor': 'rgba(0, 0, 0, 0.445)','color': 'white', 'border-radius': '15px'});
                        
                        $('#forecast').append(weatherDaysContainer); 
                        
                        
                    }
                    
                 });
                     
                    });                       
                };

            function createButtons() {
                var btnNew = $('<button>').text(userInput);
                btnNew.attr('data-name', userInput);
                btnNew.addClass("weatherInfos")
                $('#history').prepend(btnNew);  
            }
    
    
    
        $('#search-form').on('submit', function(event) {
        event.preventDefault();
        weatherDays();
        createButtons();
        
    });
    

    $(document).on('click', '.weatherInfos', function(){
        console.log('Clicked button.');  
        var thisBtn = $(this).attr("data-name");
        console.log(thisBtn); //shows city name
        thisBtn = userInput;
        weatherDays();
    }); 




















