var choice, i, w, winner, racerArray,
    slideArray = ['#slideTP', '#slideM', '#slideD', '#slideT', '#slideDie'],
    winArray = ['Timmy Pete', 'Mopsy', 'Deandra', 'Tickles'],
    count = 0,
    money = 0;
var BioAppears = function(racer, marg){
  this.titleMarg = marg;
  this.button = '#seeBio' + racer;
  this.bio = '#bio' + racer;
  this.title = '#title' + racer;
  this.portrait = '#portrait' + racer;
  this.image = '#img' + racer;
  this.allLeft = [this.button, this.title, this.portrait, this.image];
  this.changeCSS = function(){
    for(i = 0; i < this.allLeft.length; i++){
      $(this.allLeft[i]).css('position', 'static').css('float', 'left');
    }
    $(this.title).css('margin-left', this.titleMarg);
    $(this.portrait).css('margin-right', '5em');
    $(this.button).css('margin-left', '-.4em');
    $(this.bio).css('display', 'inline-block').css('float', 'right');
  }
};
var BetPlaced = function(betOn, txt, yes, no){
  this.selection = betOn;
  this.newText = txt;
  this.add = yes;
  this.stay = no;
  this.isBet = function(){
    if(isNaN(money) || money == 0){
      $(this.newText).text('Please use a numerical digit.');
    }
    else{
      $('.moneyInput').hide();
      $('.allBetChoices').hide();
      $(this.newText).text("What?! You can do better than that.  Besides, Coyote says it's for charity. How about I put you down for $" + (money * 200) +"?");
      $(this.add).show();
      $(this.stay).show();
    };
  };
};
var Animal = function(s, f, p){
  this.speed = s;
  this.focus = Math.floor(f);
  this.position = p;
  this.run = function(){
    if(this.focus > (Math.random() * 10)){
      this.position += this.speed;
      racerArray = [turtle.position, rabbit.position, cow.position, raven.position];
    };
  };
};
var timmyCSS = new BioAppears('TP', '5em'),
    mopsyCSS = new BioAppears('M', '6.5em'),
    deandraCSS = new BioAppears('D', '6em'),
    ticklesCSS = new BioAppears('T', '6em');
var timmyChosen = new BetPlaced('#betTP', '#bioTextTP', '#addMoneyTP', '#stayTP'),
    mopsyChosen = new BetPlaced('#betM', '#bioTextM', '#addMoneyM', '#stayM'),
    deandraChosen = new BetPlaced('#betD', '#bioTextD', '#addMoneyD', '#stayD'),
    ticklesChosen = new BetPlaced('#betT', '#bioTextT', '#addMoneyT', '#stayT');
var turtle = new Animal(8, Math.random() * 5, 0),
    rabbit = new Animal(6, Math.random() * 7, 0),
    cow = new Animal(9, Math.random() * 4, 0),
    raven = new Animal(7, Math.random() * 6, 0);

$(document).ready(function(){
  $('#eulogy').hide();
  $('.allSlides').hide();
  $('.allAdds').on('click', function(){
    money = money * 200;
    $('#newWall').css('display', 'inline-block');
    dropDead();
  });
  $('.allStays').on('click', function(){
    $('#newWall').css('display', 'inline-block');
    dropDead();
  });
  $('#shotGun').hide();
  $('#seeBioTP').on('click', function(){
    timmyCSS.changeCSS();
  });
  $('#seeBioM').on('click', function(){
    mopsyCSS.changeCSS();
  });
  $('#seeBioD').on('click', function(){
    deandraCSS.changeCSS();
  });
  $('#seeBioT').on('click', function(){
    ticklesCSS.changeCSS();
  });
  $('#betTP').on('click', function(){
    choice = 'Timmy Pete';
    timmyChosen.isBet();
  });
  $('#betM').on('click', function(){
    choice = 'Mopsy';
    mopsyChosen.isBet();
  });
  $('#betD').on('click', function(){
    choice = 'Deandra';
    deandraChosen.isBet();
  });
  $('#betT').on('click', function(){
    choice = 'Tickles';
    ticklesChosen.isBet();
  });
  $('#pullTrigger').on('click', function(){
    $('#shootGun').css('display', 'none');
    $('#pullTrigger').css('display', 'none');
    $('#shotGun').show().delay(2000).fadeOut('slow');
    setTimeout(FadeSlides, 3000)
  });
  window.onkeyup = keyup;
  function keyup(e){
    money = e.target.value;
  };
});
dropDead = function(){
  while(Math.max.apply(Math, racerArray) < 50){
    turtle.run();
    rabbit.run();
    cow.run();
    raven.run();
  };
  finishLine();
};
finishLine = function(){
  for(w = 0; w < racerArray.length; w++){
    if(Math.max.apply(Math, racerArray) == racerArray[w]){
      winner = winArray[w];
      slideWin = slideArray[w];
      slideArray.splice(w, 1);
      slideArray.unshift(slideWin);
      winText = slideWin + 'Txt';
    };
  };
  if(choice == winner){
    $(winText).text("Congratulations, " + choice + " is the winner! You're now up $" + (money * 4) + " in fake money!!!  As for the others, well...");
  }
  else{
    $(winText).text(winner + " is the winner!!! Ha ha, you lose $" + money + ".  But the good news is you're bet turned donation is going to make the orphan pig and weasel ranch VERY happy. Here are the final results! Oh, and really sorry about what happened to " + choice + "...");
  };
};
function FadeSlides(){
  $(slideArray[count]).fadeIn(5000);
  $(slideArray[count]).delay(7000).fadeOut(5000);
  if(count == 1){
    $('#eulogy').trigger('play');
  }
  else if(count == 3){
    $(slideArray[4]).delay(17500).fadeIn('fast');
  }
  count++;
  setTimeout(FadeSlides, 12000);
};

