$(document).ready(function() {

  $.ajax
  ({
    type: "GET",
    url: 'https://api.mysportsfeeds.com/v2.0/pull/mlb/2018-regular/date/20180730/games.json',
    dataType: 'json',
    async: false,
    headers: {
      "Authorization": "Basic " + btoa('261440c6-c04c-4455-bc0e-2bcf2b' + ":" + 'MYSPORTSFEEDS')
    },
    data: {
            format: 'json'
          },
    success: function(response){

      var games = response.games[0].schedule.id;
      //var gamesId = games.schedule.id;
      //console.log('Jared');
      return $('.todaysGames').append(`<p>${games}</p>`);
    }
  });
});
