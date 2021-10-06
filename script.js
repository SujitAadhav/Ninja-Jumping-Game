score = 0;
cross = true;

audio = new Audio('music.mp3');
audiogo = new Audio('gameover.mp3');
setInterval(() => {
    audio.play()
}, 1000);

document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode);
    if(e.keyCode == 38){
        hero = document.querySelector('.hero')
        hero.classList.add('animateHero')
        setTimeout(() => {
            hero.classList.remove('animateHero')
        }, 700);
    }

    if(e.keyCode == 39){
        hero = document.querySelector('.hero')
        heroX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
        hero.style.left = heroX + 112 + "px";
    }

    if(e.keyCode == 37){
        hero = document.querySelector('.hero')
        heroX = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'));
        hero.style.left = (heroX - 112) + "px";
    }
}

setInterval(() => {
   hero = document.querySelector('.hero');
   gameOver = document.querySelector('.gameOver');
   obstacle = document.querySelector('.obstacle');
   
   dx = parseInt(window.getComputedStyle(hero, null).getPropertyValue('left'))
   dy = parseInt(window.getComputedStyle(hero, null).getPropertyValue('top'))

   ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'))
   oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'))

   offsetX = Math.abs(dx-ox)
   offsetY = Math.abs(dy-oy)
   console.log(offsetX, offsetY)
   if(offsetX < 113 && offsetY < 52){
       gameOver.style.visibility = 'visible';
       obstacle.classList.remove('obstacleAni')
       audiogo.play();
       setTimeout(() => {
           audiogo.pause()
           audio.pause()
       }, 1000);
   }else if(offsetX < 145 && cross){
       gameOver.innerHTML = "Game Over - Reload to play again"
       score+=1;
       updateScore(score);
       cross = false;
       setTimeout(() => {
           cross = true;
       }, 1000);
       setTimeout(() => {
        aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.1;
        obstacle.style.animationDuration = newDur + 's';
       }, 500);
   }
}, 10);

function updateScore(score){
    scoreCont.innerHTML = "Your score is: " + score
}