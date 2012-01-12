xbkNode.all=[];
function xbkNode(id,text,img,imgOver,imgDown,fHandler,parent){
	xbkNode.all[id]=this;
	this.id=id||null;
	this.parent=parent||null;
	this.text=text||"";
	this.img=img||null;
	this.imgOver=imgOver||null;
	this.imgDown=imgDown||null;
	this.fHandler=fHandler||null;
	this.userDefineOnclickFunc=null;
	this.userDefineOnmouseoverFunc=null;
	this.userDefineOnmouseoutFunc=null;
}
