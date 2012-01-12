/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */


/**
 * xbkAPI
 *	xbkMenuSystem
 *	
 *	The xbkMenuSystem class provides menu system for any xbkAPI web applications.
 *
 *	@author		xbkapi 		xbkapi@yahoo.com
 *	@exmaple	PopupMenu 	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkMenu	extendsComment
 *  	@constructor xbkMenuSystem
 *	@param inst String	The name or id to be use for this xbkMenuSystem.
 *	@param parent xbkLayer	The parent of the xbkMenuSystem object if it has one.
 *	@version    1.1
 *  
 */
xbkMenuSystem.all = [];
xbkMenuSystem.subMenu = null;
function xbkMenuSystem( inst, parent ) {
	this.superClass = xbkMenu;
	this.superClass( inst, parent );
	this.inst = inst;
	xbkMenuSystem.all[ inst ] = this;
	xbkMenuSystem.subMenu = this.subMenuArray = [];
	
	
	this.xbkMenuSystem_setBgColor = this.setBgColor;
	function xbkMenuSystem_setBgColor_OL( color ) {
		xbkMenuSystem.subMenuColor = color;
		this.xbkMenuSystem_setBgColor( color );
	}
	this.setBgColor = xbkMenuSystem_setBgColor_OL;
/**
 *	addRoot
 *	Add a root to the main menu system.
 *	
 *	@public
 *	@param	sName Text to be use as name.
 *	@param	fHandler Handler to be use when user click.
 *	@return xbkMenu
 */
	function addRoot( sName, fHandler ) {
		this.addItem( sName, fHandler );
		var sub_inst = this.inst + "_" + sName;
		var newSubMenu = new xbkMenu(sub_inst,null);
		this.subMenuArray[sub_inst] = newSubMenu;
		newSubMenu.overLoadedDraw = newSubMenu.draw;
		newSubMenu.draw = function() {
			newSubMenu.overLoadedDraw();
			with(newSubMenu) {
				setHorizontalMenu( false );
				setBgColor(xbkMenuSystem.subMenuColor);
				//setBorderLeft( 1,"#D6D3CE");
				//setBorderTop( 1,"#D6D3CE");
				//setBorderRight( 1,"black");
				//setBorderBottom( 1,"black");
				setVis("hidden");
				setZIndex( 1001 );
			}
		}
		
		return newSubMenu;
	}
	this.addRoot = addRoot;
}
xbkMenuSystem.prototype = new xbkMenu;
xbkMenuSystem.subMenuColor = "#D6D3CE";


var xbkMenuSystem_GLOBAL_SUBMENU = null;
// overload xbkMenu GLOBAL function
function xbkMenu_ONCLICK( event, obj, id, sName, inst ) {
	var menuObj = xbkMenu.all[ inst ];
	if (menuObj) {
		menuObj.xbkMenu_setBorder_MOUSECLICK( obj );
		var item=menuObj.findNodeById(id);
		(item && item.fHandler)?item.fHandler():null;
	}

	if ( xbkMenuSystem_GLOBAL_SUBMENU ) {
		xbkMenuSystem_GLOBAL_SUBMENU.setVis("hidden");
	}
	
	var menuSystem = xbkMenuSystem.all[inst];
	if (menuSystem) {
		var subMenu = menuSystem.subMenuArray[inst+"_"+sName];
		if (subMenu) {
			if ( xbkMenuSystem_GLOBAL_SUBMENU ) {
				xbkMenuSystem_GLOBAL_SUBMENU.setVis("hidden");
			}		
			var x = null;
			var y = null;
			if ( ns6 ) {
				x = event.pageX;
				y = event.pageY;
			}
			else if ( document.all ) {
				x = window.event.clientX + document.body.scrollLeft;
				y = window.event.clientY + document.body.scrollTop;
			}
			subMenu.setLeft( x );
			subMenu.setTop( y + 5 );
			subMenu.setVis("show");
			xbkMenuSystem_GLOBAL_SUBMENU = subMenu;
		}
	}
}

