


function getVal () {
  var chatti = $('.chatti-input').val();
  var newarr = chatti.split(': ');
  console.log(newarr);
  return newarr;

}

$('.chatti-form').on('submit', function (e) {
  e.preventDefault();
  if (getVal()[0] === 'gh') {
    getGH(getVal()[1]);
  }
  else if (getVal()[0] === 'temp'){
    getWeather(getVal()[1]);
  }
  else if (getVal()[0] === 'gif'){
    getGif(getVal()[1]);
  }
  else {
    showuserInput('chatti-list', getVal()[0]);
  }
  $('.chatti-input').val('');
})


function getGH (user) {
  $.getJSON('https://api.github.com/users/' + user)
  .done(function (data) {
    showuserInput('gh-list', data);

  })
  .fail(showError);
}

function getWeather (input) {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?q='
  +input+'&units=imperial&APPID=d6bdee234a286f140c6230ff50ac4250')
   .done(function (data) {
      //console.log(data);
      showuserInput('weather-list', data);
      //console.log(data.weather[0].icon)
    })
  .fail(showError);
}

function getGif (input) {
  $.getJSON('http://api.giphy.com/v1/gifs/search?q=' + input + '&api_key=dc6zaTOxFJmzC')
   .done(function (data) {
        console.log(data);
        var randomGif = Math.floor(Math.random() * data.data.length);

        console.log (data.data[randomGif]);
        showuserInput('gif-list', data.data[randomGif]);
    })
  .fail(showError);
}

function showError(req, status, err) {
  err = err || {};
  err.message = err.message || status;
  console.log(err);
}


function showuserInput(template, model) {

  var fn = _.template($('#' + template).html(), { variable: 'm' });
  $('.chatti-output').append(fn(model)).append;
  console.log(fn);
}
