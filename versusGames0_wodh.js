$(document).ready(function() {
    //set date variables to use in API calls
    var today = new Date();
    var dd = today.getDate() - 1;
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    var day1 = mm + "/" + dd + "/" + yyyy;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var hID = url.searchParams.get("homeid");
    var aID = url.searchParams.get("awayid");

    function Games(game) {
      if()
      var gameID = game[0].gamePk;
      var aTeam = game[0].teams.away.team.name;
      var hTeam = game[0].teams.home.team.name;

      $('.todaysGames').append(`<div class="game" data-gameid="${gameID}"><h3 class="game_title">${hTeam} and ${aTeam}</h3><div class="boxscore"></div></div>`);

      return game[0].link;
    }

    function Scores(gamelink, gameNum) {
      $.ajax({
        url: 'https://statsapi.mlb.com:443/' + gamelink,
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(response) {
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
          var awayAb = response.gameData.teams.away.name.abbrev;
          var homeAb = response.gameData.teams.home.name
          var dateId = response.games;

          $('.game[data-gameid=' + gameId + ']').children('.boxscore').append(`<p>This is the Game ID: ${gameId}.`);
          $('.game[data-gameid=' + gameId + ']').children('.boxscore').append(`<a href="SportsFeedTest.html?homeid=${hTeamID}&awayid=${aTeamID}&homeAb=${homeAb}&awayAb=${awayAb}&gameId=${gameNum}" class="button">More Details</a>`);
          //};
        },
      });
    };

    $.ajax({ //this api call gets the info for the games based on a date criteria
        url: 'https://statsapi.mlb.com/api/v1/schedule/?sportId=1&teamId=' + hID + '&opponentId=' + aID + '&startDate=03/29/2018&endDate=09/30/2018&hydrate=linescore',

        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(response) {
            for (var i = 0; i < response.totalGames; i++) {

                var games1 = response.dates[i].games;
                var gamesDates = response.dates[i].totalGames;

                // Games(games1);
                Scores(Games(games1,gamesDates),i); //
                //setTimeout('Scores()',1000);

            };

        },

        //-----
        error: function() {
            $('.errors').text("There was an error processing your request. Please try again.")
        }
    });
});
