const musicOn = document.querySelector('.on');
const musicBtn = document.querySelector('.music-btn')
const musicOff = document.querySelector('.off');
const audio = document.querySelector('audio');

musicOn.addEventListener('click', function(){
    musicOn.style.display = 'none'; 
    musicOff.style.display = 'block';
    audio.muted = false;
    audio.play();
});
musicOff.addEventListener('click', function(e){
    musicOff.style.display = 'none'; 
    musicOn.style.display = 'block';
    audio.muted = true;
});
