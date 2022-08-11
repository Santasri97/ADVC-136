var video = "";
var Status = "";
objects = [];

 function preload() {
    
 }

 function setup() {
    canvas = createCanvas(700, 550);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(700, 550);
    video.hide();
 }

  function draw() {
    image(video, 0, 0, 700, 550);

    if (Status != "") {
      for (i = 0; i < objects.length; i++) {
        document.getElementById("status").innerHTML = "Status : Object Detected";

        fill(r,g,b);
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       
        if(objects[i].label == "person")
        {
          document.getElementById("number_of_objects").innerHTML = "Object Found";
          console.log("stop");
          song.stop();
        }
        else
        {
          document.getElementById("number_of_objects").innerHTML = "Object not Found";
          console.log("play"); 
          song.play();
        }
       }
    } 
  }

  function start() {
    objectDetector = ml5.objectDetector('cocossd' ,modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    objects = document.getElementById("number_of_objects").value;

  }

  function modelLoaded() {
    console.log("Model is loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
  }

  function gotResults(error, results) {
    if (error) {
      console.log(error);
    }
    else {
      console.log(results);
      objects = results;
    }
  }


