$(document).ready(function() {

  var url_string = window.location.href;
  var url = new URL(url_string);
  var hID = url.searchParams.get("homeid");
  var aID = url.searchParams.get("awayid");
  var hAb = url.searchParams.get("homeAb").toUpperCase();
  var aAb = url.searchParams.get("awayAb").toUpperCase();
  var gID = url.searchParams.get("gameId");


  $.ajax
  ({
    type: "GET",
    url: 'https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/games.json?team='+hAb,
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
      var awayAb = String(teamId.awayTeam.abbreviation).toUpperCase();
      var homeAb = String(teamId.homeTeam.abbreviation).toUpperCase();
      var awayId = teamId.awayTeam.id;
      var homeId = teamId.homeTeam.id;
      var date1 = new Date(teamId.startTime);
      var year = date1.getFullYear();
      var month = date1.getMonth()+1;
      var dt = date1.getDate();
      //-----------------Adds preceding 0's to dates and month if below 10
      if (dt < 10) {
        dt = '0' + dt;
          }
      if (month < 10) {
          month = '0' + month;
          }
      //--------------------------
      var fullDate = year+month+dt;


        if(awayAb == aAb || homeAb == aAb)//determine if a game is against a certain opponent
          {
            gameNum++;
              if(gameNum == gID)
              {
                $('.todaysGames').append(`<p>${games} and home (${homeId} ${homeAb}) and away (${awayId} ${awayAb}) ${i} ${gameNum} ${teamId.startTime} ${aAb} ${hAb} ${gID} </p>`);
                var apiID = fullDate+ '-' +awayAb+ '-' +homeAb;
                console.log(`${apiID}`);
              }
          };

  };

//------------
/*
function lineups(x, gID)
{
  $.ajax({
      url: 'https://statsapi.mlb.com/api/v1/schedule/?sportId=1&teamId=' + hID + '&opponentId=' + aID + '&startDate=03/29/2018&endDate=09/30/2018&hydrate=linescore',
      type: 'GET',
      data:
      {
        format: 'json'
      },
    success: function(response)
      {
          var games = response.dates[0].games[gId];
      }
    });
};
*/

      for(i=0; i < response.games.length; i++)//filters through all games in a teams schedule then runs the gameOpp function to find games only against certain opponents
        {
            var game = gameOpp(i);
            //ineups(game);
        };
     }
  });
});
