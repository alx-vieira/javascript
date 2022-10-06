let digitalElement = document.getElementById('digital');
let sElement = document.getElementById('p_s');
let mElement = document.getElementById('p_m');
let hElement = document.getElementById('p_h');
let activeButton = document.getElementsByClassName('btn');
let riscos = document.querySelector('.riscos');
let ponteiros = document.querySelector('.ponteiros');
let relogio = document.querySelector('.relogio');
let analogicButton = document.getElementById('analogic-button');
let prevButton = analogicButton;


function updateClock() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    digitalElement.innerHTML = `${fixZero(hour)}:${fixZero(minute)}:${fixZero(second)}`;

    let sDeg = ((360 / 60) * second) - 90;
    sElement.style.transform = `rotate(${sDeg}deg)`;

    let mDeg = ((360 / 60) * minute) - 90;
    mElement.style.transform = `rotate(${mDeg}deg)`;

    let hDeg = ((360 / 12) * hour) - 90;
    hElement.style.transform = `rotate(${hDeg}deg)`;
}

function fixZero(time) {
    return time < 10 ? `0${time}` : time;
}

for(let btn of Array.from(activeButton)) {
    btn.addEventListener('click', (e) => {
    
        if( e.target.attributes[0].value == 'analogic-button') {
            e.target.classList.add('active');
            relogio.classList.remove('relogio-digital');
            riscos.classList.remove('ocultar');
            ponteiros.classList.remove('ocultar');
            digitalElement.classList.add('ocultar');
        }

        if(e.target.attributes[0].value == 'digital-button') {
            e.target.classList.add('active');
            relogio.classList.add('relogio-digital');
            digitalElement.classList.remove('ocultar');
            riscos.classList.add('ocultar');
            ponteiros.classList.add('ocultar');
        }

        prevButton.classList.remove('active');
        
        prevButton = e.target;
    });
}

setInterval(updateClock, 1000);
updateClock();
