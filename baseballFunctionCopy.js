$(document).ready(function() {

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var day1 = mm+"/"+dd+"/"+yyyy;

$.ajax({
      url: 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate='+day1+'&endDate='+day1,
      //url: 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=04/28/2018&endDate=04/28/2018',
      type: 'GET',
      data:
      {
        format: 'json'
      },
    success: function(response) {
    var games = response.dates[0].games;

    function Games(i)
      {
        var gameID = games[i].gamePk;
        var aTeam = games[i].teams.away.team.name;
        var hTeam = games[i].teams.home.team.name;

        return $('.todaysGames').append(`<p>${aTeam} and ${hTeam} and ${gameID}</p>`);

      }

      function gameID(i)
      {
        var gameID = games[i].gamePk;
        return gameID;
      }

//----boxScore
    function boxScore(x){
      $.ajax({
        url: 'https://statsapi.mlb.com:443/api/v1.1/game/'+gameID(i)+'/feed/live',
        type: 'GET',
        data:
        {
          format: 'json'
        },
          success: function(response)
          {
            var innings = response.liveData.linescore.innings;
            var Score = response.liveData.linescore;
            var hTotal = parseInt(Score.teams.home.runs);
            var aTotal = parseInt(Score.teams.away.runs);
            var aTeam = response.gameData.teams.away.fileCode;
            var hTeam = response.gameData.teams.home.fileCode;
            var aTeamID = response.gameData.teams.away.id;
            var hTeamID = response.gameData.teams.home.id;
            var player = response.liveData.players;
            var gID = response.gameData.game.pk;
            var dateId = response.games;
            var gameData = response.gameData;
            var startTime = gameData.datetime.time + " " + gameData.datetime.ampm;

  //This section of code implements winning/losing/saving pitcher or who is the current pitcher/at bat
            if (response.gameData.status.abstractGameCode == "L")
                {
                  var currPitch = response.liveData.linescore.defense.pitcher.fullName;
                  var currBatter = response.liveData.linescore.offense.batter.fullName;
                  var onDeck = response.liveData.linescore.offense.onDeck.fullName;
                }
            else if(response.gameData.status.abstractGameCode == "F"){
              var winPitch = response.liveData.decisions.winner.fullName;
              var losePitch = response.liveData.decisions.loser.fullName;
                if(response.liveData.decisions.save == null)
                  var savePitch = "No Save";

              else {
                  var savePitch = response.liveData.decisions.save.fullName;
                    };
                  }
            if (response.gameData.status.abstractGameCode == "F")
                {
                  $('#gameID-'+ x).append('<p></br><p class="pitch">'+ 'WP: ' + winPitch + '</br>LP: ' + losePitch + '</br>Save: '+ savePitch + ' ' + '</p></p>');
                }
            else if(response.gameData.status.abstractGameCode == "L") {
              $('#gameID-'+ x).append('<p><p class="pitch">'+ 'Pitcher: ' + currPitch + '</br>At Bat: ' + currBatter + '</br>On Deck: '+ onDeck + ' ' + '</p></p>');
              }
          //};
//creates boxscore
//---------

// check for final
if(response.gameData.status.abstractGameCode == 'F')
  $('#game-'+ x +' .myRow .innScore').append('Final');
else if(response.gameData.status.abstractGameCode == 'L'){
  if(Score.inningHalf =="Bottom")
    $('#game-'+ x +' .myRow .innScore').append(`Bot ${Score.currentInningOrdinal}`);
  else
    $('#game-'+ x +' .myRow .innScore').append(`Top ${Score.currentInningOrdinal}`);
}
else
  $('#game-'+ x +' .myRow .innScore').append(`${startTime}`);

$('#game-'+ x +' .myRow').append(`<th id="i1" class="inning">1</th><th id="i2" class="inning">2</th><th id="i3" class="inning">3</th><th id="i4" class="inning">4</th><th id="i5" class="inning">5</th><th id="i6" class="inning">6</th><th id="i7" class="inning">7</th><th id="i8" class="inning">8</th><th id="i9" class="inning">9</th>`)
$('#game-'+ x +' .home').append(`<th>${hTeam}</th><td class="inning" id="h1"></td><td class="inning" id="h2"></td><td class="inning" id="h3"></td><td class="inning" id="h4"></td><td class="inning" id="h5"></td><td class="inning" id="h6"></td><td class="inning" id="h7"></td><td class="inning" id="h8"></td><td class="inning" id="h9"></td>`);
$('#game-'+ x +' .away').append(`<th>${aTeam}</th><td class="inning" id="r1"></td><td class="inning" id="r2"></td><td class="inning" id="r3"></td><td class="inning" id="r4"></td><td class="inning" id="r5"></td><td class="inning" id="r6"></td><td class="inning" id="r7"></td><td class="inning" id="r8"></td><td class="inning" id="r9"></td>`);
$('#gameID-'+ x).append(`<a href="gamesVsOpp.html?homeid=${hTeamID}&awayid=${aTeamID}" class="button">${gID}</a>`);

if(response.gameData.status.abstractGameCode == 'P')
{
  var homeProb = response.gameData.probablePitchers.home.fullName;
  var awayProb = response.gameData.probablePitchers.away.fullName;
  $('#game-'+ x +' .myRow').append(`<th style="display: table-cell;">Total</th>`);
  $('#game-'+ x +' .home').append(`<th style="display: table-cell;">0</th>`);
  $('#game-'+ x +' .away').append(`<th style="display: table-cell;">0</th>`);
  $('#gameID-'+ x).append('<p><p class="pitch">'+ 'Home Pitcher: ' + homeProb + '</br>Away Pitcher: ' + awayProb + '</p></p>');
}
else{
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

        $('#game-'+ x +' .home #h'+(i+1)).append(`${hInnScore}`);
        $('#game-'+ x +' .away #r'+(i+1)).append(`${rInnScore}`);
        if(i>8)
          {
            $('#game-'+ x +' .myRow').append(`<th id="i`+(i+1)+`">`+(i+1)+`</th>`)
            $('#game-'+ x +' .home').append(`<td id="h`+(i+1)+`">`+`${hInnScore}`+`</td>`)
            $('#game-'+ x +' .away').append(`<td id="r`+(i+1)+`">`+`${rInnScore}`+`</td>`)


          }
       };//closes for loop
        $('#game-'+ x +' .myRow').append(`<th style="display: table-cell;">Total</th>`);
        $('#game-'+ x +' .home').append(`<th style="display: table-cell;">${hTotal}</th>`);
        $('#game-'+ x +' .away').append(`<th style="display: table-cell;">${aTotal}</th>`);
        console.log(hTeamID,aTeamID);
      }
       },
      });
    };//closes boxscore
//----boxscore

//--loops through and creates list of games
    for(var i=0; i < games.length; i++)
      {
  $('.tScores').append('<div id="gameID-' + i+'" class="boxScore"><table id="game-' + i + '" class="score"><tr class="myRow"><th class="innScore"></th></tr><tr class="away"></tr><tr class="home"></tr></table><tr class="players"></tr><svg class="counts"></svg></div>');

        boxScore(i);

      };
    },
//-----
      error: function()
      {
        $('#errors').text("There was an error processing your request. Please try again.")
      }
  });
});
