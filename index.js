//main script to add more functionality and debug

var arr = [
    { songName: "Jale 2", urL: "./songs/Jale 2.mp3", img: "./images/jale.jpg" },
    { songName: "Pehle Bhi main", urL: "./songs/Pehle Bhi Main.mp3", img: "./images/animal.jpg" },
    { songName: "Ram siya ram", urL: "./songs/Ram Siya Ram.mp3", img: "./images/ram.jpg" },
    { songName: "Arjan Valley", urL: "./songs/Arjan Vailly Ne.mp3", img: "./images/animal.jpg" },
    { songName: "Choo Lo", urL: "./songs/Choo Lo.mp3", img: "./images/choolo.png" },
    { songName: "vaaqif", urL: "./songs/Vaaqif.mp3", img: "./images/vaaqif.png" },
    { songName: "Dil Mere", urL: "./songs/Dil Mere.mp3", img: "./images/choolo.png" }


]

//side button to go fullscreen use the flwxbox and justify content space between

//next song and previous song using <> and add one restart key as well (add keyboard listners)
//add autoplay next feature
//toggle switch when autoplay on give sutom popup over that toggle switch
//dark theme light theme transition please
//implement deveb.co wala thing
// scroll should go to the song which is being currently played and fix the main overflow issue
//PAUSE KARLE POSTER IMAGE COLLAPSE SMALL SCALE HOVER WALA PLAY SCALE UP


// restart a song(done) a specific key(TBD) and a loop feature as well(done)
// draggable progresbar pls
// skip 10 seconds also add--CONTROVERSIAL
//something wrong with the dil mere song cant switch to the next playlist

var end = arr.length-1
var audio = new Audio()

var selectedsong = 0 
var poster = document.querySelector("#left")
var play = document.querySelector("#play")
var backward = document.querySelector("#backward")
var forward = document.querySelector("#forward")
var loop = document.querySelector("#loop")

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
},100);
}

function main () {
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
    // console.log(arr[selectedsong].urL)

    //dikkat dera kinda try to load all metadata first then render site and play forward backward do
    // fix 2moro (apna pehle click on a song card then clik on back or forward not working console error)
    audio.src = arr[selectedsong].urL
    document.querySelector("#all-songs").innerHTML = clutter
    poster.style.backgroundImage = `urL(${arr[selectedsong].img})`
}

main()
duration()



document.querySelector("#all-songs").addEventListener("click", (dets)=>{
    selectedsong = dets.target.id
    main()
    duration()
    audio.play()
    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    flag = 1

    // problem we have to press the spacebar twice after we click on the songcard fix

    //try function nesting
})

function progress(){
var winWidth = window.innerWidth;
var timer = setInterval(function(){
     document.getElementById('progress').style.width = audio.currentTime
                                                    / audio.duration
                                                    * winWidth +'px';
},100);


// stop the setInterval when song ended
audio.addEventListener('ended',function(){
    clearInterval(timer);
})};

var flag = 0
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


var loop_flag = 0;

loop.addEventListener("click", ()=>{
    console.log("i was clicked")
    loop_flag = 1
    loop.style.color = `white`
    while (loop_flag === 1) {
        if(audio.currentTime === audio.duration){
            audio.play()
            progress()
        }
        loop.addEventListener("click", ()=>{
            loop_flag = 0
            return
        })
    }


   



    // add the draggable functionality to the progress div and set the play with attribute as offset time
})




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



forward.addEventListener("click", ()=>{
    if (selectedsong == end){
        selectedsong = 0
    }else{
        selectedsong += 1
    }
    main()
    duration()

    audio.play()
    progress()

    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    flag = 1
})

backward.addEventListener("click", ()=>{
    if (selectedsong == 0){
        selectedsong = end
    }else{
        selectedsong -= 1
    }
    main()
    duration()

    audio.play()
    progress()

    play.innerHTML = `<i class="ri-pause-mini-fill"></i>`
    flag = 1
})


