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

    var gameNum = -1;//set so that I can match array numbers from MLB Statcast Api

    function gameOpp(i) //displays the data needed
      {
      var games = response.games[i].schedule.id;
      var teamId = response.games[i].schedule;
      var awayAb = teamId.awayTeam.abbreviation;
      var homeAb = teamId.homeTeam.abbreviation;
      var awayId = teamId.awayTeam.id;
      var homeId = teamId.homeTeam.id;

        if(awayId == 120 || homeId == 120)//determine if a game is against a certain opponent
          {
            gameNum++;
            return $('.todaysGames').append(`<p>${games} and home ${homeId} ${homeAb} and away ${awayId} ${awayAb} ${i} ${gameNum}</p>`);
          };
      //var gamesId = games.schedule.id;
      //console.log('Jared');
      };
      for(i=0; i<response.games.length; i++)//filters through all games in a teams schedule then runs the gameOpp function to find games only against certain opponents
        {
          gameOpp(i);
        };

     }
  });
});
