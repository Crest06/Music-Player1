document.addEventListener('DOMContentLoaded', (event) => {

    const songs = [
        {
            title: "Lose My Mind",
            cover: "Images/F1.jpg",
            artist: "Don Toliver and Doja Cat",
            file: "Audios/LoseMyMind.mp3"
        },

        {
           title: "Radioactive",
            cover: "Images/Radioactive.jpg",
            artist: "Imagine Dragons",
            file: "Audios/Radioactive.mp3"
        },

        {
          title: "You should see me in a Crown",
            cover: "Images/Crown.jpg",
            artist: "Billie Eilish",
            file: "Audios/You should see me in a Crown.mp3"
        },
        {
          title: "FLY",
         cover: "Images/FLY.jpg",
         artist: "Quavo & Lenny Kravitz",
         file: "Audios/FLY.mp3"
        },
        {
        title: "Invincible - Kaiju No.8",
            cover: "Images/Invincible.jpg",
            artist: "One Republic",
            file: "Audios/Invincible.mp3"
        },
        {
         title: "30 for 30",
            cover: "Images/30.jpg",
            artist: "Kendrick Lamar & SZA",
            file: "Audios/30 for 30.mp3"
        },
    ];

    
    const titleEl = document.getElementById('title');
    const artistEl = document.getElementById('artist');
    const coverEl = document.getElementById('cover');
    const audioEl = document.getElementById('audio'); 
    const playButtonEl = document.getElementById('play-button'); 
    const playIconEl = document.getElementById('play-icon'); 
    
    
    const progressEl = document.getElementById('progress');
    const progressContainerEl = document.getElementById('progress-container');
    const currentTimeEl = document.getElementById('current-time');
    const durationTimeEl = document.getElementById('duration-time');
    const prevButtonEl=document.getElementById('previous-button');
    const nextButtonEl=document.getElementById('next-button');


    
    let currentSongIndex = 0;
    let isPlaying = false; 


    
    loadSong(currentSongIndex);


    function loadSong(index) {
       const song = songs[index];
       titleEl.textContent = song.title;
       artistEl.textContent = song.artist;
       coverEl.src = song.cover;
       audioEl.src = song.file;
    }


    
    function togglePlayPause() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    function playSong() {
        isPlaying = true;
        audioEl.play(); 
        playIconEl.src = "Images/Pause Button.png"; 
    }

    function pauseSong() {
        isPlaying = false;
        audioEl.pause();
        playIconEl.src = "Images/Vibrant Gradient Play Button Icon.png"; 
    }

    function nextSong(){
        currentSongIndex++;

        if(currentSongIndex>songs.length-1){
            currentSongIndex=0;
        }
        loadSong(currentSongIndex)

        if(isPlaying){
            playSong();
        }
    }

    function prevSong(){
        currentSongIndex--;

        if(currentSongIndex<0){
            currentSongIndex=songs.length-1;
        }
        loadSong(currentSongIndex);

        if(isPlaying){
            playSong();
        }
    }

   
    function updateProgress(e) {
       
        const { duration, currentTime } = e.srcElement;
        
       
        const progressPercent = (currentTime / duration) * 100;
        progressEl.value = progressPercent;

      
        let minutes = Math.floor(currentTime / 60);
        let seconds = Math.floor(currentTime % 60);
        seconds = seconds < 10 ? '0' + seconds : seconds; 
        currentTimeEl.textContent = `${minutes}:${seconds}`;
    }


    
    audioEl.addEventListener('loadedmetadata', () => {
        let totalMinutes = Math.floor(audioEl.duration / 60);
        let totalSeconds = Math.floor(audioEl.duration % 60);
        totalSeconds = totalSeconds < 10 ? '0' + totalSeconds : totalSeconds;
        durationTimeEl.textContent = `${totalMinutes}:${totalSeconds}`;
    });


    
    function setProgress(e) {
        
        const width = this.clientWidth; 
        
        const clickX = e.offsetX; 
        const duration = audioEl.duration;

       
        audioEl.currentTime = (clickX / width) * duration;
    }



    playButtonEl.addEventListener('click', togglePlayPause);
    

    audioEl.addEventListener('timeupdate', updateProgress);

    
    progressContainerEl.addEventListener('click', setProgress);

    nextButtonEl.addEventListener('click', nextSong);
    prevButtonEl.addEventListener('click', prevSong);

    audioEl.addEventListener('ended', nextSong);

});
