const time_update_list=[];
const cntdown_update_list=[];
const cntdown_list=[60,59,58,57,56,55,55,54,53,52,51,50,49,48,47,46,45,44,43,42,41,40,39,38];
var i=0;
function updateTime() {
	var d=new Date((new Date).getTime()+288e5).toISOString().replace("T"," ");
	for(const item of time_update_list){
		//console.log(item)
			for(const element of document.querySelectorAll(item.selector))
				element.innerText=d.slice(item.start,item.end)
		
	}
	for(const item of cntdown_update_list){
		console.log(item)
		if(item.selector=="#_countd"){
			for(const element of document.querySelectorAll(item.selector)){
					element.innerText=cntdown_list[parseInt(i/2)];
			}
		}
	}
	i++;
}

function setDynamicTime(selector,start=0,end=19) {
	time_update_list.push({selector:selector,start,end})
	window.setInterval(updateTime,1e3)
}

function setDate(selector,start=0,end=19) {
	time_update_list.push({selector:selector,start,end})
}

function setCntDown(selector,start=17,end=19) {
		cntdown_update_list.push({selector,start,end})
}


	
function setStaticTime(selector,start=0,end=19,traceback_hours=0,traceback_range=0,filter=x=>x) {
	for(const element of document.querySelectorAll(selector)) {
		var hours=element.attributes["data-traceback-hours"]?.value? 
			parseFloat(element.attributes["data-traceback-hours"]?.value)+(Math.random()-.5)*parseFloat(element.attributes["data-traceback-range"]?.value||0)
			: traceback_hours+(Math.random()-.5)*traceback_range,hours=new Date((new Date).getTime()+288e5-3600*hours*1e3).toISOString().replace("T"," ");
			element.innerText=filter(hours.slice(start,end));
	}
}

const presetFilters= { 
			name:x=>2==x.length?x[0]+"*":x[0]+"*".repeat(x.length-2)+x.slice(-1),lastnameonly:x=>x[0]+"*".repeat(x.length-1),firstnameonly:x=>"*"+x.slice(1),lastcharonly:x=>"*".repeat(x.length-1)+x.slice(-1),idcard:(start=2,end=2,mask=18-start-end)=>x=>x.slice(0,start)+"*".repeat(mask)+x.slice(-end),phone:(start=3,end=4,mask=11-start-end)=>x=>x.slice(0,start)+"*".repeat(mask)+x.slice(-end)
					};

const fields={};

function addStorageField(id,selector,name,placeholder,filter=x=>x) {
	var elements= document.querySelectorAll(selector),
		selector= { selector:selector,placeholder:placeholder,filter:filter };

	id in fields? fields[id].push(selector):fields[id]=[selector];

	for(const element of elements) {
		element.innerText = filter( localStorage.getItem(id) || placeholder ), 
			element.addEventListener("click",
				/*click handle*/
				() => { 
					var res=window.prompt("修改"+name+"：",localStorage.getItem(id)||placeholder);
					""==res||null==res?localStorage.removeItem(id):localStorage.setItem(id,res);
					for(const _item of fields[id])
						for(const _element of document.querySelectorAll(_item.selector))
							_element.innerText=_item.filter(res||_item.placeholder)
					 } // end /*click handle*/
				)  //end element.addEventListener
	}
}

const nav_scroll = () => {
    document.querySelector(".nav") && window.addEventListener("scroll", () => {
        var percentage = Math.max(0, Math.min(window.pageYOffset / document.documentElement.clientHeight / .18, 1)),
            color = (document.querySelector(".nav").style.backgroundColor = `rgba(255, 255, 255, ${percentage})`, 255 - Math.ceil(255 * percentage));
        document.querySelector(".nav").style.color = `rgb(${color}, ${color}, ${color})`, document.querySelector(".nav > img") && (document.querySelector(".nav > img").style.filter = `brightness(${(1-percentage).toFixed(1)})`)
    })
};

function navigateHome() { 
	window.location.href = "/" 
}

function navigateToTripCard() { 
	window.location.href = "../trip-card/index.html" 
}

"complete" === document.readyState || "interactive" === document.readyState ? 
	setTimeout(nav_scroll, 1) : document.addEventListener("DOMContentLoaded", nav_scroll);