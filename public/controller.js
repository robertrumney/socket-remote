//CONTROLLER PAGE JS
document.addEventListener('gesturestart', function (e) 
{
    e.preventDefault();
});

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

var portrait=false;

var changedToPortraitFromLandscape=false;

var isAppMode=window.navigator.standalone;

function ScaleElements()
{
	if(window.innerHeight > window.innerWidth)
	{
		//PORTAIT
		portrait=true;
		var reset = document.getElementById('reset_button');

		var WIDTH = window.innerWidth;
		var HEIGHT = window.innerHeight;

		var boost = document.getElementById('boost_button');

		var fwd = document.getElementById('right_button');
		var back = document.getElementById('left_button');

		var left = document.getElementById('acc_button');
		var right = document.getElementById('rev_button');

		reset.style.top=HEIGHT/3;

		left.style.width = WIDTH/2.5;
		left.style.height = WIDTH/2.5;

		right.style.width = WIDTH/2.5;
		right.style.height = WIDTH/2.5;
		right.style.top = WIDTH/2.2;

		boost.style.width = WIDTH/2.2;
		boost.style.height = boost.style.width;

		fwd.style.width = WIDTH/2.3;
		fwd.style.height = boost.style.width/2;

		back.style.width = fwd.style.width;
		back.style.height = boost.style.width/2;

	}
	else
	{
		portrait=false;
		//LANDSCAPE
		var reset = document.getElementById('reset_button');

		var WIDTH = window.innerHeight;
		var HEIGHT = window.innerWidth;

		var boost = document.getElementById('boost_button');

		var fwd = document.getElementById('right_button');
		var back = document.getElementById('left_button');

		var left = document.getElementById('acc_button');
		var right = document.getElementById('rev_button');

		left.style.width = WIDTH/2.5;
		left.style.height = WIDTH/2.5;

		right.style.width = WIDTH/2.5;
		right.style.height = WIDTH/2.5;

		boost.style.width = WIDTH/2.2;
		boost.style.height = boost.style.width;

		fwd.style.width = WIDTH/2.3;
		fwd.style.height = boost.style.width/2.5;

		back.style.width = fwd.style.width;
		back.style.height = boost.style.width/2.5;
	}

}

var playerName="";
var username="";

var socket = io
({
	transports: ['websocket']
});


function Flash()
{
	document.getElementById('flash').style.opacity=1;

	setTimeout(function() 
    {
		document.getElementById('flash').style.opacity=0;
	}, 100);
}

function Reset()
{
	window.location='';
}


var layout=0;

function ResetLayout()
{
	layout++;



	if(layout==122)
	{
		document.getElementById("reset_button").style.right="250px";
		// document.getElementById("reset_button2").
		document.getElementById("boost_button").style.right="180px";
		document.getElementById("acc_button").style.left="180px";
		document.getElementById("rev_button").style.left="180px";
	}

	if(layout==22)
	{
		document.getElementById("reset_button").style.right="250px";
		document.getElementById("boost_button").style.right="180px";
		document.getElementById("acc_button").style.left="180px";
		document.getElementById("rev_button").style.left="180px";

		document.getElementById("acc_button").style.transform = "rotate(90deg)";
		document.getElementById("rev_button").style.transform = "rotate(-270deg)";

		document.getElementById("left_button").style.transform = "rotate(90deg)";
		document.getElementById("right_button").style.transform = "rotate(-270deg)";

	}


	if(layout==1)
	{
		document.getElementById("reset_button").style.right="250px";
		document.getElementById("boost_button").style.right="180px";
		document.getElementById("acc_button").style.left="180px";
		document.getElementById("rev_button").style.left="180px";

		document.getElementById("acc_button").style.transform = "rotate(90deg)";
		document.getElementById("rev_button").style.transform = "rotate(-270deg)";

		document.getElementById("left_button").style.transform = "rotate(90deg)";
		document.getElementById("right_button").style.transform = "rotate(-270deg)";

		document.getElementById("left_button").style.left = "170px";
		document.getElementById("right_button").style.right = "170px";

	}

	if(layout>1)
	{

		document.getElementById("left_button").style.left = "10px";
		document.getElementById("right_button").style.right = "10px";

		document.getElementById("acc_button").style.transform = "rotate(0deg)";
		document.getElementById("rev_button").style.transform = "rotate(0deg)";
		document.getElementById("left_button").style.transform = "rotate(0deg)";
		document.getElementById("right_button").style.transform = "rotate(0deg)";

		document.getElementById("boost_button").style.right="10px";
		document.getElementById("reset_button").style.right="70px";
		document.getElementById("acc_button").style.left="10px";
		document.getElementById("rev_button").style.left="10px";
		layout=0;
	}
}

function SelectCar(carName)
{	
	username = carName;
	socket.emit('add user', carName);

	$('#loginPage').hide()
	$('#playPage').show()

	socket.emit('enterGame', { user: playerName, direction: playerName });
}

function Start()
{
	if(document.getElementById('name_input').value=="")
	{
		alert("Please enter in your name!");
		return;
	}
	
	document.getElementById('landing_page').style.display="none";
	document.getElementById('car_buttons').style.display="block";

	localStorage.setItem("userNaam",document.getElementById('name_input').value);

	playerName = document.getElementById('name_input').value;
	
	document.body.requestFullscreen();
}

$(document).ready(function() 
{
	window.scrollTo(0,1);

	var naam = localStorage.getItem("userNaam");

	if(naam!=null)
	{
		document.getElementById('name_input').value = naam;
	}

	ScaleElements();

	socket.emit('openPage',"wut");

	socket.on('client set score', (data) => 
	{
		var userData = JSON.parse(data);
		$.get( "https://mustardinteractive.co.za/MTN_wheels/api/update_score.php?username="+playerName+"&score="+userData.score, function( data ) {});
	});

	socket.on('user left', (data) => 
	{
		var userData = JSON.parse(data);	

		if(userData.username === username)
		{
			$.get( "https://mustardinteractive.co.za/MTN_wheels/api/update_score.php?username="+playerName+"&score="+userData.score, function( data ) {});
		}

		if(userData.username === "1")
		{
			document.getElementById("car_1").style.opacity="1.0";
			document.getElementById('car_1').onclick = function() { SelectCar('1') };
		}

		if(userData.username === "2")
		{
			document.getElementById("car_2").style.opacity="1.0";
			document.getElementById('car_2').onclick = function() { SelectCar('2') };
		}

		if(userData.username === "3")
		{
			document.getElementById("car_3").style.opacity="1.0";
			document.getElementById('car_3').onclick = function() { SelectCar('3') };
		}

		if(userData.username === "4")
		{
			document.getElementById("car_4").style.opacity="1.0";
			document.getElementById('car_4').onclick = function() { SelectCar('4') };
		}

		if(userData.username === "5")
		{
			document.getElementById("car_5").style.opacity="1.0";
			document.getElementById('car_5').onclick = function() { SelectCar('5') };
		}

		if(userData.username === "6")
		{
			document.getElementById("car_6").style.opacity="1.0";
			document.getElementById('car_6').onclick = function() { SelectCar('6') };
		}

		if(userData.username === "7")
		{
			document.getElementById("car_7").style.opacity="1.0";
			document.getElementById('car_7').onclick = function() { SelectCar('7') };
		}

		if(userData.username === "8")
		{
			document.getElementById("car_8").style.opacity="1.0";
			document.getElementById('car_8').onclick = function() { SelectCar('8') };
		}
	});

	socket.on('client get powerup', (data) => 
	{
		var userData = JSON.parse(data);

		if(userData.username === username)
		{
			if(userData.score=="EMP")
				document.getElementById("boostIMG").src="art/emp.png";

			if(userData.score=="SHIELD")
				document.getElementById("boostIMG").src="art/shield.png";

			if(userData.score=="REPAIR")
				document.getElementById("boostIMG").src="art/repair.png";

			if(userData.score=="SWITCH")
				document.getElementById("boostIMG").src="art/switch.png";
		}
		
	});

	socket.on('client set color', (data) => 
	{
		var userData = JSON.parse(data);
		
		//PERFORM ONLY FOR SPECIFIED PLAYER [CHANGE PLAYERS CONTROLLER COLOR]
		if(userData.username === username)
		{
      //<---- User specific check

			var hex="";

			if(userData.username === "1")
			{
					hex="#036987";
			}

			if(userData.username === "2")
			{
					hex="#F4F4F2";
			}

			if(userData.username === "3")
			{
					hex="#4BC0ED";
			}

			if(userData.username === "4")
			{
					hex="#F57E20";
			}

			if(userData.username === "5")
			{
					hex="#E4256E";
			}

			if(userData.username === "6")
			{
					hex="#663F5C";
			}

			if(userData.username === "7")
			{
					hex="#FFCB0A";
			}

			if(userData.username === "8")
			{
					hex="#87B08C";
			}

			document.getElementById("boost_button").style.backgroundColor=hex;
			document.getElementById("reset_button").style.backgroundColor=hex;
			document.getElementById("right_button").style.backgroundColor=hex;
			document.getElementById("left_button").style.backgroundColor=hex;
			document.getElementById("acc_button").style.backgroundColor=hex;
			document.getElementById("rev_button").style.backgroundColor=hex;

		}//<---- End user specific check

		if(userData.username === "1")
		{
				document.getElementById("car_1").style.opacity="0.4";
				document.getElementById('car_1').removeAttribute("onclick");
		}

		if(userData.username === "2")
		{
				document.getElementById("car_2").style.opacity="0.4";
				document.getElementById('car_2').removeAttribute("onclick");
		}

		if(userData.username === "3")
		{
				document.getElementById("car_3").style.opacity="0.4";
				document.getElementById('car_3').removeAttribute("onclick");
		}

		if(userData.username === "4")
		{
				document.getElementById("car_4").style.opacity="0.4";
				document.getElementById('car_4').removeAttribute("onclick");
		}

		if(userData.username === "5")
		{
				document.getElementById("car_5").style.opacity="0.4";
				document.getElementById('car_5').removeAttribute("onclick");
		}

		if(userData.username === "6")
		{
				document.getElementById("car_6").style.opacity="0.4";
				document.getElementById('car_6').removeAttribute("onclick");
		}

		if(userData.username === "7")
		{
				document.getElementById("car_7").style.opacity="0.4";
				document.getElementById('car_7').removeAttribute("onclick");
		}

		if(userData.username === "8")
		{
				document.getElementById("car_8").style.opacity="0.4";
				document.getElementById('car_8').removeAttribute("onclick");
		}

	});

	$('#boost_button').on('touchstart', function()
	{
		socket.emit('action', { user: username, direction: 'boost' });
		document.getElementById("boostIMG").src="art/boost.png";
	});

    $('#right_button').on('touchstart', function()
	{
		socket.emit('action', { user: username, direction: 'acc_down' });
	});

	$('#right_button').on('touchend', function()
	{
		socket.emit('action', { user: username, direction: 'acc_up' }); 
	});

	$('#left_button').on('touchstart', function()
	{
		socket.emit('action', { user: username, direction: 'rev_down' }); 
	});

	$('#left_button').on('touchend', function()
	{
		socket.emit('action', { user: username, direction: 'rev_up' }); 
	});

	$('#acc_button').on('touchstart', function()
	{
		socket.emit('action', { user: username, direction: 'turnL_down' });
	});

	$('#acc_button').on('touchend', function()
	{
		socket.emit('action', { user: username, direction: 'turnL_up' }); 
	});

	$('#rev_button').on('touchstart', function()
	{
		socket.emit('action', { user: username, direction: 'turnR_down' }); 
	});

	$('#rev_button').on('touchend', function()
	{
		socket.emit('action', { user: username, direction: 'turnR_up' });
	});

	var lastTouchEnd = 0;
	document.addEventListener('touchend', function (event) 
	{
	
		var now = (new Date()).getTime();
		
		if (now - lastTouchEnd <= 300) 
		{
			event.preventDefault();
		}
		lastTouchEnd = now;
	
	}, 
	false);

});
