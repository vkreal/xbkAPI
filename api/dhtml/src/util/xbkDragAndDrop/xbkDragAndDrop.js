/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */


/**
 *  xbkAPI
 *	xbkDragAndDrop
 *	
 *	This xbkDragAndDrop class handles the drag and drop event for the xbkAPI Class Object.
 *
 *	@author		xbkapi			xbkapi@yahoo.com
 *	@example	exampleTitle		pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.0
 *	@extends	xbkObject
 *	@constructor	xbkDragAndDrop
 */
xbkDragAndDrop.all=[];
function xbkDragAndDrop() {
	this.superClass=xbkObject;
   	this.superClass("xbkDragAndDrop");
	this.source=[];
	this.detect=false;
	this.curTarget=null;
	this.targetDropFunc=null;
	this.targetOverFunc=null;
	this.targetOutFunc=null;
	this.startDragFunc=null;
	this.targets=[];
	this.startX=0;
	this.startY=0;
	this.selectItem=null;
	this.bUseImageDragIcon = false;
	
/**
 *	setDragIconBgColor
 *
 *	Set the icon drag background color.
 *
 *	@public
 * 	@param 	sColor	String color to be use.
 *	@return	None
 *	
 */
	
	function setDragIconBgColor(sColor){
		this.dragIconLayer.setBgColor(sColor);
	}
	this.setDragIconBgColor=setDragIconBgColor;
/**
 *	setUseImageAsDragIcon
 *
 *	Use the image as the drag icon.
 *
 *	@public
 * 	@param 	bSet	Boolean
 *	@return	None
 *	
 */
	function setUseImageAsDragIcon(bSet){
		this.bUseImageDragIcon=bSet;
	}
	this.setUseImageAsDragIcon=setUseImageAsDragIcon;
/**
 *	setSelectItem
 *
 *	Set the select item.
 *
 *	@public
 * 	@param 	node	Variant
 *	@return	None
 *	
 */
	function setSelectItem(node){
		this.selectItem=node;
	}
	this.setSelectItem = setSelectItem;
	
	function getSelectItem(){
		return this.selectItem;
	}
	this.getSelectItem=getSelectItem;	

	this.dragIconLayer = new xbkLayer();
	with (this.dragIconLayer) {
		setLeft(0);
		setTop(0);
		setWidth(25);
		setHeight(25);			 
		setVis("hidden");
		//setBgColor(this.iconDragBgColor);
		setBorderLeft( 1,"black");
		setBorderTop( 1,"black");
		setBorderBottom( 1,"black");
		setBorderRight( 1,"black");
		setZIndex(100);
	}

	function disableDrag() {
		if(xbkDragAndDrop.selected == null)return;
		if(ns4){document.releaseEvents(Event.MOUSEUP|Event.MOUSEMOVE);}
		xbkDragAndDrop.selected.dragIconLayer.setVis("hidden");	
		document.onmouseup=null;
		document.onmousemove=null;
		if (xbkDragAndDrop.selected.curTarget) {
			if (xbkDragAndDrop.selected.targetDropFunc) {
				xbkDragAndDrop.selected.targetDropFunc(xbkDragAndDrop.selected , xbkDragAndDrop.selected.curTarget);
			}
		}
		xbkDragAndDrop.selected=null;
		this.selectItem=null;
	}
	this.disableDrag=disableDrag;
	function setDropTargetFunc(func) {
		this.targetDropFunc=func;
	}
	this.setDropTargetFunc=setDropTargetFunc;

	function setStartDragFunc(func) {
		this.startDragFunc=func;
	}
	this.setStartDragFunc=setStartDragFunc;

	function setOverTargetFunc(func) {
		this.targetOverFunc=func;
	}
	this.setOverTargetFunc=setOverTargetFunc;
	function setOutTargetFunc(func) {
		this.targetOutFunc = func;
	}
	this.setOutTargetFunc=setOutTargetFunc;	
	function setDragIcon (dragIconLayer) {
		this.dragIconLayer = dragIconLayer;
	}
	this.setDragIcon=setDragIcon;

	function addDragSource(source){
		this.source[this.source.length]=source;
		xbkDragAndDrop.all[source.layer.id]=this;
		source.setEvent("onmouseup", xbkDragAndDrop_onmouseup);
		source.setEvent("onmousedown", xbkDragAndDrop_onmousedown);
		source.setEvent("onmouseover", xbkDragAndDrop_onmouseover);
		source.setEvent("onmouseout", xbkDragAndDrop_onmouseout);				
		source.setEvent("onmousemove", xbkDragAndDrop_onmousemove);
	}
	this.addDragSource=addDragSource;
	function addTarget(xbkLayerTarget) {
		this.targets[xbkLayerTarget.layer.id]=xbkLayerTarget;
	}
	this.addTarget=addTarget;
	function dragOverTarget(event,target) {
		this.curTarget = target;
		if (this.targetOverFunc) {
			this.targetOverFunc(this,target);
		}
	}
	this.dragOverTarget = dragOverTarget;
	function dragOutTarget(event,target) {
		if (!this.curTarget) return;
		if (this.targetOutFunc) {
			this.targetOutFunc(this,target);
		}
		this.curTarget = null;
	}
	this.dragOutTarget = dragOutTarget;
	function onmouseup(event) {
		this.detect = false;
		this.disableDrag();
	}
	this.onmouseup = onmouseup;
	function onmousedown(event) {
		this.detect = true;
	}
	this.onmousedown = onmousedown;
	function sourceMouseOver(event) {
	}
	this.sourceMouseOver = sourceMouseOver;
	function onmouseout(event) {
	}
	this.onmouseout = onmouseout;
	function onmousemove(event) {
		if (this.detect) {
			this.detect = false;
			xbkDragAndDrop_EnableDrag(event,this);
		}
	}
	this.onmousemove = onmousemove;
	function findCoord(event){
		var curX=0;
		var curY=0;
		if (ns4||ns6) {
			curX = event.pageX;
			curY = event.pageY;
		}
		else {
			curX = event.clientX + document.body.scrollLeft;
			curY = event.clientY + document.body.scrollTop;		
		}
		return [curX,curY];
	}
	this.findCoord=findCoord;
}
xbkDragAndDrop.prototype=new xbkObject;
xbkDragAndDrop.selected=null;
function xbkDragAndDrop_onmouseup(event) {
	if (ie){event=window.event;}
	if (ns4){routeEvent(event);}
	xbkDragAndDrop.all[this.id].onmouseup(event);
}
function xbkDragAndDrop_onmousedown(event) {
	if (ie){event=window.event;}
	if (ns4){routeEvent(event);}
	xbkDragAndDrop.all[this.id].onmousedown(event);
}
function xbkDragAndDrop_onmouseover(event){
	if (ie){event=window.event;}
	if (ns4){routeEvent(event);}
	xbkDragAndDrop.all[this.id].onmousemove(event);
}
function xbkDragAndDrop_onmouseout(event){
	if (ie) {event=window.event;}
	if (ns4) {routeEvent(event);}
	xbkDragAndDrop.all[this.id].onmouseout(event);
}
function xbkDragAndDrop_onmousemove(event){
	if (ie) {event = window.event;}
	if (ns4) {routeEvent(event);}
	xbkDragAndDrop.all[this.id].onmousemove(event);
}
function xbkDragAndDrop_EnableDrag(event,source) {
	xbkDragAndDrop.selected = source;
	xbkDragAndDrop.selected.curTarget = null;
	if (ns4){document.captureEvents(Event.MOUSEUP|Event.MOUSEMOVE);}
	if (xbkDragAndDrop.selected.startDragFunc) {xbkDragAndDrop.selected.startDragFunc(xbkDragAndDrop.selected, event);}
	document.onmouseup = xbkDragAndDrop_DisableDrag;
	document.onmousemove = xbkDragAndDrop_MouseMove;
}
function xbkDragAndDrop_DisableDrag() {
	if(xbkDragAndDrop.selected){xbkDragAndDrop.selected.disableDrag();}
}
function xbkDragAndDrop_MouseMove(event){
	if(xbkDragAndDrop.selected){if(!xbkDragAndDrop.selected.selectItem){return;}}
	(ie)?event=window.event:null;	
	var newLeft=0;
	var newTop=0;
	if (ns4||ns6) {
		newLeft=event.pageX;
		newTop=event.pageY;
	}
	else {
		newLeft=event.clientX+document.body.scrollLeft;
		newTop=event.clientY+document.body.scrollTop;
	}
	var dragIcon=xbkDragAndDrop.selected.dragIconLayer;
	dragIcon.setLeft(newLeft);
	dragIcon.setTop(newTop);
	dragIcon.setVis("show");
	if(xbkDragAndDrop.selected.bUseImageDragIcon){
		dragIcon.setInnerHTML("<img src='"+xbkDragAndDrop.selected.selectItem.img+"'>");
	}
	//dragIcon.setInnerHTML(xbkDragAndDrop.selected.selectItem.text);
	if (xbkDragAndDrop.selected) {
		var left;
		var right;
		var top;
		var bottom;
		var target=null;
		var found=false;
		for (var i in xbkDragAndDrop.selected.targets) {
			left=0;
			right=0;
			top=0;
			bottom=0;
			target=xbkDragAndDrop.selected.targets[i];
			var cur=target.getParent();
			while(cur) {
				left+=cur.getLeft();
				right+=left+cur.getWidth();
				top+=cur.getTop();
				bottom+=top+cur.getHeight();
				cur=cur.getParent();
			}
			left+=target.getLeft();
			right+=left+target.getWidth();
			top+=target.getTop();
			bottom+=top+target.getHeight();
			if ( newLeft >= left && newLeft <= right && newTop >= top && newTop <= bottom ) {found = true;break;}
		}
		if (found) {
			if (xbkDragAndDrop.selected.curTarget==null) {
				xbkDragAndDrop.selected.dragOverTarget(event,target);
			}
			else if (xbkDragAndDrop.selected.curTarget!=target) {
				xbkDragAndDrop.selected.dragOutTarget(event,xbkDragAndDrop.selected.curTarget);
				xbkDragAndDrop.selected.dragOverTarget(event,target);
			}
		}
		else {
			if (xbkDragAndDrop.selected.curTarget) {
				xbkDragAndDrop.selected.dragOutTarget(event,xbkDragAndDrop.selected.curTarget);
			}
		}
	}	
}


