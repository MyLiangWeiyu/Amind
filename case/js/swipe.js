window.addEventListener("load",function(){
	let swipeItem = document.getElementById("swipe-item");
	let lis = swipeItem.getElementsByTagName("li");
	
	//计数
	let index=0;
	let Width=lis[0].offsetWidth;
	let claer=null;
	claer = setInterval(function(){
		swipeItem.style.left=-(Width*index)+"px";
		index++;
		if(index>lis.length-1){
			index=0;
		}
	},1000)
	//鼠标移入事件
	swipeItem.onmouseenter=function(){
		clearInterval(claer)
	}
	//鼠标移出事件
	swipeItem.onmouseleave=function(){
		clearInterval(claer)
		claer = setInterval(function(){
			swipeItem.style.left=-(Width*index)+"px";
			index++;
			if(index>lis.length-1){
				index=0;
			}
		},2000)
	}
})