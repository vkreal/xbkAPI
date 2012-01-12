/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *	xbkAPI
 *	xbkLabel
 *	
 *	The xbkLabel class provides simple labels for any xbkAPI web applications.
 *
 *	@author		xbkapi 		xbkapi@yahoo.com
 *	@exmaple	PopupMenu 	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkLayer	extendsComment
 *  	@constructor xbkLabel
 *	@param inst String	The name or id to be use for this xbkLabel.
 *	@param parent xbkLayer	The parent of the xbkLabel object if it has one.
 *	@version    1.0
 *  
 */
xbkLabel.all = [];
function xbkLabel(inst,parent) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.inst=inst;
	xbkLabel.all[inst]=this;
	this.text="";
	this.className="";
	this.align = "center";
	this.cellspacing=0;
	/**
	 *	setTextAlign
	 *	Set the text align.
	 *	
	 *	@public
	 *	@param text String
	 *	@return None
	 */
	function setTextAlign(text){
		this.align=text;
		this.draw();
	}
	this.setTextAlign=setTextAlign;
	/**
	 *	setText
	 *	Set the text for the xbkLabel.
	 *	
	 *	@public
	 *	@param text String
	 *	@return None
	 */
	function setText(text){
		this.text=text;
		this.draw();
	}
	this.setText=setText;
	/**
	 *	setStyle
	 *	Set the CSS style.
	 *	
	 *	@public
	 *	@param sStyle String	Class style name.
	 *	@return None
	 */
	function setStyle(sStyle){
		this.className=sStyle;
		this.draw();
	}
	this.setStyle=setStyle;
	
	function draw() {
		this.setInnerHTML("<table cellpadding=0 cellspacing='"+this.cellspacing+"' width=100% height=100% border=0><td valign=middle align='"+this.align+"'><font  onselectstart='return false' class='"+this.className+"'><nobr>" +this.text+ "</nobr></font></td></table>\n");
	}
	this.draw=draw;
}
xbkLabel.prototype = new xbkLayer;