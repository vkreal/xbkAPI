/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkDragEvent
 *	
 *	This xbkDragEvent class handles the drag event for the xbkLayer Class Object.
 *
 *	@author		xbkapi			xbkapi@yahoo.com
 *	@example	exampleTitle		pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.0
 *	@extends	xbkObject
 *	@constructor	xbkDragEvent
 */

function xbkDragEvent(){
	this.superClass = xbkObject;
   	this.superClass( "xbkDragEvent" );
	this.boundedToParent = false;
	this.boundedByWindow = false;
	this.mouseMoveFunc  = null;
	this.mouseUpFunc = null;
	this.all = [];
}
xbkDragEvent.prototype = new xbkObject;
xbkDragEvent.selected 	= null;
xbkDragEvent.current  	= null;
xbkDragEvent.all 	= [];
xbkDragEvent.SNAP_GRID_X = null;
xbkDragEvent.SNAP_GRID_Y = null;
xbkDragEvent.originalgetZIndex = null;
xbkDragEvent.parentgetZIndex = 0;
xbkDragEvent.AppWidth = null;
xbkDragEvent.AppHeight = null;
xbkDragEvent.currentBoundedByWindow    = false;
xbkDragEvent.currentBoundedToParent    = false;
xbkDragEvent.ns4 = ( ( navigator.appName == "Netscape" ) && ( parseInt( navigator.appVersion ) < 5 ) )?true:false;
xbkDragEvent.ns6 = ( ( navigator.appName == "Netscape" ) && ( parseInt( navigator.appVersion ) >= 5 ) )?true:false;
/**
 *	getDragxbkLayerById
 *
 *	Get the Draggable xbkLayer by id.
 *
 *	@public
 *	@return	xbkLayer
 *	
 */
xbkDragEvent.prototype.getDragxbkLayerById = function ( id ) {
	return this.all[ id ];
}

/**
 *	getAppWidth
 *
 *	Get the current application window width.
 *
 *	@public
 *	@return	Number
 *	
 */
xbkDragEvent.prototype.getAppWidth = function() {
	return ( xbkDragEvent.ns4 || xbkDragEvent.ns6 )?window.innerWidth:document.body.clientWidth;
}
/**
 *	getAppHeight
 *
 *	Get the current application window width.
 
 *	@public
 *	@return Number
 *	
 */
xbkDragEvent.prototype.getAppHeight = function() {
	return ( xbkDragEvent.ns4 || xbkDragEvent.ns6 )?window.innerHeight:document.body.clientHeight;
}
/**
 *	setBoundedByWindow
 *	set the drag boundary to the current window.
 *	
 *	@public
 *	@param	bool Boolean
 */
xbkDragEvent.prototype.setBoundedByWindow = function ( bool ) {
	this.boundedByWindow = bool;
}
/**
 *	enableDragEvent
 *	enable a drag event
 *	
 *	@public
 *	@param	obj xbkLayer	a reference to a xbkLayer	
 */
xbkDragEvent.prototype.enableDragEvent = function( obj ) {
	var layer = obj.getLayer();
	if ( xbkDragEvent.ns4 ) {
		layer.captureEvents( Event.MOUSEDOWN )
		layer.onmousedown = this.engage;
	}
	else {
		obj.setEvent( "onmousedown", this.engage );
	}
	this.all[ layer.id ] = obj;
	xbkDragEvent.all[ layer.id ] = this;
}
/**
 *	disableDragEvent
 *	disable a drag event for a specific xbkLayer.
 *	
 *	@public
 *	@param	obj xbkLayer	a reference to a xbkLayer	
 */
xbkDragEvent.prototype.disableDragEvent = function( obj ) {
	( xbkDragEvent.ns4 )?obj.getLayer().onmousedown=null:obj.setEvent( "onmousedown", null );
	xbkDragEvent.all[ obj.getLayer().id ] = null;
	this.all[ obj.getLayer().id ] = null;
}
/**
 *	setBoundedToParent
 *	set bounded to parent, so when sibling is move the parent moves too
 *	
 *	@public
 *	@param	bool Boolean
 */
xbkDragEvent.prototype.setBoundedToParent = function ( bool ) {
	this.boundedToParent = bool;
}
// private
xbkDragEvent.releaseIt = function( event ) {
	xbkDragEvent.selected = null;
	return true;
}
// private
xbkDragEvent.getSelectedById = function( id ) {
	var temp = ( xbkDragEvent.currentBoundedToParent )?xbkLayer.all[ id ].getParent():xbkLayer.all[ id ];
	return ( temp )?temp:xbkLayer.all[ id ];
}

// private
xbkDragEvent.prototype.engage = function( event ) {
	var curDragObj = xbkDragEvent.all[ this.id ];
	xbkDragEvent.currentBoundedToParent =  curDragObj.boundedToParent;
	xbkDragEvent.currentBoundedByWindow =  curDragObj.boundedByWindow;
	xbkDragEvent.AppWidth       = curDragObj.getAppWidth();
	xbkDragEvent.AppHeight      = curDragObj.getAppHeight();
	xbkDragEvent.selected 		 = xbkDragEvent.getSelectedById( this.id );
	var DOC_BODY  = document.body;
	//if ( !xbkDragEvent.current ) {
		//xbkDragEvent.current = xbkDragEvent.getHighestgetZIndexedDragxbkLayer();
	//}
	if ( xbkDragEvent.current ) {
		var parentObj = xbkDragEvent.current.getParent();
		// set zIndex here for dragable objects.....
		if (ns6) {
			( parentObj )?parentObj.moveAboveBygetZIndex( xbkDragEvent.selected ):null;
			xbkDragEvent.current.moveAboveBygetZIndex( xbkDragEvent.selected );
		}
		else {
			( parentObj )?parentObj.moveBelowBygetZIndex( xbkDragEvent.selected ):null;
			xbkDragEvent.current.moveBelowBygetZIndex( xbkDragEvent.selected );
		}
	}
	var selected  = xbkDragEvent.current = xbkDragEvent.selected;
	var parent = selected.getParent();
	(parent)?xbkDragEvent.parentgetZIndex = parent.getZIndex():null;
	xbkDragEvent.originalZIndex = selected.getZIndex();
	if( selected ) {
		if ( ns6 || xbkDragEvent.ns4 ) {
			xbkDragEvent.SNAP_GRID_X = event.pageX - selected.getLeft();
			xbkDragEvent.SNAP_GRID_Y = event.pageY - selected.getTop();
		}
		else if ( document.all ) {
			xbkDragEvent.SNAP_GRID_X = ( window.event.clientX + DOC_BODY.scrollLeft ) - selected.layer.offsetLeft;
			xbkDragEvent.SNAP_GRID_Y = ( window.event.clientY + DOC_BODY.scrollTop )  - selected.layer.offsetTop;
		}
		document.onmousemove = xbkDragEvent.dragIt;
		document.onmouseup   = xbkDragEvent.releaseIt;
		selected.moveAboveBygetZIndex(  xbkDragEvent.current );
		parent?parent.moveAboveBygetZIndex(  xbkDragEvent.current ):null;
	}
	xbkDragEvent.ns4?document.captureEvents ( Event.MOUSEUP | Event.MOUSEMOVE ):null;
}

xbkDragEvent.getHighestgetZIndexedDragxbkLayer = function() {
	var cur;
	var temp = 0;
	for ( var i in xbkDragEvent.all ) {
		for ( var j in xbkDragEvent.all[i].all ) {
			if ( temp < xbkDragEvent.all[i].all[j].getgetZIndex() ) {
				temp = xbkDragEvent.all[i].all[j].getgetZIndex();
				cur = xbkDragEvent.all[i].all[j];
			}
		}
	}
	return cur;
}



// private
xbkDragEvent.dragIt = function ( event ) {
	var selected = xbkDragEvent.selected;
	var x = null;
	var y = null;
	if ( xbkDragEvent.ns6 || xbkDragEvent.ns4 ) {
		x = event.pageX;
		y = event.pageY;
	}
	else if ( document.all ) {
		x = window.event.clientX + document.body.scrollLeft;
		y = window.event.clientY + document.body.scrollTop;
	}
	if ( selected ) {
		x = x - xbkDragEvent.SNAP_GRID_X;
		y = y - xbkDragEvent.SNAP_GRID_Y;
		var oParent = selected.getParent();
		var left = 0;
		var top  = 0;
		var dragWidth 	 = selected.getWidth();
		var dragHeight   = selected.getHeight();
		if ( oParent ) {
			var parentWidth  = oParent.getWidth();
			var parentHeight = oParent.getHeight();
			if ( x < left ) x = left;
			else if ( x + dragWidth > parentWidth ) x = parentWidth - dragWidth;
			if ( y < top ) y = top;
			else if ( y + dragHeight > parentHeight ) y = parentHeight - dragHeight;
		}
		if ( xbkDragEvent.currentBoundedByWindow ) {
			if ( x < left ) x = left;
			else if ( x + dragWidth > xbkDragEvent.AppWidth  ) x = xbkDragEvent.AppWidth - dragWidth;
			if ( y < top ) y = top;
			else if ( y + dragHeight > xbkDragEvent.AppHeight  ) y = xbkDragEvent.AppHeight - dragHeight;
		}
		selected.moveTo( x, y );
		//selected.setWidth(selected.getWidth()-x);
		return false;
	}
}