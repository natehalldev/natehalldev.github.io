var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll('.square');
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var h1 = document.querySelector('h1');
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var reason = -1;
var reasonText = ["1.  I'm a Strengths-based Team Player.", 
"2.  I'm Passionate About Efficiency.",
"3.  I'm a Creative Problem Solver.",
"4.  I'm Always Learning New Things.",
"5.  I'm a Community Builder.",
"6.  I Can Manage Multifaceted Projects."
];
var img = document.querySelectorAll('.square');
var reasonTextLong = ["I am always learning new things -       I am currently enrolled in Zip Code Wilmington, an intensive, full-stack software development boot camp focused on Java.  After being selected from over 350 applicants, I am currently working over 80 hours per week collaborating on group projects while gaining experience in Java, SQL, Spring Boot, Angular, JavaScript, Test Driven Development and Agile Scrum methodologies.", 
"I am a Strengths-based Team Player -  I always try to involve the quietest person in the room as everyone can succeed when they are heard and properly aligned with their strongest skills.  My experience in event coordination and as a performer allows me to quickly engage diverse groups of people, collaborate as part of a team, or manage projects independently.", 
"I am Passionate about Efficiency -  I constantly strive to create a systemic workflow so that my daily efforts can focus on the necessary client-specific customization.  Clarity and concision are my specialty, and particularly serve me well in my software development efforts.  Fun Fact - Even in my personal life, I am all about maximizing resources.  According to CVS, I am in the top 1% of Savers in Pennsylvania!  #EfficientProficient",
"I am a Creative Problem Solver -  I mean, check out this website! ;)  I am constantly looking for what Wil Reynolds describes as the next 'orange tape' idea.  Innovation happens when flexible minds are matched with meaningful data to meet the needs of the user.  Creative thinkers are imperative to successfully navigating our ever-changing digital world.",
"I am a Community Builder -  In support of an $11.5 million community restoration initiative, I launched an online music series called 'Lansdowne Theater Presents' to raise awareness about the project while highlighting talented musicians from the region.  I will continue to be a constant advocate in a volunteer capacity for the Historic Lansdowne Theater Corporation as we work to revitalize the community through the Arts.",
"I Can Manage Multifaceted Projects -  As an experienced performer with over 1,000 shows under my belt, I have no problem executing under pressure.  As a business partner, I have developed and implemented a multifaceted strategic plan to grow the business through social media marketing, fan cultivation, and sponsorship.  In fact, I grew my previous band's Instagram following by nearly 1000% in 2 years."
]


init();

function init(){

	setupModeButtons();
	setupSquares();
	reset();
}

function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		//mode buttons Event Listeners
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;

			reset();

		});
	}
}

function setupSquares(){
	for(i = 0; i < squares.length; i++){
		//add click listeners to squares
		//Reset Reason Text Long normal copy
				

		squares[i].addEventListener("click", function(){

			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;


			//compare color to pickedColorDisplay
			if(clickedColor === pickedColor){

				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				//Change button to say 'Play Again'
				resetButton.textContent = "***Click Here for Another Reason***";
				
				
				if(reason >= 6){
					reason = 0;
				}

				colorDisplay.classList.add("normal");
				colorDisplay.innerHTML = "Reason #" + (reason + 1) + ": " + reasonTextLong[reason];

				
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
				
			}
		});
	}
}



function reset(){
	
	if(reason >= 6){
		reason = -1;
	}
	
	reason++;
	if(reason >= 6){
		reason = 0;
	}
	
	
	colors = generateRandomColors(numSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = reasonText[reason];/*pickedColor;*/
	//Change button to say 'New Colors'
	resetButton.textContent = "Next Reason";
	//message back to nothing
	messageDisplay.textContent = "";

	//change colors of squares
	for(i = 0; i < squares.length; i++){
		if(colors[i]){
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	
	}
	//Change background of h1
	h1.style.backgroundColor = "#268a96";
	
	

}


resetButton.addEventListener("click", function(){
	reset();

})






function changeColors(color){
	//loop through all the squares
	for(var i = 0; i < squares.length; i++){
		//change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num){
	//make an array
	var arr = [];
	//repeat num times
	for(var i = 0; i < num; i++){
		//get random color and push into array
		arr.push(randomColor());
		
	}
	//return that array
	return arr;
}

function randomColor(){
	//pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256);
	//protect from color extremes
	if(r > 200 && g > 200) {
		var b = Math.floor(Math.random() * 80);
	}
	if(r < 30 && g < 30) {
		var b = (Math.floor(Math.random() * 150)) + 100;
	}
	// if(r > 175) {
	// 	var b = (Math.floor(Math.random() * 100)) + 155;
	// }
	//return string of RGB
	return "rgb(" + r + ", " + g + ", " + b + ")"
}