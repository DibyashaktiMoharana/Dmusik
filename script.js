var pl1 = [
    { songName: "15SEC", urL: "./songs/15SEX.mp3", img: "https://c.saavncdn.com/305/15-Seconds-English-2019-20190618233124-500x500.jpg" },
    { songName: "Jale 2", urL: "./songs/Jale 2.mp3", img: "./images/jale.jpg" },
    { songName: "Pehle Bhi main", urL: "./songs/Pehle Bhi Main.mp3", img: "./images/animal.jpg" },
    { songName: "Ram siya ram", urL: "./songs/Ram Siya Ram.mp3", img: "./images/ram.jpg" },
    { songName: "Arjan Valley", urL: "./songs/Arjan Vailly Ne.mp3", img: "./images/animal.jpg" },
    { songName: "Choo Lo", urL: "./songs/Choo Lo.mp3", img: "./images/choolo.png" },
    { songName: "vaaqif", urL: "./songs/Vaaqif.mp3", img: "./images/vaaqif.png" },
    { songName: "Dil Mere", urL: "./songs/Dil Mere.mp3", img: "./images/choolo.png" }


]


var pl2 = [
    { songName: "Tu Mori Duniya", urL: "./songs/playlists/playlist2/Tu Mori Duniya.mp3", img: "https://c.saavncdn.com/143/Tu-Mori-Duniya-Odia-2021-20210927195505-500x500.jpg" },
    { songName: "Kebe Asi Tu", urL: "./songs/playlists/playlist2/Kebe Asi Tu.mp3", img: "https://c.saavncdn.com/027/Kebe-Aasi-Tu-Oriya-2021-20211018100748-500x500.jpg" },
    { songName: "Bhala Paye Tate Re", urL: "./songs/playlists/playlist2/Bhala Paye Tate Re.mp3", img: "https://c.saavncdn.com/875/Bhala-Paaye-Tate-Re-Oriya-2022-20220706170811-500x500.jpg" },
    { songName: "Sadqay", urL: "./songs/playlists/playlist2/Sadqay.mp3", img: "https://c.saavncdn.com/290/Sadqay-Hindi-2024-20240201170528-500x500.jpg" },
    
]


// variables
var end;//the working end
var playlist; //the working playlist
var audio = new Audio()
var selectedsong = 0 //the initial song
var poster = document.querySelector("#left")
var play = document.querySelector("#play")
var backward = document.querySelector("#backward")
var forward = document.querySelector("#forward")
var changeauto;
var flag = 0
var plflag = 0
var loop_flag = 0
var volflag = 0
var autoplay = 0
var loop = document.querySelector("#loop")
var reset = document.querySelector("#reset")
var volumebtn = document.querySelector("#volumebtn")
var volrange = document.querySelector(".range-slider")
var volrangeslider = volrange.getElementsByTagName("input")[0]
var autoplaycheck = document.querySelector("#autoplaycheck")
const navplay = document.querySelector(".o1")
const playlistcontainer = document.querySelector(".playlistcontainer")
var plcontainerflag = 0;
const pl1card = document.querySelector("#pl1");
const pl1card1 = document.querySelector("#pl2");



function getarr (num){
    if(num === 1){
        end = pl1.length-1
        playlist = pl1;
    }
    if(num === 2){
        end = pl2.length - 1
        playlist = pl2;
    }
}


function getDuration() {
    var audio = document.getElementsByTagName('AUDIO');
    for (let i = 0; i < audio.length; i++) {
      let duration = document.getElementById("myAudio "+i).duration;
      var minutes = Math.floor(duration / 60);
      var seconds = Math.floor(duration % 60).toString().padStart(2, '0');

      document.getElementById("duration " + i).innerHTML = minutes+":"+seconds;
    }
  }

function duration(){
setTimeout(()=>{
    getDuration();
},800);
}

function main (arr) {
    var clutter = ""
    
    arr.forEach((Elem,id) =>{
        clutter += `<div class="song-card" id=${id}>
        <div class="part1">
            <img src=${Elem.img}><h2>${Elem.songName}</h2>
        </div>
        <div id="duration ${id}" class="duration">00:00</div>
        <audio hidden id="myAudio ${id}"  controls><source src="${Elem.urL}" type="audio/mpeg">  Your browser does not support the audio element.</audio>
        </div>`
    })
    document.querySelector("#all-songs").innerHTML = clutter
    audio.src = arr[selectedsong].urL
    poster.style.backgroundImage = `urL(${arr[selectedsong].img})`
}

function rendernext (pl) {
    var plcache = ""
    
    pl.forEach((Elem,id) =>{
        plcache += `<li>${Elem.songName}</li>`
    })
    document.querySelector("#playlists").innerHTML = ""
    document.querySelector("#playlists").innerHTML = plcache

}


function progress(){
    var winWidth = window.innerWidth;
    var timer = setInterval(function(){
         document.getElementById('progress').style.width = audio.currentTime / audio.duration * winWidth +'px';
    },100);
    
    
    // stop the setInterval when song ended
    audio.addEventListener('ended',function(){
        clearInterval(timer);
    })};

// checking autoplay
function checkauto() {
    if(audio.ended){
        playNextSong()
    }
}

// Function to play the next song
function playNextSong() {
        if (selectedsong < end) {
            selectedsong += 1;
        } else {
            selectedsong = 0;
        }
        main(playlist);
        duration();
        audio.play();
        progress();
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`;
        flag = 1;
}

//playlistcontainer rendering
function renderplaylistcard(pl) {
    var plno = 1;
    var plelements = ""
    document.querySelector(".playlistcontainer").innerHTML = `<span class="playlistcard"><h1>PLAYLIST ${plno}</h1><div class="songlist"></div></span>`
    pl.forEach((Elem,id) =>{
        plelements += `<li>${Elem.songName}</li>`
    })
    document.querySelector(".songlist").innerHTML = plelements
    plno = 2;
}


//intialization
getarr(1)
rendernext(pl2)
main(pl1)
duration()





// functionality

document.querySelector("#all-songs").addEventListener("click", (dets)=>{
    selectedsong = parseInt(dets.target.id) //might throw an error,may parse it as a string...so.
    main(playlist)
    duration()
    audio.play()
    progress()
    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    flag = 1

})

//nextplaylist
document.querySelector(".description").addEventListener("click", ()=>{
    if(plflag === 0){

        getarr(2)
        rendernext(pl1)
        selectedsong = end - (end) //array sizes are different.setting to first song.
        main(playlist)
        duration()

        play.innerHTML = `<i class="ri-play-mini-fill"></i>`
        flag = 0
        plflag = 1
    }else{

        getarr(1)
        rendernext(pl2)
        selectedsong = end - end
        main(playlist)
        duration()
        flag = 0
        play.innerHTML = `<i class="ri-play-mini-fill"></i>`
        plflag = 0
    }
})

//playbutton
play.addEventListener("click", ()=>{
    if(flag == 0){
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    audio.play()
    progress()



    // add the draggable functionality to the progress div and set the play with attribute as offset time

    flag = 1
    }else{
        play.innerHTML = `<i class="ri-play-mini-fill"></i>`
        audio.pause()
        flag = 0
    }
})

//autoplay
autoplaycheck.addEventListener("change", handlechange=>{
    if(handlechange.target.checked){
        autoplay = 1
        if(autoplay === 1 && !changeauto){changeauto = setInterval(checkauto,500)}
    }
    else{
        clearInterval(changeauto)
        changeauto = null
        autoplay = 0
        
        audio.addEventListener("ended", () => {
            play.innerHTML = `<i class="ri-play-mini-fill"></i>`
            flag = 0
    })
    }
}
)

//play using spacebar
document.addEventListener('keypress', event=>{
    if(event.key === " " && flag == 0){
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    audio.play()

    progress()

    // add the draggable functionality to the progress div and set the play with attribute as offset time

    flag = 1
    }else if (event.key === " " && flag == 1){
        play.innerHTML = `<i class="ri-play-mini-fill"></i>`
        audio.pause()
        flag = 0
    }
    
});

//next using . key
document.addEventListener('keypress' , event=>{
    if(event.key === "."){
        if (selectedsong == end){
            selectedsong = 0
        }else{
            selectedsong += 1
        }
    
        main(playlist)
        duration()
        audio.play()
        progress()
    
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
        flag = 1
    }
})

//prev song using , key
document.addEventListener('keypress', event=>{
    if(event.key === ",")
    {
        if (selectedsong == 0){
            selectedsong = end
        }else{
            selectedsong -= 1
        }
        main(playlist)
        duration()
    
        audio.play()
        progress()
    
        play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
        flag = 1
    }
})


//forward button
forward.addEventListener("click", ()=>{
    if (selectedsong == end){
        selectedsong = 0
    }else{
        selectedsong += 1
    }

    main(playlist)
    duration()
    audio.play()
    progress()

    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    flag = 1
})
//backward button
backward.addEventListener("click", ()=>{
    if (selectedsong == 0){
        selectedsong = end
    }else{
        selectedsong -= 1
    }
    main(playlist)
    duration()

    audio.play()
    progress()

    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    flag = 1
})


//loop
loop.addEventListener("click", ()=>{
    //IF UR STARTING OFF THEN TO PLAY IT BT IF UR IN BETWEEN AND ITS PAUSED DONT PLAY
    if(loop_flag === 0){
        loop_flag = 1
        loop.style.backgroundColor = `rgb(0, 0, 0)`
        audio.loop = true
    }else{
        loop_flag = 0
        loop.style.backgroundColor = `rgb(47, 46, 46)`
        audio.loop = false
    }
})


//reset
reset.addEventListener("click", ()=>{
    audio.currentTime = 0
    audio.play()
    progress()
    flag = 1
})

//volume button
volumebtn.addEventListener("click", ()=>{
    if(volflag === 0){
        volrange.style.display = "flex"
        volflag = 1
        volrangeslider.addEventListener("change",(e)=>{
            audio.volume = e.target.value/100
        })
    }else{
        volrange.style.display = "none"
        volflag = 0
    }
})


//mute using m and max using f
document.addEventListener("keypress", (e)=>{
    if (e.key == "m"){
        audio.volume = 0
        volrangeslider.value = 0

    }else if(e.key == "f"){
        audio.volume = 1
        volrangeslider.value = 100
    }
})

//navbar


//playlists
navplay.addEventListener("click", ()=>{
    if(plcontainerflag === 0){
        playlistcontainer.style.display = "flex"
        plcontainerflag = 1
    }else{
        playlistcontainer.style.display = "none"
        plcontainerflag = 0
    }
})

//playlist clickable
pl1card.addEventListener("click", ()=>{
    getarr(1)
    rendernext(pl2)
    selectedsong = end - end
    main(playlist)
    duration()
    flag = 0
    play.innerHTML = `<i class="ri-play-mini-fill"></i>`
    plflag = 0
    playlistcontainer.style.display = "none"
    plcontainerflag = 0
})
pl1card1.addEventListener("click", ()=>{
    getarr(2)
    rendernext(pl1)
    selectedsong = end - end
    main(playlist)
    duration()
    flag = 0
    play.innerHTML = `<i class="ri-play-mini-fill"></i>`
    plflag = 0
    playlistcontainer.style.display = "none"
    plcontainerflag = 0
})


// TO BE ADDED
// functions
//create playlist functionality also add later...linked list kinda system.(TO BE ADDED)
//modify this like do a playlists selection system to render dynamically in the main page...to swtich to next or prev playlist..but in the playlist section display all playlists.