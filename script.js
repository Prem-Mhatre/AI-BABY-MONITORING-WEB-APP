alarm = "";
objects = [];
status = "";
function preload(){
    alarm = loadSound("a.mp3");
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    document.getElementById("status").innerHTML = "Status: Detecting Objects"; 
    object_detector = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded(){
    console.log("cocossd model is loaded");
    status = true;
    object_detector.detect(video, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);

        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status){
        object_detector.detect(video, gotResults);
        for(i = 0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            if(objects[i].label == "person"){
                document.getElementById("baby_status").innerHTML = "Baby Is Detected";
                alarm.stop();
            }
            else{
                document.getElementById("baby_status").innerHTML = "Baby Is Not Detected"
                alarm.play();
            }

            r = Math.floor(Math.random() * 255);
            g = Math.floor(Math.random() * 255);
            b = Math.floor(Math.random() * 255);
            fill(r,g,b);
            text(objects[i].label + " " + floor(objects[i].confidence * 100) + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}