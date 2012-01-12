/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *	xbkAPI
 *	xbkToolBar
 *	
 *	The xbkToolBar class provides a horizontal or vertical tool bar system.
 *
 *	@author		xbkapi 		xbkapi@yahoo.com
 *	@exmaple	PopupMenu 	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkLayer	extendsComment
 *  	@constructor xbkToolBar
 *	@param inst String	The name or id to be use for this xbkToolBar.
 *	@param parent xbkLayer	The parent of the xbkToolBar object if it has one.
 *	@version    1.0
 *  
 */
xbkToolBar.all = [];
function xbkToolBar (inst,parent) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.inst = inst;
	xbkToolBar.all[ this.inst ] = this;
	this.horizontal = true;
	this.contents = [];
	this.autostrech = false;
	this.padding = 0;
	this.autostrechHoriz	= false;
	this.autostrechVert	= false;
	
	/**
	 *	autostrechHorizontal
	 *	Autostrech horizontal.
	 *	
	 *	@public
	 *	@param bType Boolean Set to true or false. 
	 *	@return None
	 */
	function autostrechHorizontal( bType ) {
		this.autostrechHoriz = bType;
	}
	this.autostrechHorizontal = autostrechHorizontal;
	/**
	 *	autostrechVertical
	 *	Autostrech vertical.
	 *	
	 *	@public
	 *	@param bType Boolean Set to true or false. 
	 *	@return None
	 */
	function autostrechVertical( bType ) {
		this.autostrechVert = bType;
	}
	this.autostrechVertical = autostrechVertical;

	/**
	 *	setHorizontalToolBar
	 *	Set Tool bar to be horizontal or vertical, default is horizontal.
	 *	
	 *	@public
	 *	@param bType Boolean Set to true or false. 
	 *	@return None
	 */
	function setHorizontalToolBar( bType ) {
		this.horizontal = bType;
	}	
	this.setHorizontalToolBar = setHorizontalToolBar;
	/**
	 *	addItem
	 *	Adds an item to the Menu.
	 *	
	 *	@public
	 *	@param img String Image to use. 
	 *	@param imgOver String Image for mouseover event. 
	 *	@param imgDown String Image for onclick event. 
	 *	@param fHandler Reference Referece to a handler function. 
	 *	@return None
	 */
	function addItem(img, imgOver, imgDown, fHandler) {
		var node=new xbkNode("xbkToolBar_node_"+xbkUtil.xbkGLOBAL_COUNT++,null,img,imgOver,imgDown,fHandler,this);
		//this.contents[ this.contents.length ] = {img:img,imgOver:imgOver,imgDown:imgDown,fHandler:fHandler};
		this.contents[this.contents.length]=node;
		this.draw();
	}
	this.addItem = addItem;
	/**
	 *	removeItem
	 *	Remove a item from the xbkToolBar
	 *	
	 *	@public
	 *	@param index Number The index of the xbkToolBar to be remove.  
	 *	@return None
	 */
	function removeItem( index ) {
		var temp = [];
		var j=0;
		for (var i=0;i<this.contents.length;i++) {
			if (i!=index) {
				temp[j++]=this.contents[i];
			}
		}
		this.contents = temp;
	}

	/**
	 *	draw
	 *	Draw the xbkToolBar
	 *	
	 *	@public
	 *	@return None
	 */
	function draw () {
		var xbkToolBar_strechHoriz = "";
		var xbkToolBar_strechVert  = "";
		(this.autostrechHoriz)?xbkToolBar_strechHoriz = "width='100%'":"";
		(this.autostrechVert)?xbkToolBar_strechVert = "height='100%'":"";

		var sHTML = "<table "+xbkToolBar_strechHoriz+" "+xbkToolBar_strechVert+" cellpadding='"+this.padding+"' border=0 cellspacing='0' ><tr>";
		for (var i in this.contents) {
			var node = this.contents[i];
			(this.horizontal)?sHTML +="":sHTML += "<tr>";
			sHTML += "<td align='middle'>";
			sHTML += "<img src='" + node.img + "'";
			sHTML += " onmouseover='this.src=\"" + node.imgOver + "\"'";
			sHTML += " onmouseout='this.src=\"" + node.img + "\"'";
			//sHTML += " onmousedown='this.src=\"" + node.imgDown + "\"'";
			sHTML += " onmouseup='this.src=\"" + node.img + "\"'";
			sHTML += " onmousedown='xbkToolBar_ONCLICK_HANDLER(this,\""+node.id+"\","+node.fHandler+")';";
			sHTML += " >";
			sHTML += "</td>";
			(this.horizontal)?sHTML +="":sHTML += "</tr>";
		}
		sHTML += "</tr></table>\n";
		this.setInnerHTML(sHTML);
	}
	this.draw = draw;


}
xbkToolBar.prototype = new xbkLayer;

function xbkToolBar_ONCLICK_HANDLER(obj,id,fHandler) {
	obj.src=xbkNode.all[id].imgDown;
	(fHandler)?fHandler(id):null;
}
