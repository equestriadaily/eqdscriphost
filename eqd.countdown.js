function generatecountdown(list,div)
{
	list.sort(function(a,b){return a[1]-b[1]});
	parsecountdown(list,div);
}

function parsecountdown(list,div)
{
	var countdown=document.getElementById(div);
	var timestamp=Date.now();
	var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
	for (var i = 0; i < list.length; i++)if(timestamp<list[i][1])
	{
		// Get today's date and time
		var now = new Date().getTime();
		var countDownDate = list[i][1];
		// Find the distance between now and the count down date
		var distance = countDownDate - now;
		if(distance<=3600000 && countdown.className!='soon')countdown.className='soon';
		if(distance>3600000 && countdown.className!='')countdown.className='';

		  // Time calculations for days, hours, minutes and seconds
		var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		//countdown.innerHTML=list[i][0]+"<br><span>"+days+"</span><sup>D</sup><span>"+hours+"</span><sup>H</sup><span>"+minutes+"</span><sup>M</sup><span>"+seconds+"</span><sup>S</sup>";
		setTimeout(function(){parsecountdown(list,div)},1000);return;
	}
	countdown.className='expired';
	countdown.innerHTML='No-Count';
}
