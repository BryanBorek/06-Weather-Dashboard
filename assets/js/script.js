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

    fetch(queryURL)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        if(data != undefined) {
            var date = new Date(data.dt * 1000).toLocaleDateString("en-US")
            $('#oneDayLocationDate').text(data.name + " " + date);
            $('#oneDayTemp').text(data.main.temp);
            $('#oneDayWind').text(data.wind.speed);
            $('#oneDayHum').text(data.main.humidity);
            savedCities.push(data.name);
            
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            reSearchBtns();
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
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

    fetch(queryURL)
    .then(function(res) {
        return res.json()
    })
    .then(function(data) {
        if(data != undefined) {
            var date = new Date(data.dt * 1000).toLocaleDateString("en-US")
            $('#oneDayLocationDate').text(data.name + " " + date);
            $('#oneDayTemp').text(data.main.temp);
            $('#oneDayWind').text(data.wind.speed);
            $('#oneDayHum').text(data.main.humidity);          
            localStorage.setItem('savedCities', JSON.stringify(savedCities));
            reSearchBtns();
        }
    })
});
