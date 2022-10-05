document.body.addEventListener('keydown', (event) => {
    playSound(event.code.toLowerCase());
});

document.querySelector('#play').addEventListener('click', () => {
    let song = document.querySelector('#input').value;
    let bpm = document.querySelector('#bpm').value;

    if(song != '') {
        let songArray = song.split('');
        playComposition(songArray, bpm);
    }
});

document.querySelector('#clear').addEventListener('click', () => {
    document.querySelector('#input').value = '';
});

function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`);
    let keyElement = document.querySelector(`div[data-key="${sound}"]`);

    if(audioElement) {
        audioElement.currentTime = 0;
        audioElement.play();
    }

    if(keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 300);
    }

    
}

function playComposition(songArray, bpm) {
    let wait = 0;

    for(let note of songArray) {
        setTimeout(() => {
            playSound(`key${note}`);
        }, wait);

        wait += ((60 / bpm)  * 1000);
    }
}