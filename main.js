const bgm = new Audio("sound/habede.mp3");

bgm.loop = true;     
bgm.volume = 0.8;     
bgm.currentTime = 7;

function fadeAudio(audio, targetVolume, duration = 1000) {
  const startVolume = audio.volume;
  const volumeChange = targetVolume - startVolume;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    audio.volume = startVolume + volumeChange * progress;
    if (progress < 1) requestAnimationFrame(step);
    else if (targetVolume === 0) audio.pause(); // optional: auto-pause when fully silent
  }

  requestAnimationFrame(step);
}


document.addEventListener("click", () => {
  if (bgm.paused) {
    bgm.play();
    papersound.load();
  }
}, { once: true }); 

const initPinscreen = (selector, onEnter) => {
    const container = document.querySelector(selector);
    const input = container.querySelector(".pinvalue");
    const keys = container.querySelectorAll(".pinkeyboardkey");
    const maxLength = 6;
    


    const clear = () => {
        input.value = "";
    };

    for (const key of keys){
        key.addEventListener("click",() => {
            const value= key.textContent.trim();

            if (key.classList.contains("pinkeyboardclear")){
                clear();
            } else if (key.classList.contains("pinkeyboardsubmit")){
                input.value && onEnter && onEnter(input.value, clear);
            } else{
                if (input.value.length < maxLength) {
                    input.value += value;
                }
            };
            
        });
    };
};

initPinscreen("#pinscreen", (pin, clear) => {
  const pinScreen = document.getElementById("pinscreen");
  const birthdayScene = document.getElementById("birthday-scene");
  const overlay = document.getElementById("transitionblack");

  if (pin === "140224") {
    overlay.style.opacity = "1";

    setTimeout(() => {
      
      pinScreen.style.display = "none";

      
      birthdayScene.style.display = "flex";
      birthdayScene.style.opacity = "0";

      
      setTimeout(() => {
        overlay.style.opacity = "0";
        birthdayScene.style.transition = "opacity 1s ease";
        birthdayScene.style.opacity = "1";
      }, 500);
    }, 1000);
  } else {
    console.log("wrong pin");
    clear();
  }
});

const letter = document.querySelector('.letter');
const modalOverlay = document.getElementById('modal-overlay');
const modalYes = document.getElementById('modal-yes');
const modalNo = document.getElementById('modal-no');
const papersound = new Audio("sound/paperrustle.mp3");
papersound.volume = 1.0;

if (letter && modalOverlay && modalYes && modalNo) {
  
  letter.addEventListener('click', () => {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
  });

  modalNo.addEventListener('click', () => {
  const modalBox = document.querySelector('.modal');
  modalOverlay.classList.remove('open');

  setTimeout(() => {
    modalOverlay.setAttribute('aria-hidden', 'true');
    if (modalBox) modalBox.classList.remove('hidden'); 
  }, 400);
});
  
  modalYes.addEventListener('click', () => {
    
    const modalBox = document.querySelector('.modal');
    if (modalBox) modalBox.classList.add('hidden');
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    
    const wrap = document.querySelector('.letterpaper-wrap');
    if (wrap) {
      wrap.classList.add('open');
      papersound.currentTime = 0;
      papersound.play();
    }
  });

  
  modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    const wrap = document.querySelector('.letterpaper-wrap');
    const modalBox = document.querySelector('.modal');
    
    modalOverlay.classList.remove('open');
    
    if (wrap && wrap.classList.contains('open')) {
      wrap.classList.remove('open');
      papersound.currentTime = 0;
      papersound.play()
    }
    
    setTimeout(() => {
      modalOverlay.setAttribute('aria-hidden', 'true');
      if (modalBox) modalBox.classList.remove('hidden'); 
    }, 400); 
  }
});

}


const radio = document.querySelector('.radio');
const radioOverlay = document.querySelector('.radiomodaloverlay');
const radioYes = document.getElementById('radiomodalyes');
const radioNo = document.getElementById('radiomodalno');
const musicSet = document.querySelector('.musicset');
const cd = document.querySelector('.cd');
const paperSound = new Audio('sound/paperrustle.mp3');

if (radio && radioOverlay && radioYes && radioNo && musicSet && cd) {

  // 🩷 Show modal when clicking the radio
  radio.addEventListener('click', () => {
    const modalBox = document.querySelector('.radiomodal');
    if (modalBox) modalBox.classList.remove('hidden'); // <– make sure it shows again
    radioOverlay.classList.add('open');
    radioOverlay.setAttribute('aria-hidden', 'false');
  });

  // ❌ No button closes modal
  radioNo.addEventListener('click', () => {
    const modalBox = document.querySelector('.radiomodal');
    radioOverlay.classList.remove('open');
    setTimeout(() => {
      radioOverlay.setAttribute('aria-hidden', 'true');
      if (modalBox) modalBox.classList.remove('hidden');
    }, 400);
  });

  // ✅ Yes button → show CD + paper slide up
radioYes.addEventListener('click', () => {
  const modalBox = document.querySelector('.radiomodal');
  if (modalBox) modalBox.classList.add('hidden');

  fadeAudio(bgm, 0, 1500);

  musicSet.classList.add('open');
  cd.classList.add('spin');

  paperSound.currentTime = 0;
  paperSound.play();

  radioOverlay.classList.add('open');
  radioOverlay.setAttribute('aria-hidden', 'false');

  loadSong(currentSong);
});



// 🌑 Clicking outside closes overlay & hides CD/paper
radioOverlay.addEventListener('click', (e) => {
  if (e.target === radioOverlay) {
    const modalBox = document.querySelector('.radiomodal');

    // if music is open → close it first
    if (musicSet.classList.contains('open')) {
      musicSet.classList.remove('open');
      cd.classList.remove('spin');

      // fade out radio song
      if (audio) fadeAudio(audio, 0, 1000);

      bgm.volume = 0;
      bgm.play();
      fadeAudio(bgm, 0.8, 1500);

      setTimeout(() => {
        radioOverlay.classList.remove('open');
        radioOverlay.setAttribute('aria-hidden', 'true');
        if (modalBox) modalBox.classList.add('hidden');
      }, 400);
    } else {
      radioOverlay.classList.remove('open');
      radioOverlay.setAttribute('aria-hidden', 'true');
    }
  }
});
}


// 🎶 SONG SYSTEM
const songs = [
  {
    title: "seasons - wave to earth",
    cover: "Songs/seasonscover.png",
    audio: "Songs/seasons.mp3",
    lyrics: "If I could be by your side, I'll give you all my life. My seasons."
  },
  {
    title: "From the Start - Laufey",
    cover: "Songs/fromthestartcover.png",
    audio: "Songs/fromthestart.mp3",
    lyrics: "That when I talk to you, oh, Cupid walks right through and shoots an arrow through my heart."
  },
  {
    title: "A Piece of You - Nathaniel Constantin",
    cover: "Songs/apiece.jpg",
    audio: "Songs/apiece.mp3",
    lyrics: "My heart belongs to you, I'll take a piece of you"
  },
  {
    title: "An Art Gallery Could Never be as Unique as You - mrld",
    cover: "Songs/anartgallerycover.png",
    audio: "Songs/anartgallery.mp3",
    lyrics: "It's from the way that you move and everything that you do and after that it's when I realize that I love you."
  },
  {
    title: "Nothing - Bruno Major",
    cover: "Songs/nothing.png",
    audio: "Songs/nothing.mp3",
    lyrics: "Dumb conversations, we lose track of time. Have I told you lately I'm grateful you're mine?"
  },
  {
    title: "Those Eyes - New West",
    cover: "Songs/thoseeyes.png",
    audio: "Songs/those eyes.mp3",
    lyrics: "'Cause all of the small things that you do are what remind me why I fell for you."
  },
  {
    title: "bad - wave to earth",
    cover: "Songs/bad.png",
    audio: "Songs/bad.mp3",
    lyrics: "How could my day be bad when I'm with you? You're the only one who makes me laugh. So how can my day be bad?"
  },
];

let currentSong = 0;
let audio = null;

const paperArea = document.querySelector('.paperarea');
const paper = document.querySelector('.paper');
const cover = paper.querySelector('.cover');
const title = paper.querySelector('.songtitle');
const lyrics = paper.querySelector('.lyrics');
const playPause = paper.querySelector('.playpause');
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

function loadSong(index) {
  const s = songs[index];
  cover.src = s.cover;
  title.textContent = s.title;
  lyrics.textContent = s.lyrics;

  // stop previous audio instantly (no fade)
  if (audio && !audio.paused) {
    audio.pause();
  }

  // Load and play new song
  currentSong = index;
  audio = new Audio(s.audio);
  audio.loop = false;
  audio.volume = 0.5;
  audio.play();

  playPause.textContent = "⏸";

  // connect play/pause
  playPause.onclick = () => {
    if (audio.paused) {
      audio.play();
      playPause.textContent = "⏸";
    } else {
      audio.pause();
      playPause.textContent = "▶";
    }
  };

  setupAutoNext();
}

function setupAutoNext() {
  if (!audio) return;
  audio.onended = () => {
    slide("right");
  };
}

function slide(direction) {
  const oldPaper = paper.cloneNode(true);
  const newPaper = paper.cloneNode(true);
  const parent = paper.parentElement;

  const dir = direction === "right" ? 1 : -1;
  const newIndex = (currentSong + dir + songs.length) % songs.length;
  const s = songs[newIndex];

  newPaper.querySelector('.cover').src = s.cover;
  newPaper.querySelector('.songtitle').textContent = s.title;
  newPaper.querySelector('.lyrics').textContent = s.lyrics;

  newPaper.style.transform = `translateX(${dir * 100}%)`;
  parent.appendChild(newPaper);

  requestAnimationFrame(() => {
    oldPaper.style.transform = `translateX(${-dir * 100}%)`;
    oldPaper.style.opacity = "0";
    newPaper.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    parent.removeChild(oldPaper);
  }, 600);

  currentSong = newIndex;
  loadSong(currentSong);
}

rightArrow.addEventListener('click', () => slide('right'));
leftArrow.addEventListener('click', () => slide('left'));



const cakeImg = document.querySelector('.cakecake');
const cakeOverlay = document.getElementById('cakemodaloverlay');
const cakeYes = document.getElementById('cakemodalyes');
const cakeNo = document.getElementById('cakemodalno');
const cakeContainer = document.querySelector('.cakecontainer');
const candleBlow = new Audio('sound/candleblow.mp3');
const candleLight = new Audio('sound/lightcandle.mp3');
const horn = new Audio('sound/partyhorn.mp3');
const burst = new Audio('sound/confettiburst.mp3');
const questionText = document.querySelector('.cakemodalquestion');

horn.volume = 0.7;
burst.volume = 0.4;

if (cakeImg && cakeOverlay && cakeYes && cakeNo && cakeContainer) {
  // open cake modal
  cakeImg.addEventListener('click', () => {
    if (cakeContainer.classList.contains('candles-blown')) {
    questionText.textContent = 'FIRE?!?!?!??!?!?!!?';
  } else {
  questionText.textContent = 'Blow the candles Kenji!!!!!';
  }

    const modalBox = document.querySelector('.cakemodal');
    if (modalBox) modalBox.classList.remove('hidden');
    cakeOverlay.classList.add('open');
    cakeOverlay.setAttribute('aria-hidden', 'false');
  });

  cakeNo.addEventListener('click', () => {
    const modalBox = document.querySelector('.cakemodal');
    cakeOverlay.classList.remove('open');
    cakeOverlay.setAttribute('aria-hidden', 'true'); // instantly hide it
    if (modalBox) modalBox.classList.remove('hidden');
  });

  cakeYes.addEventListener('click', () => {
    const modalBox = document.querySelector('.cakemodal');
    const confetti = document.querySelector('.confetti');
    if (modalBox) modalBox.classList.add('hidden');

    cakeOverlay.classList.remove('open');
    cakeOverlay.setAttribute('aria-hidden', 'true');

    if (cakeContainer.classList.contains('candles-blown')) {
      cakeContainer.classList.remove('candles-blown');
      cakeContainer.classList.add('candles-lit');
      candleLight.currentTime = 0;
      candleLight.play();
    } else {
      cakeContainer.classList.add('candles-blown');
      cakeContainer.classList.remove('candles-lit');
      candleBlow.currentTime = 0;
      candleBlow.play();
      setTimeout(() => candleBlow.pause(), 2000);
      horn.currentTime = 0;
      horn.play();
      setTimeout(() => horn.pause(), 3000);
      burst.currentTime = 0;
      burst.play();
      setTimeout(() => burst.pause(), 3000);

      if (confetti) {
      confetti.classList.add('show');
      setTimeout(() => confetti.classList.remove('show'), 4000);

    }
  }
  });

  cakeOverlay.addEventListener('click', (e) => {
    if (e.target === cakeOverlay) {
      const modalBox = document.querySelector('.cakemodal');
      cakeOverlay.classList.remove('open');
      cakeOverlay.setAttribute('aria-hidden', 'true');
      if (modalBox) modalBox.classList.add('hidden');
    }
  });
}

const polaroid = document.querySelector('.polaroidril');
const polaroidOverlay = document.getElementById('polaroidmodaloverlay');
const polaroidYes = document.getElementById('polaroidmodalyes');
const polaroidNo = document.getElementById('polaroidmodalno');
const polaroidPictures = document.querySelector('.polaroidpictures');


if (polaroid && polaroidOverlay && polaroidYes && polaroidNo && polaroidPictures) {

  polaroid.addEventListener('click', () => { 
    const modalBox = document.querySelector('.polaroidmodal');
    if (modalBox) modalBox.classList.remove('hidden');
    polaroidOverlay.classList.add('open');
    polaroidOverlay.setAttribute('aria-hidden', 'false');
  });

  polaroidNo.addEventListener('click', () => {
    const modalBox = document.querySelector('.polaroidmodal');
    polaroidOverlay.classList.remove('open');
    polaroidOverlay.setAttribute('aria-hidden', 'true');
    if (modalBox) modalBox.classList.add('hidden');
  });

  polaroidYes.addEventListener('click', () => {
    const modalBox = document.querySelector('.polaroidmodal');
    if (modalBox) modalBox.classList.add('hidden');

    polaroidPictures.classList.add('show');

    polaroidOverlay.classList.add('open');
    polaroidOverlay.setAttribute('aria-hidden', 'false');
  });

  polaroidPictures.addEventListener('click', () => {
    polaroidPictures.classList.remove('show');
    setTimeout(() => {
      polaroidOverlay.classList.remove('open');
      polaroidOverlay.setAttribute('aria-hidden', 'true');
    }, 300); 
  });

  polaroidOverlay.addEventListener('click', (e) => {
    if (e.target === polaroidOverlay) {
      const modalBox = document.querySelector('.polaroidmodal');
      polaroidOverlay.classList.remove('open');
      polaroidOverlay.setAttribute('aria-hidden', 'true');
      if (modalBox) modalBox.classList.add('hidden');
      polaroidPictures.classList.remove('show');
    }
  });
}
