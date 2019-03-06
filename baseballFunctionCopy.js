$(document).ready(function() {

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var day1 = mm+"/"+dd+"/"+yyyy;

$.ajax({
      //url: 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate='+day1+'&endDate='+day1,
      url: 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=04/28/2018&endDate=04/28/2018',
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
        url: 'https://statsapi.mlb.com:443/api/v1/game/'+gameID(i)+'/feed/live',
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
            var gID = response.gameData.game.pk;
//creates boxscore
//---------
$('#game-'+ x +' .myRow').append(`<th class="i1">1</th><th class="i2">2</th><th class="i3">3</th><th class="i4">4</th><th class="i5">5</th><th class="i6">6</th><th class="i7">7</th><th class="i8">8</th><th class="i9">9</th>`)
$('#game-'+ x +' .home').append(`<th>${hTeam}</th><td class="h1"></td><td class="h2"></td><td class="h3"></td><td class="h4"></td><td class="h5"></td><td class="h6"></td><td class="h7"></td><td class="h8"></td><td class="h9"></td>`);
$('#game-'+ x +' .away').append(`<th>${aTeam}</th><td class="r1"></td><td class="r2"></td><td class="r3"></td><td class="r4"></td><td class="r5"></td><td class="r6"></td><td class="r7"></td><td class="r8"></td><td class="r9"></td>`);
$('#game-'+ x).append(`<a href="gamesVsOpp.html?homeid=${hTeamID}&awayid=${aTeamID}" class="button">${gID}</a>`);

        for(var i=0; i < innings.length; i++)
        {
          var inning = parseInt(innings[i].ordinalNum);
          var rInnScore = parseInt(innings[i].away);
          var hInnScore = 0;


          if(isNaN(innings[i].home)||innings[i].home == "")//sets home inning score
              {
                hInnScore = '-';

              }
              else{
              hInnScore = parseInt(innings[i].home);
            }
            if(isNaN(innings[i].away)||innings[i].away == "")//sets home inning score
                {
                  rInnScore = 0;

                }
                else{
              rInnScore = parseInt(innings[i].away);
              }//

        $('#game-'+ x +' .home .h'+(i+1)).append(`${hInnScore}`);
        $('#game-'+ x +' .away .r'+(i+1)).append(`${rInnScore}`);
        if(i>9)
          {
            $('#game-'+ x +' .myRow').append(`<th class="i`+i+`">`+i+`</th>`)
            $('#game-'+ x +' .home').append(`<td class="h`+i+`">`+`${hInnScore}`+`</td>`)
            $('#game-'+ x +' .away').append(`<td class="r`+i+`">`+`${rInnScore}`+`</td>`)


          }
       };//closes for loop
        $('#game-'+ x +' .myRow').append(`<th style="display: table-cell;">Total</th>`);
        $('#game-'+ x +' .home').append(`<th style="display: table-cell;">${hTotal}</th>`);
        $('#game-'+ x +' .away').append(`<th style="display: table-cell;">${aTotal}</th>`);
        //},
        for (var j=0; j < player.length; j++)
        {
          //$('#game-'+ x +'.home').append('new');
          $('#game-'+ x +' .players').append(`<td>`+j+`</td>`);
        };
       },
      });
    };//closes boxscore
//----boxscore

//--loops through and creates list of games
    for(var i=0; i < games.length; i++)
      {
  $('.tScores').append('<table id="game-' + i + '" class="score"><tr class="myRow"><th class="innScore"></th></tr><tr class="away"></tr><tr class="home"></tr></table><tr class="players"></tr>');
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
