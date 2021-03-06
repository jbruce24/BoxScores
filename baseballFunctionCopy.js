$(document).ready(function() {

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
var day2 = mm+"/"+dd+"/"+yyyy;
//import { day1 } from 'index.html';
/*
function getDate(){
  day1 = document.getElementById("datepicker").value;
  return console.log(day1);
};

getDate();*/

//var url = 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate='+day1+'&endDate='+day1;

function runFunction(){
  var gameDate = $("#datepicker").val();
$.ajax({
      //url: url,
      url: 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate='+gameDate+'&endDate='+gameDate,
      //url: 'https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=06/01/2019&endDate=06/01/2019',
      type: 'GET',
      data:
      {
        format: 'json'
      },
    success: function(response) {
      console.log("date is ", gameDate);
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
//--------------- Jquery UI parts
            $( function() {
              $( document ).tooltip();
            } );

            $( function() {
              $( "#datepicker" ).datepicker({
                changeMonth: true,
                changeYear: true
              });
            } );

//---------------

  //This section of code implements winning/losing/saving pitcher or who is the current pitcher/at bat
            if (response.gameData.status.abstractGameCode == "L")
                {
                  var currPitch = response.liveData.linescore.defense.pitcher.fullName;
                  var currBatter = response.liveData.linescore.offense.batter.fullName;
                  var onDeck = response.liveData.linescore.offense.onDeck.fullName;
                  $('.tScores .scoring .bases').clone().appendTo('#gameID-'+ x);
                  $('#gameID-'+ x + ' .bases').css("display","grid");
                  $('.tScores .scoring .BSO').clone().appendTo('#gameID-'+ x);
                  $('#gameID-'+ x + ' .count').css("display","inline-block");
                  $('#gameID-'+ x).append('<p>'+ gID +' '+ x + '<p class="pitch" title="Current Pitcher">' + ' Pitcher: ' + currPitch + '</br>At Bat: ' + currBatter + '</br>On Deck: '+ onDeck + ' ' + '</p></p>');
                  if(Score.inningHalf =="Bottom")
                    $('#game-'+ x +' .myRow .innScore').append(`Bot ${Score.currentInningOrdinal}`);
                  else
                    $('#game-'+ x +' .myRow .innScore').append(`Top ${Score.currentInningOrdinal}`);
                    var first = 0;
                    var seco = 0;
                    var thi = 0;

                    if(Score.offense.first == null)
                      first = 0;
                    else
                    { first = 1;}
                    if(Score.offense.second == null)
                       seco = 0;
                    else
                    {seco= 1;}
                    if(Score.offense.third == null)
                       thi = 0;
                    else
                    {thi= 1;}

                    var base = [first, seco, thi];

                    function onBase(color, i, x, runnerName){

                      //var runnerName = Score.offense.first.fullName;

                      /*if(isNaN(Score.offense.first.fullName))
                      {
                        var runnerName = "Null";
                      }
*/
                      //console.log(x, "svg_"+i, "set - Runner Name ", runnerName);
                      return $('#gameID-' + x + ' .svg_'+i).attr('title', runnerName).css("fill",color);
                      //return $('#gameID-' + x + ' .svg_'+i).css("fill",color);


                    }

                    for(i=0; i<base.length; i++){
                      if(base[i]===1)
                      {
                        var color = "red";
                      }
                      else{
                      var color = "white";
                    }
                    if(i===0)
                      {var baseOn = "first";}
                    else if(i===1)
                      {var baseOn = "second";}
                    else if(i===2)
                      {var baseOn = "third";}
                    if (Score.offense[baseOn] == null){
                      var runnerName = baseOn;
                    }
                    else
                    {var runnerName = Score.offense[baseOn].fullName;}
                      onBase(color, i, x, runnerName);
                  };

              //------------------------ Count

              var bso = ["balls","strikes","outs"];

              function BallStrOut(bso,y,x){
                  if (bso === "balls"){
                  color = "blue";
                } else {
                  color = "red";
                }
              return $('#gameID-'+ x + ' #' + bso + ' .count:nth-child(-n+'+ (y+1) + ')').css("background-color",`${color}`);
              }
              for(i=0;i<3;i++){
               BallStrOut(bso[i],Score[bso[i]],x);

              }
            }//end game if live
                //}
            else if(response.gameData.status.abstractGameCode == "F"){
              var winPitch = response.liveData.decisions.winner;
              var losePitch = response.liveData.decisions.loser;
              var winPitchName = response.liveData.decisions.winner.fullName;
              var losePitchName = response.liveData.decisions.loser.fullName;
              $('#game-'+ x +' .myRow .innScore').append('Final');
              function pitchRecord(x, link, result){
              $.ajax({
                url: 'https://statsapi.mlb.com:443'+link+'/stats?stats=season',
                type: 'GET',
                data:
                {
                  format: 'json'
                },
                  success: function(response)
                  {
                    if(result == "save")
                      $('#gameID-'+x+' .pitch #'+result).append(": S: "+response.stats[0].splits[0].stat.saves+" - O: "+response.stats[0].splits[0].stat.saveOpportunities);
                    else
                      $('#gameID-'+x+' .pitch #'+result).append(": "+response.stats[0].splits[0].stat.wins+"-"+response.stats[0].splits[0].stat.losses);
                  }
                });
              }
              if(response.liveData.decisions.save == null){
                $('#gameID-'+ x).append('<p></br><p class="pitch">'+ '<span id="win"><span class="pName" title="'+winPitchName+'">WP: </span>' + winPitchName + '</span></br><span id="lose"><span class="pName">LP: </span>' + losePitchName + '</span></p></p>');
                var pitchName = [[winPitch.link, "win"],[losePitch.link,"lose"]];

                for(i=0;i<pitchName.length;i++)
                {
                    pitchRecord(x,pitchName[i][0],pitchName[i][1]);
                }
}
                  //var savePitchName = "No Save";
              else if(response.liveData.decisions.save !== null) {
                  var savePitch = response.liveData.decisions.save;
                  var savePitchName = response.liveData.decisions.save.fullName;

                    $('#gameID-'+ x).append('<p></br><p class="pitch">'+ '<span id="win"><span class="pName" title="'+winPitchName+'">WP: </span>' + winPitchName + '</span></br><span id="lose"><span class="pName">LP: </span>' + losePitchName + '</span></br><span id="save"><span class="pName">Save: </span>'+ savePitchName + ' ' + '</span></p></p>');

                    var pitchName = [[winPitch.link, "win"],[losePitch.link,"lose"],[savePitch.link,"save"]];

                    for(i=0;i<pitchName.length;i++)
                    {
                        pitchRecord(x,pitchName[i][0],pitchName[i][1]);
                    }
                  };
                }
//goes to else if check for game is final
            else if(response.gameData.status.abstractGameCode == 'P')
                  {
                    if (isNaN(response.gameData.probablePitchers.home))
                      var homeProb = "TBA";
                      else {
                      homeProb = response.gameData.probablePitchers.home.fullName;
                    }
                    if (isNaN(response.gameData.probablePitchers.away))
                      var awayProb = "TBA";
                    else {
                      awayProb = response.gameData.probablePitchers.away.fullName
                    }
                    $('#gameID-'+ x).append('<p><p class="pitch">'+ '<span class="home">Home Pitcher: ' + homeProb + '</span></br><span class="away">Away Pitcher: ' + awayProb + '</span></p></p>');
                    $('#game-'+ x +' .myRow .innScore').append(`${startTime}`);
                  }
//----------------The Below section adds the actual boxscore table
$('#game-'+ x +' .myRow').append(`<th id="i1" class="inning">1</th><th id="i2" class="inning">2</th><th id="i3" class="inning">3</th><th id="i4" class="inning">4</th><th id="i5" class="inning">5</th><th id="i6" class="inning">6</th><th id="i7" class="inning">7</th><th id="i8" class="inning">8</th><th id="i9" class="inning">9</th>`)
$('#game-'+ x +' .home').append(`<th>${hTeam}</th><td class="inning" id="h1"></td><td class="inning" id="h2"></td><td class="inning" id="h3"></td><td class="inning" id="h4"></td><td class="inning" id="h5"></td><td class="inning" id="h6"></td><td class="inning" id="h7"></td><td class="inning" id="h8"></td><td class="inning" id="h9"></td>`);
$('#game-'+ x +' .away').append(`<th>${aTeam}</th><td class="inning" id="r1"></td><td class="inning" id="r2"></td><td class="inning" id="r3"></td><td class="inning" id="r4"></td><td class="inning" id="r5"></td><td class="inning" id="r6"></td><td class="inning" id="r7"></td><td class="inning" id="r8"></td><td class="inning" id="r9"></td>`);
$('#gameID-'+ x).append(`<a href="gamesVsOpp.html?homeid=${hTeamID}&awayid=${aTeamID}" class="button">All Matchups</a>`);
//-------------------Below Populates data into the boxscore if game is live
        for(var i=0; i < innings.length; i++)
        {
          var inning = parseInt(innings[i].ordinalNum);
          var rInnScore = parseInt(innings[i].away.runs);
          var hInnScore = 0;


          if(isNaN(innings[i].home.runs))
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
        if(isNaN(hTotal))
          hTotal=0;
        $('#game-'+ x +' .home').append(`<th style="display: table-cell;">${hTotal}</th>`);
        if(isNaN(aTotal))
          aTotal=0;
        $('#game-'+ x +' .away').append(`<th style="display: table-cell;">${aTotal}</th>`);


      //  console.log("Home "+ hTeam, "Away " +aTeam);
        //console.log(gID, x);
      //}

       },
      });
    };//closes boxscore
//----boxscore

//--loops through and creates list of games
    for(var i=0; i < games.length; i++)
      {
  $('.tScores').append('<div id="gameID-' + i+'" class="boxScore"><table id="game-' + i + '" class="score"><tr class="myRow"><th class="innScore"></th></tr><tr class="away"></tr><tr class="home"></tr></table><tr class="players"></tr></div>');

        boxScore(i);

      };
    },
//-----
      error: function()
      {
        $('#errors').text("There was an error processing your request. Please try again.")
      }

});
}
runFunction();
$("#forDate").click(function(){
$(".tScores").empty();
  runFunction();
  //console.log("Date sent to URL ", day1);
})
});
