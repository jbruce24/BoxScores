$(document).ready(function() {
//set date variables to use in API calls
var today = new Date();
var dd = today.getDate()-1;
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var day1 = mm+"/"+dd+"/"+yyyy;
var url_string = window.location.href;
var url = new URL(url_string);
var hID = url.searchParams.get("homeid");
var aID = url.searchParams.get("awayid");

$.ajax({//this api call gets the info for the games based on a date criteria
      url: 'https://statsapi.mlb.com/api/v1/schedule/?sportId=1&teamId='+hID+'&opponentId='+aID+'&startDate=04/01/2018&endDate=09/30/2018&hydrate=linescore',

      //url: 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate='+day1+'&endDate='+day1,
      //url: 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=04/02/2018&endDate=09/28/2018&',
      type: 'GET',
      data:
      {
        format: 'json'
      },
    success: function(response) {
for(var i=0; i <response.totalGames; i++){

        var games1 = response.dates[i].games;

        function gameID(i)
          {
            var gameID = games[0].gamePk;
            return gameID;
          }

      function Games(i)
        {
          var gameID = games1[0].gamePk;
          var aTeam = games1[0].teams.away.team.name;
          var hTeam = games1[0].teams.home.team.name;

          return $('.todaysGames').append(`<p>${aTeam} and ${hTeam} and ${gameID}</p>`);
        }




        //Games(i);
      //};// this closes the initial for loop for total games

       function Scores()
      {
      $.ajax({
        url: 'https://statsapi.mlb.com:443/'+games1[0].link,
        type: 'GET',
        data:
        {
          format: 'json'
        },
        success: function(response)
        {
          var innings = response.liveData.linescore.innings;
          var Score = response.liveData.linescore;
          var hTotal = parseInt(Score.home.runs);
          var aTotal = parseInt(Score.away.runs);
          var aTeam = response.gameData.teams.away.fileCode;
          var hTeam = response.gameData.teams.home.fileCode;
          var aTeamID = response.gameData.teams.away.teamID;
          var hTeamID = response.gameData.teams.home.teamID;
          var player = response.liveData.players.allPlayers;
          var date = response.gameData.datetime.timeDate;
          var gameId = response.gameData.game.pk;
          var dates = response.gameData.dates;
          var games = [gameId];
          //for(i=0; i < dates.length; i++)
        //  {
            //return $('.scores').append('jared');
            //return $('.scores').append(`<p>${setTimeout('games.sort()',5000)}</p>`);
            return $('.scores').append(`<p>${games.sort()}</p>`);

          //};

          //return $('.scores').append(`<p>${gameId} ${aTeam} ${aTotal} and ${hTeam} ${hTotal}</p>`);

        },
      });
    };
  Games(i);
  Scores();//
  //setTimeout('Scores()',1000);
   };

  },

//-----
      error: function()
      {
        $('.errors').text("There was an error processing your request. Please try again.")
      }
  });
});
