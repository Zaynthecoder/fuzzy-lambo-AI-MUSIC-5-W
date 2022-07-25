song1 = "peterpan.mp3";
song2 = "harrypotter.mp3";
scoreLeftWrist =  0;
scoreRightWrist = 0;
status1 = "";
status2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("peterpan.mp3");
    song2 = loadSound("harrypotter.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on('pose', gotPoses)
}

function modelLoaded() {
    console.log("posenet model has been loaded yay")

}

function draw() {
    image(video,0,0,600,500);
    fill("#0000FF")
    stroke("#0000FF")


    status1 = song1.isPlaying();
	status2 = song2.isPlaying();


    if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song1.stop();

		if(status2 == false)
		{
			song2.play();
			document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
		}
	}

    if(scoreRightWrist > 0.2)
	{
		circle(rightWristX,rightWristY,20);

			song2.stop();

		if(status1 == false)
		{
			song1.play();
			document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
		}
	}
}


function gotPoses(results) {
    if(results.length >0) {

        console.log(results);

        // score stuff 
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        //console.log("score left wrist is equal to "+  scoreLeftWrist);
        //console.log("scoreright wrist is equal to "+ scoreRightWrist);


        
        //geting location of left wrist
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
         //console.log("LeftWristX position is: " + leftWristX + "and left wrist Y position is: " + leftWristY );


         //getting location of right wrist
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
         //console.log("RightWristX position is: " + rightWristX + "and right wrist Y position is: " + rightWristY );




    }
}


//done 
//lambo
//ferrari
//bugatti
//aston martin
//mclaren