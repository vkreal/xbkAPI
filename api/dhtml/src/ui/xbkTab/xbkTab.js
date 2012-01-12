/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *	xbkAPI
 *	xbkTab
 *	
 *	The xbkTab class provides Tab Seletion options for xbkAPI web applications.
 *
 *	@author		xbkapi 		xbkapi@yahoo.com
 *	@exmaple	PopupMenu 	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkLayer	extendsComment
 *  	@constructor xbkMenu
 *      @param inst String	The name or id to be use for this xbkTab.
 *     	@param parent xbkLayer	The parent of the xbkTab object if it has one.
 *	@version    1.0
 *  
 */
xbkTab.all = [];
function xbkTab( inst, parent ) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.inst = inst;
	xbkTab.all[ this.id ] = this;
	this.contents = new Array();
	this.lastTab  = null;	
	/**
	 *	addItem
	 *	Adds an item to the Tab.
	 *	
	 *	@public
	 *	@param text String Text that appears for the item. 
	 *	@param fHandler Reference Referece to a handler function.
	 *	@return xbkLayer	The body as a xbkLayer
	 */
	function addItem( text, fHandler, sImgOver,  sImgOut) {
		var node=new xbkNode("xbkTab_node_"+xbkUtil.xbkGLOBAL_COUNT++,text,sImgOut,sImgOver,null,fHandler,this);
		node.tab=new xbkLayer(this);
		node.content= new xbkLayer(this);
		//var ref = this.contents[ this.contents.length ] = { text:text,fHandler:fHandler, sImgOver:sImgOver, sImgOut:sImgOut, tab:new xbkLayer(this), content: new xbkLayer(this)};
		this.contents[ this.contents.length ]=node;
		this.draw();
		return node.content;
	}
	this.addItem = addItem;
	/**
	 *	remove
	 *	Remove an item from the Tab.
	 *	
	 *	@public
	 *	@param index Number Index of tab.
	 *	@return	None
	 */
	function remove( index ) {
		var tempArray = [];
		var j = 0;
		for (var i = 0; i <this.contents.length; i++) {
			if ( index != i ) {
				tempArray[j++] = this.contents[i];
			}
		}
		// clean
		var temp = this.contents[index];
		temp.tab.setVis("hidden");
		temp.content.setVis("hidden");
		this.contents = tempArray;
		this.draw();
	}
	this.remove = remove;	
	
	this.tabOn  = null;
	this.tabOff = null;
	/**
	 *	setTabBgColor
	 *	Set the background color of the tab when click on and off.
	 *	
	 *	@public
	 *	@param sTabOn String Color when this tab has focus
	 *	@param sTabOff String Color when this tab is off focus
	 *	@return	None
	 */
	function setTabBgColor( sTabOn, sTabOff ) {
		this.tabOn  = sTabOn;
		this.tabOff = sTabOff;
	}

	function draw() {
		var tabWidth = this.width()/this.contents.length;
		this.lastTab = this.contents[0];
		for (var i = 0; i < this.contents.length; i++) {
			var node = this.contents[i];
			with( node.tab ) {
				setWidth( tabWidth - 2 );
				setHeight( 20 );
				setLeft( i * tabWidth );
				setTop( 0 );
				if ( i == 0 ) {
					setBgColor((this.tabOn)?this.tabOn:"gray");
				}
				else {
					setBgColor((this.tabOff)?this.tabOff:"silver");
				}
				//
				setVis("show");
				setInnerHTML("<b>"+node.text+"</b>");
				setEvent("onclick", eval(this.inst+".xbkTab_CLICK_HANDLER"));
			}
			with( node.content ) {
				setWidth( this.width() );
				setHeight( this.height() - 21 );
				setLeft(0);
				setTop(21);
				if (i == 0) {
					setVis("show");
					//setBgColor("gray");
				}
				//
				//setInnerHTML("<b><i>"+node.text+" html string</i></b>");
			}
		}
	}
	this.redraw = this.draw = draw;
	
	
	/**
	 *	redraw
	 *	Redraw xbkTab.
	 *	
	 *	@public
	 *	@return	None
	 */

	function xbkTab_CLICK_HANDLER() {
		var  node = xbkLayer.all[this.id];
		if (node) {
			var parentNode = node.getParent();
			var tabContent = null;
			for (var i = 0; i < parentNode.contents.length; i++) {
				var nodeTab = parentNode.contents[ i ];
				if (nodeTab.tab.id == this.id) {
					tabContent = nodeTab;
				}
			}
			if (parentNode.lastTab) {
				parentNode.lastTab.content.setVis("hidden");
				parentNode.lastTab.tab.setBgColor("silver");
			}
			parentNode.lastTab = tabContent;
			tabContent.tab.setBgColor("gray");
			//tabContent.content.setBgColor("gray");
			tabContent.content.setVis("show");
			if (tabContent.fHandler) {
				tabContent.fHandler(tabContent);
			}
		}
		
	}
	this.xbkTab_CLICK_HANDLER = xbkTab_CLICK_HANDLER;
}
xbkTab.prototype = new xbkLayer;