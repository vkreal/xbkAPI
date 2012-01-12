/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */


/**
 *  	xbkAPI
 *	xbkIconBrowser
 *	
 *	The xbkIconBrowser Class creates a file view like look and feel tool for any xbkAPI web applications. 
 *
 *	@author		xbkapi		xbkapi@yahoo.com
 *	@example	exampleTitle	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	2.1
 *	@extends	xbkLayer
 *	@constructor	xbkIconView
 *      @param inst String	The name or id to be use for this xbkIconBrowser.
 *	@param parent xbkLayer	The parent of the xbkIconBrowser object if it has one.
 *
 */
xbkIconBrowser.all = [];
function xbkIconBrowser(inst, parent) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.inst=inst;
	this.contents = [];
	this.padding = 0;
	this.layer.style.overflow = "auto";
	xbkIconBrowser.all[inst]=this;
	this.selected	= null;
	this.highlightColor = "ghostwhite";

	this.xbkIconBrowser_setWidth = this.setWidth;
	
	function xbkIconBrowser_setWidth_OL(num){
		this.xbkIconBrowser_setWidth(num);
		this.draw();
	}
	this.setWidth = xbkIconBrowser_setWidth_OL;

	this.xbkIconBrowser_setHeight = this.setHeight;
	function xbkIconBrowser_setHeight_OL(num){
		this.xbkIconBrowser_setHeight(num);
		this.draw();
	}
	this.setHeight = xbkIconBrowser_setHeight_OL;

	/**
	 *	getSelectedNode
	 *	Get the current selected noe.
	 *	
	 *	@private
	 *	@return node
	 */
	function getSelectedNode(){
		return this.selected;
	}
	/**
	 *	removeALL
	 *	Remove all.
	 *	
	 *	@public
	 *	@return None
	 */
	function removeALL() {
		this.contents = [];
	}
	this.removeALL = removeALL;
	/**
	 *	setHighLightColor
	 *	Set the highlight selected color.
	 *	
	 *	@public
	 *	@param	color 	String Color to be use.
	 *	@return None
	 */
	function setHighLightColor(color){
		this.highlightColor=color;
	}	
	this.setHighLightColor = setHighLightColor;
	/**
	 *	addItem
	 *	Adds an icon to the xbkIconBrowser.
	 *
	 *	@public
	 *	@param id String icon id. 
	 *	@param text String Display name of the icon. 
	 *	@param img URL of the icon image to display. 
	 *	@param fHandler Reference A Function handler to be use by this icon. 
	 */
	function addItem(id, text,img,fHandler) {
		var node=new xbkNode(id,text,img,null,null,fHandler,this);
		//this.contents[this.contents.length] = {id:id,text:text,img:img,fHandler:fHandler};
		this.contents[this.contents.length]=node;
		this.draw();
	}
	this.addItem = addItem;

	function draw() {
		
		this.setInnerHTML("");
		var sHTML = "<table border='0' cellpadding='"+this.padding+"' cellspacing='0' ><tr>";
		var usedWidth	= 0;
		for (var i in this.contents) {
			var node = this.contents[i];
			if (this.getWidth()-usedWidth < 75){
				sHTML += "<tr>";
				usedWidth = 0;
			}
			sHTML += "<td align='middle' class='xbkIconBrowserStyle'>";
			sHTML += "<div id='"+node.id+"' align='center' ";
			sHTML += " onmouseover='javascript:xbkIconBrowser_onmouseover(this,\""+node.id+"\",\""+this.inst+"\");'";
			sHTML += " onmouseout='javascript:xbkIconBrowser_onmouseout(this,\""+node.id+"\",\""+this.inst+"\");'";
			sHTML += " onmousedown='javascript:xbkIconBrowser_onclick(this,\""+node.id+"\",\""+this.inst+"\");'";
			sHTML += ">";
			sHTML += "<img src='" + node.img + "'";
			sHTML += " >";
			sHTML += "<div align='center' ";
			sHTML += "><nobr>" + xbkUtil.elipsisName(node.text) + "</nobr>";
			sHTML += "</div>";
			sHTML += "</div>";
			sHTML += "</td>";
			if (this.getWidth()-usedWidth < 75){
				sHTML += "</tr>";
				usedWidth = 0;
			}
			usedWidth +=75;
		
		}
		sHTML += "</tr></table>\n";
		this.setInnerHTML(sHTML);
		// ns6 bug fix
		if (ns6) {
			this.setVis("hidden");
			this.setVis("show");
		}// end fix
		if(this.selected){
			this.selectIconById(this.selected.id);
		}
		
	}
	this.draw = draw;
	
	function findIconBrowserNodeById(id){
		for (var i in this.contents){
			var node = this.contents[i];
			if(id==node.id) { return node; }
		}
		return null;
	}
	this.findIconBrowserNodeById = findIconBrowserNodeById;
	/**
	 *	getSelectedId
	 *	Returns the id of the icon currently selected, null if none.
	 *
	 *	@public
	 *  	@return String
	 */
	function getSelectedId() {
		if (this.selected) {
			return this.selected.id;
		}
		return null;
	}
	this.getSelectedId = getSelectedId;
	/**
	 *	removeItem
	 *	Remove an item from the xbkIconBrowser.
	 *
	 *	@public
	 *  	@param id String id of the icon to remove.
	 *	@return	None
	 */
	function removeItem(id) {
		var tempArray=[];
		var j=0;
		for (var i in this.contents){
			var node = this.contents[i];
			if(id!=node.id) { 
				tempArray[j++]=node;		 
			}
		}
		this.selected = null;
		this.contents=tempArray;
		this.draw();
	}
	this.removeItem = removeItem;
	/**
	 *	sort
	 *	Organizes all in descending alphabetical order by name. 
	 *
	 *	@public
	 *	@return None
	 */
	// bug ie6 same text name.
	function sort() {
		var tempArray = [];
		var j = 0;
		for (var i in this.contents){
			tempArray[j++]=this.contents[i].text;	
		}
		tempArray.sort();
		var tempArray2 = [];
		j = 0;
		for(var k=0;k<tempArray.length;k++) {
			for(var i in this.contents){
				if(tempArray[k] == this.contents[i].text){
					tempArray2[j++]=this.contents[i];
				}
			}
		 
		}
		this.contents=tempArray2;
		tempArray=null;
		this.draw();
	}
	this.sort = sort;
	/**
	 *	selectIconById
	 *	Select an item from the xbkIconBrowser.
	 *
	 *	@public
	 *  	@param id String id of the icon to select.
	 *	@return	None
	 */
	function selectIconById(id) {
		var layer = this.getELEMENTDIV(id);
		var curNode = this.findIconBrowserNodeById(id);
		if (!curNode) {
			return null;
		}
		curNode.layer = layer;
		if (this.selected) {
			this.selected.layer.style.backgroundColor = this.getBgColor();
			this.selected.layer.style.color= "black";
		}
		curNode.layer.style.backgroundColor = this.highlightColor;
		curNode.layer.style.color= "blue";
		this.selected = curNode;
		return curNode;
	}
	this.selectIconById = selectIconById;

	function getELEMENTDIV(id) {
		if(ns6){
			return document.getElementById(id);
		}
		else {
			var node = document.all[id];
			if(node){
				return node;
			}
			else { return document.getElementById(id); }
		}
	}
	this.getELEMENTDIV = getELEMENTDIV;
}	
xbkIconBrowser.prototype = new xbkLayer;

function xbkIconBrowser_onmouseover(obj,id,inst) {
	var curIconBrowser = xbkIconBrowser.all[inst];
	//obj.style.backgroundColor = "navy";
	//obj.style.color= "white";
}

function xbkIconBrowser_onmouseout(obj,id,inst) {
	var curIconBrowser = xbkIconBrowser.all[inst];
	//obj.style.backgroundColor = curIconBrowser.getBgColor();
	//obj.style.color= "black";
}

function xbkIconBrowser_onclick(obj,id,inst) {
	var curIconBrowser = xbkIconBrowser.all[inst];
	var curNode = curIconBrowser.selectIconById(id);
	if (curNode&&curNode.fHandler) {
		curNode.fHandler(curNode);
	}
}
