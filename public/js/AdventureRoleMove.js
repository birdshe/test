var targetX, targetY;
var roleX, roleY;
var isMoving=false;
var isLeft=true;
var rolePath;
var rolePathIndex;

const RoleAnimation={//���� Role ���ʵe
	isGoOn:false,
	ImageId:1,
	aniId:1,
	start:function(){
		let self=this;
		if(self.isGoOn === false){
			self.isGoOn=true;
			this.aniId=setInterval(function(){
				self.ImageId=(self.ImageId+1)%5 ? (self.ImageId+1)%5:5;
				roleImage.src=`./Image/Role/frame-${self.ImageId}.png`;
			},50);
		}
	},
	stop:function(){
		let self=this;
		if(self.isGoOn === true){
			self.isGoOn=false;
			clearInterval(self.aniId);
		}
	}
};

function findPath(){
	for(let i=0;i<10;i++){
		for(let j=0;j<20;j++){
			roleMap[i][j]=0;
		}
	}
	
	rolePath=new Array();
	rolePathIndex=0;
	rolePath.push({x:roleX, y:roleY});
	roleMap[roleY][roleX]=1;
	
	while( rolePathIndex >= 0){
		let tmpX=rolePath[rolePathIndex].x;
		let tmpY=rolePath[rolePathIndex].y;
		
		if(tmpY-1 >=0 && roleMap[tmpY-1][tmpX] === 0 && roadMap[currentLayer][tmpY-1][tmpX] === 0){
			rolePath.push({x:tmpX, y:tmpY-1});
			rolePathIndex++;
			roleMap[tmpY-1][tmpX]=1;
		}
		else if(tmpX+1 < 20 && roleMap[tmpY][tmpX+1] === 0 && roadMap[currentLayer][tmpY][tmpX+1] === 0){
			rolePath.push({x:tmpX+1, y:tmpY});
			rolePathIndex++;
			roleMap[tmpY][tmpX+1]=1;
		}
		else if(tmpY+1 < 10 && roleMap[tmpY+1][tmpX] === 0 && roadMap[currentLayer][tmpY+1][tmpX] === 0){
			rolePath.push({x:tmpX, y:tmpY+1});
			rolePathIndex++;
			roleMap[tmpY+1][tmpX]=1;
		}
		else if(tmpX-1 >= 0 && roleMap[tmpY][tmpX-1] === 0 && roadMap[currentLayer][tmpY][tmpX-1] === 0){
			rolePath.push({x:tmpX-1, y:tmpY});
			rolePathIndex++;
			roleMap[tmpY][tmpX-1]=1;
		}
		else{
			rolePath.pop();
			rolePathIndex--;
		}
	
		if(rolePathIndex < 0){
			return;
		}
		else if(rolePath[rolePathIndex].x === targetX && rolePath[rolePathIndex].y === targetY){
			return;
		}
	}
	
	
};

function setRole(x, y){
	roleX=x; roleY=y;
	roleImage.style.top=(BasicH*y)+"px";
	roleImage.style.left=(BasicW*x)+"px";
}

function walk(index){
	console.log(rolePath[index+1]);
	if(rolePath[index+1] === undefined){
		isMoving=false;
		RoleAnimation.stop();
		return;
	}
	
	let nowX=rolePath[index].x;
	let nowY=rolePath[index].y;
	let nextX=rolePath[index+1].x;
	let nextY=rolePath[index+1].y;
	
	if(nextX < nowX){
		roleImage.style.transform="scaleX(-1)";
	}
	else if(nextX < nowX){
		roleImage.style.transform="";
	}
	
	setTimeout(()=>{
		setRole(nextX, nextY);
		walk(index+1);
	}, 150);
}

function basicGoTo(x, y){
	if(isMoving === true) return;
	
	targetX=x;
	targetY=y;
	
	findPath();
	
	if(rolePathIndex < 0){
		return;
	}
	else{
		isMoving=true;
		RoleAnimation.start();
	}
	walk(0);
}