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

    function Games(game,x) {
      if(x == 2 )
      {
        for(i=1; i <= x; i++)
        {
        var gameID = game[i].gamePk;
        var aTeam = game[i].teams.away.team.name;
        var hTeam = game[i].teams.home.team.name;

        $('.todaysGames').append(`<div class="game" data-gameid="${gameID}"><h3 class="game_title">${aTeam} at ${hTeam}</h3><div class="boxscore"></div></div>`);

        return gameID;
      };
      }
      else
      {
        var gameID = game[0].gamePk;
        var aTeam = game[0].teams.away.team.name;
        var hTeam = game[0].teams.home.team.name;

        $('.todaysGames').append(`<div class="game" data-gameid="${gameID}"><h3 class="game_title">${aTeam} at ${hTeam}</h3><div class="boxscore"></div></div>`);

        return gameID;
      }
    };

    function Scores(gameID, gameNum, x) {
      $.ajax({
        url: 'https://statsapi.mlb.com:443/api/v1.1/game/'+gameID+'/feed/live',
        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(response) {
    //--------------------------------------------------------Var list
          var innings = response.liveData.linescore.innings;
          var Score = response.liveData.linescore;
          var hTotal = parseInt(Score.teams.home.runs);
          var aTotal = parseInt(Score.teams.away.runs);
          var aTeam = response.gameData.teams.away.fileCode;
          var hTeam = response.gameData.teams.home.fileCode;
          var aTeamID = response.gameData.teams.away.teamID;
          var hTeamID = response.gameData.teams.home.teamID;
          var player = response.liveData.players;
          var date = response.gameData.datetime.timeDate;
          var gameId = response.gameData.game.pk;
          var dates = response.gameData.dates;
          var awayAb = response.gameData.teams.away.name.abbrev;
          var homeAb = response.gameData.teams.home.name.abbrev;
          var dateId = response.games;
        if (response.gameData.status.abstractGameCode == "L")
          {
          var currPitch = response.liveData.linescore.defense.pitcher.fullName;
          var currBatter = response.liveData.linescore.offense.batter.fullName;
          var onDeck = response.liveData.linescore.offense.onDeck.fullName;
        }
        else{
          var winPitch = response.liveData.decisions.winner.fullName;
          var losePitch = response.liveData.decisions.loser.fullName;
        if(response.liveData.decisions.save == null)
            {var savePitch = "No Save";
            }
        else {
          var savePitch = response.liveData.decisions.save.fullName;
          };
        }
          //var savePitch = response.liveData.decisions.saving.fullName
          //var savePitch = response.liveData.decisions.save;
        /*  var getWinPlayerId = "ID"+winPitch;
          var winPitchFirstName = player[getWinPlayerId].name.first;
          var winPitchLastName = player[getWinPlayerId].name.last;
          var winName = winPitchFirstName + ' ' + winPitchLastName;
          var getlosePlayerId = "ID"+losePitch;
          var losePitchFirstName = player[getlosePlayerId].name.first;
          var losePitchLastName = player[getlosePlayerId].name.last;
          var loseName = losePitchFirstName + ' ' + losePitchLastName;
          */
    //---------------------------------------------------------------
      /*else{
        var getSavePlayerId = "ID"+savePitch;
        var savePitchFirstName = player[getSavePlayerId].name.first;
        var savePitchLastName = player[getSavePlayerId].name.last;
        var saveName = savePitchFirstName + ' ' + savePitchLastName;
      }*/

          $('.game[data-gameid=' + gameId + ']').children('.boxscore').append(`<p>This is the Game ID: ${gameId}.</p>`);
          if (response.gameData.status.abstractGameCode == "F")
            {
          $('.game[data-gameid=' + gameId + ']').children('.boxscore').append('<p><table id="game-' + x + '" class="score"><tr class="myRow"><th class="innScore"></th></tr><tr class="away"></tr><tr class="home"></tr></table><p class="pitch">'+ 'WP: ' + winPitch + '</br>LP: ' + losePitch + '</br>Save: '+ savePitch + ' ' + '</p></p>');
        }
        else {
          $('.game[data-gameid=' + gameId + ']').children('.boxscore').append('<p><table id="game-' + x + '" class="score"><tr class="myRow"><th class="innScore"></th></tr><tr class="away"></tr><tr class="home"></tr></table><p class="pitch">'+ 'Pitcher: ' + currPitch + '</br>At Bat: ' + currBatter + '</br>On Deck: '+ onDeck + ' ' + '</p></p>');
        }
          $('.game[data-gameid=' + gameId + ']').children('.boxscore').append(`<a href="SportsFeedTest.html?homeid=${hTeamID}&awayid=${aTeamID}&homeAb=${homeAb}&awayAb=${awayAb}&gameId=${gameNum}" class="button">More Details</a>`);
          //};
//------------ Adding Boxscore

$('#game-'+ x +' .myRow').append(`<th class="i1">1</th><th class="i2">2</th><th class="i3">3</th><th class="i4">4</th><th class="i5">5</th><th class="i6">6</th><th class="i7">7</th><th class="i8">8</th><th class="i9">9</th>`)
$('#game-'+ x +' .home').append(`<th>${hTeam}</th><td class="h1"></td><td class="h2"></td><td class="h3"></td><td class="h4"></td><td class="h5"></td><td class="h6"></td><td class="h7"></td><td class="h8"></td><td class="h9"></td>`);
$('#game-'+ x +' .away').append(`<th>${aTeam}</th><td class="r1"></td><td class="r2"></td><td class="r3"></td><td class="r4"></td><td class="r5"></td><td class="r6"></td><td class="r7"></td><td class="r8"></td><td class="r9"></td>`);
//$('#game-'+ x).append(`<a href="gamesVsOpp.html?homeid=${hTeamID}&awayid=${aTeamID}" class="button">${gameId}</a>`);//this is the button from boxScore.html that links to the gamesVsOpp page.  You can use it asa  place holder though since it has the game Id in it.

for(var i=0; i < innings.length; i++)
{
  var inning = parseInt(innings[i].ordinalNum);
  var rInnScore = parseInt(innings[i].away.runs);
  var hInnScore = 0;


  if(isNaN(innings[i].home.runs))//||innings[i].home.runs == "")//sets home inning score
      {
        hInnScore = '-';

      }
      else{
      hInnScore = parseInt(innings[i].home.runs);
    }
    if(isNaN(innings[i].away.runs)||innings[i].away.runs == "")//sets home inning score
        {
          rInnScore = 0;

        }
        else{
      rInnScore = parseInt(innings[i].away.runs);
      }//

$('#game-'+ x +' .home .h'+(i+1)).append(`${hInnScore}`);
$('#game-'+ x +' .away .r'+(i+1)).append(`${rInnScore}`);
if(i>8)
  {
    $('#game-'+ x +' .myRow').append(`<th class="i`+(i+1)+`">`+(i+1)+`</th>`)
    $('#game-'+ x +' .home').append(`<td class="h`+(i+1)+`">`+`${hInnScore}`+`</td>`)
    $('#game-'+ x +' .away').append(`<td class="r`+(i+1)+`">`+`${rInnScore}`+`</td>`)


  }
};//closes for loop
$('#game-'+ x +' .myRow').append(`<th style="display: table-cell;">Total</th>`);
$('#game-'+ x +' .home').append(`<th style="display: table-cell;">${hTotal}</th>`);
$('#game-'+ x +' .away').append(`<th style="display: table-cell;">${aTotal}</th>`);
      //  $(`${winPitchFirstName}`).appendTo('#game-'+ x +' .pitch ');

        console.log(winPitch,savePitch);
//This section above creates a boxscore for an individual game between a list of all games between teams
//------------ Back to old code
},
      });
    };

    $.ajax({ //this api call gets the info for the games based on a date criteria
        url: 'https://statsapi.mlb.com/api/v1/schedule/?sportId=1&teamId=' + hID + '&opponentId=' + aID + '&startDate=03/28/2019&endDate=10/01/2019&hydrate=linescore',

        type: 'GET',
        data: {
            format: 'json'
        },
        success: function(response) {
            for (var i = 0; i < response.totalGames; i++) {

                var games1 = response.dates[i].games;
                var gamesDates = response.dates[i].totalGames;

                if(games1[0].status.statusCode == 'F' || games1[0].status.abstractGameCode == 'L'){
                Scores(Games(games1,gamesDates),i, i);
              }
                else {
                  Games(games1,gamesDates);
                }
            };

        },

        //-----
        error: function() {
            $('.errors').text("There was an error processing your request. Please try again.")
        }
    });
});
