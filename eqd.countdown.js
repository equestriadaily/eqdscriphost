function generatecountdown(list,div)
{
	for(var i=0;i<list.length;i++)
	{
		var datearray=list[i][1].match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})(?:\s([+-]\d\.\d))?$/);
		if(!datearray)throw new Error("timeformat error, must be [yyyy-mm-dd hh:mm] or [yyyy-mm-dd hh:mm +-d.d]");
		if(list[i][2]=="et")list[i][1]=timef_et(parseInt(datearray[1],10),parseInt(datearray[2],10),parseInt(datearray[3],10),parseInt(datearray[4],10),parseInt(datearray[5],10),datearray[6]);
		else if(list[i][2]=="utc")list[i][1]=timef_utc(parseInt(datearray[1],10),parseInt(datearray[2],10),parseInt(datearray[3],10),parseInt(datearray[4],10),parseInt(datearray[5],10),datearray[6]);
		else throw new Error("timezone must be 'utc' or 'et'");
	}
	list.sort(function(a,b){return a[1]-b[1]});

	parsecountdown(list,div);
}

function parsecountdown(list,div)
{
	var countdown=document.getElementById(div);
	var timestamp=Date.now();
	for (var i = 0; i < list.length; i++)if(timestamp<list[i][1])
	{
		var t = list[i][1] - timestamp;
		if(t<=3600000 && countdown.className!='soon')countdown.className='soon';
		if(t>3600000 && countdown.className!='')countdown.className='';
		var seconds = Math.floor( (t/1000) % 60 );
		var minutes = Math.floor( (t/1000/60) % 60 );
		var hours = Math.floor( (t/(1000*60*60)) % 24 );
		var days = Math.floor( t/(1000*60*60*24) );
		countdown.innerHTML=list[i][0]+"<br><span>"+days+"</span><sup>D</sup><span>"+hours+"</span><sup>H</sup><span>"+minutes+"</span><sup>M</sup><span>"+seconds+"</span><sup>S</sup>";
		setTimeout(function(){parsecountdown(list,div)},1000);return;
	}
	countdown.className='expired';
	countdown.innerHTML='No-Count';
}

function timef_et(year,month,date,hour,minute)
{
	month--;
	var utc = Date.UTC(year,month,date,hour+5,minute,0,0);
	var d = new Date(utc);

	var startDST = new Date(Date.UTC(year,2,1,2+5,0,0,0));
	var dayDST = startDST.getUTCDay();
	if(dayDST != 0){startDST.setUTCDate(15-dayDST)}
	else{startDST.setUTCDate(8)}

	var endDST = new Date(Date.UTC(year,10,1,2+4,0,0,0));
	var dayDST = endDST.getUTCDay();
	if(dayDST != 0){endDST.setUTCDate(8-dayDST)}
	else{endDST.setUTCDate(1)}

	if(d >= startDST && d < endDST)return utc-3600000; //dst
	else return utc;
}

function timef_utc(year,month,date,hour,minute,offset)
{
	month--;
	offset=(offset ? Math.floor(offset*60) : 0);
	var utc = Date.UTC(year,month,date,hour,minute-offset,0,0);
	return utc;
}
