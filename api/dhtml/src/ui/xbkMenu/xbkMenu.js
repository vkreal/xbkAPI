/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */


/**
 *	xbkAPI
 *	xbkMenu
 *	
 *	The xbkMenu class provides a horizontal or vertical menu system.
 *
 *	@author		xbkapi 	xbkapi@yahoo.com
 *	@exmaple	PopupMenu pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkLayer	extendsComment
 *  	@constructor xbkMenu
 *	@param inst String	The name or id to be use for this xbkMenu.
 *	@param parent xbkLayer	The parent of the xbkMenu object if it has one.
 *	@version    1.0
 *  
 */
xbkMenu.all = [];
function xbkMenu (inst,parent) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.inst = inst;
	xbkMenu.all[ this.inst ] = this;
	this.itemCss = "itemCss";	
	this.barCss = "barCss";		
	this.contents = [];
	this.horizontal = true;
	this.mouseoverHightLight = false;
	this.cordX	= null;
	this.cordY	= null;	
	this.autostrechHoriz	= false;
	this.autostrechVert	= false;
	this.padding 	= 0;
	this.autofit	= true;
	/**
	 *	hideALLxbkMenu
	 *	Hide all the xbkMenu.
	 *	
	 *	@public
	 *	@return None
	 */
	function hideALLxbkMenu() {
		for (var i in xbkMenu.all) {
			xbkMenu.all[i].setVis("hidden");
		}
	}
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
	 *	setVis
	 *	Set the xbkMenu visibility and x,y location.
	 *	
	 *	@public
	 *	@param type String [show|hidden|inherit]
	 *	@param x Number location x
	 *	@param y Number location y
	 *	@return None
	 */
	this.xbkMenu_setVis = this.setVis;
	function xbkMenuSetVis( type, x, y ) {
		this.xbkMenu_setVis( type );
		(x)?this.cordX=x:this.cordX=null;
		(y)?this.cordY=y:this.cordX=null;
		
		if (this.cordX&&this.cordY) {
			this.moveTo(this.cordX, this.cordY );
		}
	}
	this.setVis = xbkMenuSetVis;

	/**
	 *	setHorizontalMenu
	 *	Set menu to be horizontal or vertical, default is horizontal.
	 *	
	 *	@public
	 *	@param bType Boolean Set to true or false. 
	 *	@return None
	 */
	function setHorizontalMenu( bType ) {
		this.horizontal = bType;
	}	
	this.setHorizontalMenu = setHorizontalMenu;
	/**
	 *	addItem
	 *	Adds an item to the Menu.
	 *	
	 *	@public
	 *	@param text String Text that appears for the item. 
	 *	@param fHandler Reference Referece to a handler function. 
	 *	@return None
	 */
	function addItem(text,fHandler) {
		var node=new xbkNode("xbkMenu_node_"+xbkUtil.xbkGLOBAL_COUNT++,text,null,null,null,fHandler,this);
		node.type='item';
		//this.contents[ this.contents.length ] = {type:'item',text:text,fHandler:fHandler, id:"xbkMenu_id"+this.contents.length};
		this.contents[ this.contents.length ]=node;
		this.draw();
	}
	this.addItem = addItem;
	
	/**
	 *	addBar
	 *	Adds a separator to divide groups of menu commands.
	 *
	 *	@public
	 *	@return None
	 */
	function addBar () {
		this.contents[ this.contents.length ] = {type:'bar'};
		this.draw();
	}
	this.addBar = addBar;
	/**
	 *	setMouseOverHightLight
	 *	Set the mouseover event to hightlight the selections.
	 *
	 *	@public
	 *	@param bType Boolean
	 *	@return None
	 */
	function setMouseOverHightLight( bType ) {
		this.mouseoverHightLight = bType;
	}
	this.setMouseOverHightLight = setMouseOverHightLight;
	/**
	 *	draw
	 *	Draw the xbkMenu
	 *	
	 *	@public
	 *	@return None
	 */
	function draw () {
		var xbkToolBar_strechHoriz = "";
		var xbkToolBar_strechVert  = "";
		(this.autostrechHoriz)?xbkToolBar_strechHoriz = "width='100%'":"";
		(this.autostrechVert)?xbkToolBar_strechVert = "height='100%'":"";

		var out = "<div class='menuCont'>";	
		out += "<table "+xbkToolBar_strechHoriz+" "+xbkToolBar_strechVert+" border=0 cellpadding='"+this.padding+"' cellspacing='0' ><tr>";
		for ( var i = 0; i < this.contents.length; i++ ) {
			var node = this.contents[i];
			var my_menu_obj = xbkMenu.all[ this.inst ];
			(this.horizontal)?out +="":out += "<tr>";
			out += "<td align='left'>";
			if ( node.type == "bar" ) {
				(this.horizontal)?out += "<span>|</span>":out += "<hr class='"+this.barCss+"'>";
			}
			else {
				out += "<div "; 
				out += " onmouseover='xbkMenu_ONMOUSEOVER(event,this,\""+node.id+"\",\"" +node.text+ "\",\""+this.inst+"\")'";
				out += " onmouseout='xbkMenu_ONMOUSEOUT(event,this,\""+node.id+"\",\"" +node.text+ "\",\""+this.inst+"\")'";
				out += " onclick='xbkMenu_ONCLICK(event,this,\""+node.id+"\",\"" +node.text+ "\",\""+this.inst+"\")'";
				out += " class='"+this.itemCss+"' >" + node.text;
				out += "</div>";
			}
			out += "</td>";
			(this.horizontal)?out +="":out += "</tr>";
		}
		out += "</tr></table>\n";
		this.layer.innerHTML = out + "</div>";
		this.layer.style.display = "block";
		this.layer.style.visibility = "visible";
		if(this.autofit) {
			(ie)?this.setHeight(this.layer.children[0].offsetHeight):this.setHeight(this.layer.childNodes[0].offsetHeight);
		}
	}
	this.draw = draw;

	function xbkMenu_setBorder_MOUSEOVER( obj ) {
		obj.style.borderBottom = "1px solid gray";
		obj.style.borderRight = "1px solid gray";
		obj.style.borderTop = "1px solid white";
		obj.style.borderLeft = "1px solid white";
	}
	this.xbkMenu_setBorder_MOUSEOVER = xbkMenu_setBorder_MOUSEOVER;


	function xbkMenu_setBorder_MOUSECLICK( obj ) {
		if (!this.mouseoverHightLight) { 
			obj.style.borderBottom = "1px solid white";
			obj.style.borderRight = "1px solid white";
			obj.style.borderTop = "1px solid gray";
			obj.style.borderLeft = "1px solid gray";
		}
	}
	this.xbkMenu_setBorder_MOUSECLICK = xbkMenu_setBorder_MOUSECLICK;

	function xbkMenu_setBorder_MOUSEOUT( obj ) {
		var color = this.getBgColor();
		obj.style.borderLeft = color;
		obj.style.borderTop = color;
		obj.style.borderBottom = color;
		obj.style.borderRight = color;
	}
	this.xbkMenu_setBorder_MOUSEOUT = xbkMenu_setBorder_MOUSEOUT;
	
	function findNodeById(id){
		for ( var i = 0; i < this.contents.length; i++ ) {
			var node = this.contents[i];
			if(id==node.id){
				return node;
			}
		}
		return null;
	}
	this.findNodeById = findNodeById;
}
xbkMenu.prototype = new xbkLayer;



function xbkMenu_ONMOUSEOUT( event, obj, id, sName, inst ) {
	var menuObj = xbkMenu.all[ inst ];
	if (menuObj.mouseoverHightLight) {
		obj.style.backgroundColor = "";
		obj.style.color = "black";
	}
	else {
		menuObj.xbkMenu_setBorder_MOUSEOUT( obj );
	}
}
function xbkMenu_ONMOUSEOVER( event, obj, id, sName, inst ) {
	var menuObj = xbkMenu.all[ inst ];
	if (menuObj.mouseoverHightLight) {
			obj.style.backgroundColor = "navy";
			obj.style.color= "white";
	}
	else {
		menuObj.xbkMenu_setBorder_MOUSEOVER( obj );
	}
}
function xbkMenu_ONCLICK( event, obj, id, sName, inst ) {
	var menuObj = xbkMenu.all[ inst ];
	if (menuObj) {
		menuObj.xbkMenu_setBorder_MOUSECLICK( obj );
		var item=menuObj.findNodeById(id);
		(item && item.fHandler)?item.fHandler():null;
	}
		
	
}


