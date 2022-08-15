var pastSearchEl = $('#pastSearchContainer')
var fiveDayEl = $('#fiveDayContainer');
var searchInputEl = $('#searchInput');
var savedCities = $(JSON.parse(localStorage.getItem('savedCities')));
var APIKey = "e94d4ae885438d091e5594c1c03900ef";

$('#searchBtn').on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();

    var city = $('input[id="searchInput"]').val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        if(data != undefined) {
            var date = new Date(data.dt * 1000).toLocaleDateString("en-US")
            var iconURL = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            $('#oneDayLocationDate').text(data.name + " " + date);
            $('#oneDayIcon').attr('src', iconURL);
            $('#oneDayTemp').text(data.main.temp);
            $('#oneDayWind').text(data.wind.speed);
            $('#oneDayHum').text(data.main.humidity);
            savedCities.push(data.name);
            //i wasnt to create a for loop to pop items that are doubles
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            reSearchBtns();
        } else {
            return;
        }
    })

    fetch(fiveDayURL)
    .then(function(res2) {
        return res2.json();
    })
    .then(function(data2) {
        if(data2 != undefined) {
            var date1 = new Date(data2.list[0].dt * 1000).toLocaleDateString("en-US");
            var date2 = new Date(data2.list[8].dt * 1000).toLocaleDateString("en-US");
            var date3 = new Date(data2.list[16].dt * 1000).toLocaleDateString("en-US");
            var date4 = new Date(data2.list[24].dt * 1000).toLocaleDateString("en-US");
            var date5 = new Date(data2.list[32].dt * 1000).toLocaleDateString("en-US");
            var iconURL1 = 'http://openweathermap.org/img/w/' + data2.list[0].weather[0].icon + '.png';
            var iconURL2 = 'http://openweathermap.org/img/w/' + data2.list[8].weather[0].icon + '.png';
            var iconURL3 = 'http://openweathermap.org/img/w/' + data2.list[16].weather[0].icon + '.png';
            var iconURL4 = 'http://openweathermap.org/img/w/' + data2.list[24].weather[0].icon + '.png';
            var iconURL5 = 'http://openweathermap.org/img/w/' + data2.list[32].weather[0].icon + '.png';
   
            $('#dayOneDate').text(date1);
            $('#dayOneIcon').attr('src', iconURL1);
            $('#dayOneTemp').text(data2.list[0].main.temp);
            $('#dayOneWind').text(data2.list[0].wind.speed);
            $('#dayOneHum').text(data2.list[0].main.humidity);
            $('#dayTwoDate').text(date2);
            $('#dayTwoIcon').attr('src', iconURL2);
            $('#dayTwoTemp').text(data2.list[8].main.temp);
            $('#dayTwoWind').text(data2.list[8].wind.speed);
            $('#dayTwoHum').text(data2.list[8].main.humidity);
            $('#dayThreeDate').text(date3);
            $('#dayThreeIcon').attr('src', iconURL3);
            $('#dayThreeTemp').text(data2.list[16].main.temp);
            $('#dayThreeWind').text(data2.list[16].wind.speed);
            $('#dayThreeHum').text(data2.list[16].main.humidity);
            $('#dayFourDate').text(date4);
            $('#dayFourIcon').attr('src', iconURL4);
            $('#dayFourTemp').text(data2.list[24].main.temp);
            $('#dayFourWind').text(data2.list[24].wind.speed);
            $('#dayFourHum').text(data2.list[24].main.humidity);
            $('#dayFiveDate').text(date5);
            $('#dayFiveIcon').attr('src', iconURL5);
            $('#dayFiveTemp').text(data2.list[32].main.temp);
            $('#dayFiveWind').text(data2.list[32].wind.speed);
            $('#dayFiveHum').text(data2.list[32].main.humidity);
        }
    })
});

function reSearchBtns() {
    pastSearchEl.children().remove();
    for (var i = 0; i < savedCities.length; i++) {
        var choiceEl = $('<button>');
        choiceEl.text(savedCities[i]);
        choiceEl.attr('id', 'reSearch');
        choiceEl.addClass('w-100 btn-primary my-2');
        pastSearchEl.append(choiceEl);
      }
}

$('#pastSearchContainer').on('click', '#reSearch' , function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();

    var city = $(this).text();
    var currentURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
    var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(currentURL)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        if(data != undefined) {
            var date = new Date(data.dt * 1000).toLocaleDateString("en-US")
            var iconURL = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            $('#oneDayLocationDate').text(data.name + " " + date);
            $('#oneDayIcon').attr('src', iconURL);
            $('#oneDayTemp').text(data.main.temp);
            $('#oneDayWind').text(data.wind.speed);
            $('#oneDayHum').text(data.main.humidity);          
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            reSearchBtns();
        } else {
            return;
        }
    })

    fetch(fiveDayURL)
    .then(function(res2) {
        return res2.json();
    })
    .then(function(data2) {
        if(data2 != undefined) {
            var date1 = new Date(data2.list[0].dt * 1000).toLocaleDateString("en-US");
            var date2 = new Date(data2.list[8].dt * 1000).toLocaleDateString("en-US");
            var date3 = new Date(data2.list[16].dt * 1000).toLocaleDateString("en-US");
            var date4 = new Date(data2.list[24].dt * 1000).toLocaleDateString("en-US");
            var date5 = new Date(data2.list[32].dt * 1000).toLocaleDateString("en-US");
            var iconURL1 = 'http://openweathermap.org/img/w/' + data2.list[0].weather[0].icon + '.png';
            var iconURL2 = 'http://openweathermap.org/img/w/' + data2.list[8].weather[0].icon + '.png';
            var iconURL3 = 'http://openweathermap.org/img/w/' + data2.list[16].weather[0].icon + '.png';
            var iconURL4 = 'http://openweathermap.org/img/w/' + data2.list[24].weather[0].icon + '.png';
            var iconURL5 = 'http://openweathermap.org/img/w/' + data2.list[32].weather[0].icon + '.png';
   
            $('#dayOneDate').text(date1);
            $('#dayOneIcon').attr('src', iconURL1);
            $('#dayOneTemp').text(data2.list[0].main.temp);
            $('#dayOneWind').text(data2.list[0].wind.speed);
            $('#dayOneHum').text(data2.list[0].main.humidity);
            $('#dayTwoDate').text(date2);
            $('#dayTwoIcon').attr('src', iconURL2);
            $('#dayTwoTemp').text(data2.list[8].main.temp);
            $('#dayTwoWind').text(data2.list[8].wind.speed);
            $('#dayTwoHum').text(data2.list[8].main.humidity);
            $('#dayThreeDate').text(date3);
            $('#dayThreeIcon').attr('src', iconURL3);
            $('#dayThreeTemp').text(data2.list[16].main.temp);
            $('#dayThreeWind').text(data2.list[16].wind.speed);
            $('#dayThreeHum').text(data2.list[16].main.humidity);
            $('#dayFourDate').text(date4);
            $('#dayFourIcon').attr('src', iconURL4);
            $('#dayFourTemp').text(data2.list[24].main.temp);
            $('#dayFourWind').text(data2.list[24].wind.speed);
            $('#dayFourHum').text(data2.list[24].main.humidity);
            $('#dayFiveDate').text(date5);
            $('#dayFiveIcon').attr('src', iconURL5);
            $('#dayFiveTemp').text(data2.list[32].main.temp);
            $('#dayFiveWind').text(data2.list[32].wind.speed);
            $('#dayFiveHum').text(data2.list[32].main.humidity);
        }
    })
});
