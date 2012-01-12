/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */


/**
 *	xbkAPI
 *	xbkPopupMenu
 *	
 *	The xbkPopupMenu class provides a menu system.
 *
 *	@author		xbkapi  xbkapi@yahoo.com
 *	@exmaple	PopupMenu pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkLayer	extendsComment
 *  	@constructor xbkPopupMenu
 *	@param parent xbkLayer	The parent of the xbkPopupMenu object if it has one.
 *	@version    1.0
 *  
 */

function xbkPopupMenu (parent) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.itemCss = "itemCss";	
	this.barCss = "barCss";		
	this.contents = [];

	/**
	 *	addItem
	 *	Adds an item to the Menu.
	 *	
	 *	@public
	 *	@param text String Text that appears for the item. 
	 *	@param fHandler Reference Referece to a handler function. 
	 *	
	 */
	function addItem( text, fHandler ) {
		this.contents[ this.contents.length ] = {type:'item',text:text,fHandler:fHandler};
		this.draw();
	}
	this.addItem = addItem;
	
	/**
	 *	addBar
	 *	Adds a separator to divide groups of menu commands.
	 *
	 *	@public
	 *
	 */
	function addBar () {
		this.contents[ this.contents.length ] = {type:'bar'};
		this.draw();
	}
	this.addBar = addBar;
	
	function draw () {
		this.layer.innerHTML = "";
		var out = "<div class='menuCont'>";
		for ( var i = 0; i < this.contents.length; i++ ) {
			var node = this.contents[i];
			if ( node.type == "bar" ) {
				out += "<hr class='"+this.barCss+"'>";
			}
			else {
				out += "<div onmouseover='xbkPopupMenu_ONMOUSEOVER(this);' onmouseout='xbkPopupMenu_ONMOUSEOUT(this);' onmousedown='xbkPopupMenu_ONCLICK(this,"+node.fHandler+")' class='"+this.itemCss+"' >" + node.text + "</div>";
			}	
		}
		this.layer.innerHTML = out + "</div>";
		this.layer.style.display = "block";
		this.layer.style.visibility = "visible";
		(ie)?this.setHeight(this.layer.children[0].offsetHeight):this.setHeight(this.layer.childNodes[0].offsetHeight);
	
	}
	this.draw = draw;
}
xbkPopupMenu.prototype = new xbkLayer;

function xbkPopupMenu_ONMOUSEOUT( obj ) {
	obj.style.backgroundColor = "";
	obj.style.color = "black";
}
function xbkPopupMenu_ONMOUSEOVER( obj ) {
	obj.style.backgroundColor = "navy";
	obj.style.color= "white";
}
function xbkPopupMenu_ONCLICK( obj, fHandler ) {
	(fHandler)?fHandler():null;
}

