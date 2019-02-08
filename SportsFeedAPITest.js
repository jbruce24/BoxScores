$(document).ready(function() {

  $.ajax
  ({
    type: "GET",
    url: 'https://api.mysportsfeeds.com/v2.0/pull/mlb/2018-regular/games.json?team=111',
    dataType: 'json',
    async: false,
    headers: {
      "Authorization": "Basic " + btoa('261440c6-c04c-4455-bc0e-2bcf2b' + ":" + 'MYSPORTSFEEDS')
    },
    data: {
            format: 'json'
          },
    success: function(response)
    {


    function game(i)
      {
      var games = response.games[i].schedule.id;
      var teamId = response.games[i].schedule;
      var awayAb = teamId.awayTeam.abbreviation;
      var homeAb = teamId.homeTeam.abbreviation;
      var awayId = teamId.awayTeam.id;
      var homeId = teamId.homeTeam.id;
        if(awayId == 120 || homeId == 120)
          {
            return $('.todaysGames').append(`<p>${games} and home ${homeId} ${homeAb} and away ${awayId} ${awayAb} ${i}</p>`);
          };
      //var gamesId = games.schedule.id;
      //console.log('Jared');
      };
      for(i=0; i<response.games.length; i++)
        {

          game(i);
        };

     }
  });
});
