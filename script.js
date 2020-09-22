const apiKey = "0z7LqGmIIgZCUlJ0pNtg3G76NRzpXEdq";

$(document).on("click", ".search-btn", function() {
  SearchCity();
});

$(".search-city").on("keyup", function(e) {
  if ($(this).val() != "") {
    $(this).css("width", "200px");
  } else {
    $(this).css("width", "0px");
  }
  if (e.Key == "Enter" || e.keyCode === 13) {
    SearchCity();
  }
});

function SearchCity() {
  const cityToSearch = $(".search-city").val();
  var idCity;
  $.ajax({
    url:
      "https://dataservice.accuweather.com/locations/v1/cities/search?apikey=" +
      apiKey +
      "&q=" +
      cityToSearch,
    type: "GET",
    success: function(result) {
      if (result.length == 0) {
      } else {
        idCity = result[0].Key;
        SearchForecast(idCity, cityToSearch);
        $(".error-city").css("display", "none");
      }
    },
    error: function() {
      $(".error-city").css("display", "block");
    }
  });
}

function SearchForecast(idCity, cityName) {
  var temperature;
  var phrase;
  $.ajax({
    url:
      "https://dataservice.accuweather.com/forecasts/v1/hourly/1hour/" +
      idCity +
      "?apikey=" +
      apiKey +
      "&metric=true",
    type: "GET",
    success: function(result) {
      $(".forecast-container").css("display", "inline-block");
      temperature = result[0].Temperature.Value;
      phrase = result[0].IconPhrase;
      $("#city").text(
        cityName
          .toString()
          .charAt(0)
          .toUpperCase() + cityName.slice(1)
      );
      $("#temperature").text(temperature.toString().replace(".", ",") + "°C");
      $("#phrase").text(phrase);
      $("#icon-weather").attr(
        "src",
        "images/" + result[0].WeatherIcon + ".png"
      );
    }
  });
}
