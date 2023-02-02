//gets items from local storage
const history = JSON.parse(localStorage.getItem('history')) || [];
const apiKey = '0b3e4f59cef0c9aa37eaa33ae06633d0';
// var userInput;

//function for populating the whole screen with weather info
function weatherDays(userInput) {
    
    const queryUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=5&appid=' + apiKey + '&units=metric';
    
    //Call Geocoding API when search form is submitted to find city lat and long value
    $.ajax({ url: queryUrl })
        .then(function(response) {
            const lat = response[0].lat;
            const lon = response[0].lon;

            const weatherQueryUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=metric';
            $('#today').empty();
            //Call 5 day weather forecast API after we have city lat and long value
            $.ajax({ url: weatherQueryUrl })
                .then(function(weatherResponse) {

                    const weatherList = weatherResponse.list;
                    //forecast for today
                    const today = weatherList[0];
                     //dinamically creating text and div for the weather info
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
                        
                        //dinamically creating div and text for the weather info
                        var date = $('<h4>').text(weather.dt_txt.slice(0, 10));
                        var iconCode = weather.weather[0].icon;
                        var icon = $('<img>').attr('src', "http://openweathermap.org/img/w/" +iconCode+ ".png").css('width', '30px');
                        var temperature = $('<p>').text(weather.main.temp + ' Celsius.'); 
                        var humidity = $('<p>').text('Humidity: ' + weather.main.humidity);
                        
                        var weatherDaysContainer = $('<div>').append(date,icon, temperature, humidity).css({'width': '150px', 'margin': '5px', 'padding': '5px', 'backgroundColor': 'rgba(0, 0, 0, 0.445)','color': 'white', 'border-radius': '15px'});
                        $('#forecast').append(weatherDaysContainer); 
                        
                        
                    }
                    
                 });
                     
                    });                       
                };
            //dinamically creating buttons
            function createButtons(userInput) {

                history.push(userInput);
                localStorage.setItem('history', JSON.stringify(history));
                var btnNew = $('<button>').text(userInput);
                btnNew.attr('data-name', userInput);
                btnNew.addClass("weatherInfos")
                $('#history').prepend(btnNew);  
            }
    
    
        //calling the createButtons and weatherDays function once the user submits
        $('#search-form').on('submit', function(event) {
        event.preventDefault();
        const userInput = $('#search-input').val().trim();
        weatherDays(userInput);
        createButtons(userInput);
        
    });
    //rendering buttons
    function renderButtons(){
        for(i=0; i<history.length; i++) {
            var btnNew = $('<button>').text(history[i]);
            btnNew.attr('data-name', history[i]);
            btnNew.addClass("weatherInfos")
            $('#history').prepend(btnNew);  
        }
    }
    //calling the renderButtons function
    renderButtons()
    //click function on the buttons with the weatherInfos class, so it shows value when clicked
    $(document).on('click', '.weatherInfos', function(){
        console.log('Clicked button.');  
        var thisBtn = $(this).attr("data-name");
        weatherDays(thisBtn);
    }); 



















