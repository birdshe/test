﻿var roadMap=new Array(); //Map 是個三維陣列，在Main裡初始化
var roleMap=new Array(); //這個 Map 是個二維陣列，找路徑時用到
var clickedItemId;
var tmpWindow;


var Items={
	'rock1':{id: 1, img:'./Image/Map/rock1.png', funct:normalItemEvent},
	'rock2':{id: 2, img:'./Image/Map/rock2.png', funct:normalItemEvent},
	'township':{id: 3, img:'./Image/Map/township.png', funct:townshipItemEvent},
	'chicken':{id:4, img:'./Image/Map/chicken.png', funct:chickenItemEvent},
	'ncyu':{id:5, img:'./Image/Map/ncyu.png', funct:ncyuItemEvent},
	'platform1':{id: 6, img:'./Image/Map/platform1.png', funct:normalItemEvent},
	'platform2':{id: 7, img:'./Image/Map/platform2.png', funct:normalItemEvent},
	'brick':{id: 8, img:'./Image/Map/brick.png', funct:normalItemEvent},
	'coat':{id: 9, img:'./Image/Map/coat.png', funct:coatItemEvent},
	'pavilion':{id: 10, img:'./Image/Map/pavilion.png', funct:pavilionItemEvent},
	'waterfall':{id: 11, img:'./Image/Map/waterfall.png', funct:waterfallItemEvent},
	'house':{id: 12, img:'./Image/Map/house.png', funct:houseItemEvent}
};
/*
*************
item function
*************
*/
function normalItemEvent(event){
	event.stopPropagation();
}

function chickenItemEvent(event){
	event.stopPropagation();
	clickedItemId=4;
	if(isRoleAround()){
		alert('我們在騎車的路上有看到一堆雞');
		tmpWindow=window.open('https://drive.google.com/file/d/1sRRZMIzqvLb2tuWo9gX0aEgMlB_c4MrR/view?usp=sharing', '雞', 100, 100);
		
		let intervalId=setInterval(()=>{
			if(tmpWindow.window === null){
				clearInterval(intervalId);
				alert('更多雞跟一隻狗狗');
				window.open('https://drive.google.com/file/d/1JmLwa1unRoPRpopR7n-kuKZxdGrCk_7n/view?usp=sharing', '還有火雞跟狗', 100, 100);
			}
		}, 1000);
	}
}

function townshipItemEvent(){
	event.stopPropagation();
	clickedItemId=3;
	if(isRoleAround()){
		alert('我們的第一站，番路鄉公所');
		tmpWindow=window.open('https://drive.google.com/file/d/13zR4xJTRSfsSUE20jxXHWRIf0L82r7vh/view?usp=sharing', '鄉公所', 100, 100);

		let intervalId=setInterval(()=>{
			if(tmpWindow.window === null){
				clearInterval(intervalId);
				alert('還有一張圖');
				window.open('https://drive.google.com/file/d/1-SiBfGjCOTvLj7X1SllNMgFUYTbUD42-/view?usp=sharing', '鄉公所', 100, 100);
			}
		}, 1000);
	}
}

function ncyuItemEvent(event){
	event.stopPropagation();
	clickedItemId=5;
	if(isRoleAround()){
		alert('嘉大，我們的出發點');
	}
}

function coatItemEvent(){
	event.stopPropagation();
	clickedItemId=9;
	alert('良心建議，去山上真的要記得帶外套，不然會冷爆');
}

function pavilionItemEvent(){
	event.stopPropagation();
	clickedItemId=10;
	if(isRoleAround()){
		alert('半天岩觀景台，我們在山路騎到一半時有在這裡看一下，回程時也有在這裡休息');
		tmpWindow=window.open('https://drive.google.com/file/d/1WVRk4fzpupK6PC6ZR5dY1kIwFfJBIK-K/view?usp=sharing', '我們的照片', 100, 100);
		
		let intervalId=setInterval(()=>{
			if(tmpWindow.window === null){
				clearInterval(intervalId);
				alert('這是眺望的影片');
				window.open('https://drive.google.com/file/d/1a-ch5Cc7PZoxc-Ix96MsY4QTNjGbw3ru/view?usp=sharing', '眺望', 100, 100);
			}
		}, 1000);
	}
}

function waterfallItemEvent(){
	event.stopPropagation();
	clickedItemId=11;
	alert('我們走得半死後，終於到達那該死的瀑布');
	scrollToNextLayer();
}

function houseItemEvent(){
	event.stopPropagation();
	clickedItemId=12;
	if(isRoleAround()){
		alert('Google 的導航好像有點問題，我們卡在一個地方，不確定要往哪走，還有去問住附近的人。來回亂晃');
		window.open('https://drive.google.com/file/d/1biDZ7dGfQMXOAZei_m0ADyNY-feWf0Ss/view?usp=sharing', '找路', 100, 100);
	}
}

/*
*************
item function
*************
*/

function isRoleAround(){
	if(roleX+1 < 20)
		if(roadMap[currentLayer][roleY][roleX+1] === clickedItemId) return true;
	if(roleX-1 >= 0)
		if(roadMap[currentLayer][roleY][roleX-1] === clickedItemId) return true;
	if(roleY+1 < 10)
		if(roadMap[currentLayer][roleY+1][roleX] === clickedItemId) return true;
	if(roleY-1 >= 0)
		if(roadMap[currentLayer][roleY-1][roleX] === clickedItemId) return true;
	
	return false;
}

function removeItem(){
	for(let i=this.tmpy; i < this.tmpy+this.tmph; i++){
		for(let j=this.tmpx; j < this.tmpx+this.tmpw; j++){
			roadMap[currentLayer][i][j]=0;
		}
	}
	
	adventureDivs[currentLayer].removeChild(this);
}

function setItem(layer, x, y, w, h, item){
	//layer 層, x y 位置, w h 寛高(幾個 BasicW H), 什麼東西(Items)
	let tmpImg=document.createElement('img');
	
	tmpImg.style.position='absolute';
	tmpImg.src=item.img;
	tmpImg.style.userSelect='none';
	tmpImg.style.userDrag='none';
	tmpImg.style.width=BasicW*w+'px';
	tmpImg.style.height=BasicH*h+'px';
	tmpImg.style.top=(adventureTds[layer].offsetTop+adventureDivs[layer].offsetTop+BasicH*y)+'px';
	tmpImg.style.left=(adventureTds[layer].offsetLeft+adventureDivs[layer].offsetLeft+BasicW*x)+'px';
	
	tmpImg.tmpx=x;
	tmpImg.tmpy=y;
	tmpImg.tmpw=w;
	tmpImg.tmph=h;
	
	for(let i=y; i < y+h; i++){
		for(let j=x; j < x+w; j++){
			roadMap[layer][i][j]=item.id;
		}
	}
	
	adventureDivs[layer].appendChild(tmpImg);
	tmpImg.addEventListener('click', item.funct);
}