/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkLayer
 *	
 *	The xbkLayer class is the base class for most visual controls in the xbkAPI. The xbkLayer can be positioned anywhere on screen and it supports background and border colors. Combined with other classes, xbkLayer provide the infrastructure of a web application.  
 *
 *	@author		xbkapi		xbkapi@yahoo.com
 *	@example	exampleTitle	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.0
 *	@extends	xbkObject
 *	@constructor	xbkLayer
 *	@param	parent	xbkLayer	parent xbkLayer of the current xbkLayer object
 *
 */
xbkLayer.all = [];
function xbkLayer( parent ) {
	this.superClass	= xbkObject;
	this.superClass( "xbkLayer", this );
	this.layer 	= null;
	this.parent	= parent || null;
	this.css 	= null;
	this.clipLeft 	= "auto";
	this.clipTop 	= "auto";
	this.clipRight 	= "auto";
	this.clipBottom = "auto";	

	if ( ie ) {
		var xbkHTML = "<div style='position: absolute' id='" + this.id + "'></div>";
		if ( !this.parent ) {
			if ( !document.body ) { 
				return;
			}
			else{
				document.body.insertAdjacentHTML( "beforeEnd", xbkHTML );
				this.layer = eval( this.id );
			}
		}
		else {
			if ( ie5Mac ) {
				var ref = document.createElement('div');
				ref.id = this.id;
				ref.style.position = "absolute";
				parent.layer.appendChild( ref );					
				this.layer = ref;
			}
			else {
				this.parent.layer.insertAdjacentHTML("beforeEnd", xbkHTML );
				this.layer = eval( this.id );
			}	
		}
		this.css = this.layer.style;
		this.css.display = "none";		
	}
	else{
		var newDiv = document.createElement( "DIV" );
		if (parent) {
			parent.layer.appendChild ( newDiv )
		}
		else {
			(document.body)?document.body.appendChild ( newDiv ):null;
		}
		this.css = newDiv.style;
		this.css.display = "none";
		this.css.position = "absolute";
		this.css.border = "0px solid black";
		newDiv.id = this.id;
		this.layer = newDiv;
	}
	xbkLayer.all[ this.id ] = this;
	this.getLeft 		= null;
	this.getTop 		= null;
	this.getWidth 		= null;
	this.getHeight 		= null;
	this.getClipLeft 	= null;
	this.getClipRight 	= null;
	this.getClipBottom 	= null;
	this.getClipTop 	= null;
	this.getParent		= null;
	this.getZIndex		= null;
	this.getBgColor		= null;
	this.setLeft 		= null;
	this.setTop 		= null;
	this.setWidth 		= null;
	this.setHeight 		= null;
	this.setClipLeft 	= null;
	this.setClipRight 	= null;
	this.setClipBottom 	= null;
	this.setClipTop 	= null;
	this.setVis 		= null;
	this.setBgColor 	= null;
	this.setBorderLeft 	= null;
	this.setBorderTop 	= null;
	this.setBorderRight 	= null;
	this.setBorderBottom	= null;
	this.setInnerHTML 	= null;
	this.setZIndex		= null;
	this.setEvent 		= null;
	this.moveTo		= null;
	this.moveBy		= null;
	// misc. functions
	this.getElementById	= null;
	this.getCSS		= null;
/**
 *	getLayer
 *	Get the layer object that was created by DOM
 *
 *	@public
 *	@return	layer
 *
 */
	function getLayer() {
		return this.layer;
	}
	this.getLayer = getLayer;
/**
 *	getLeft
 *	Get the current left position in pixels.
 *
 *	@public
 *	@return Number
 *
 */
	function getLeft() {
		return ( osMac || ns6 )? parseInt( this.layer.style.left ): parseInt( this.layer.style.posLeft );
	}
	this.left = this.getLeft = getLeft;
/**
 *	getTop
 *	Get the top position in pixels.
 *
 *	@public
 *	@return Number
 *
 */
	function getTop() {
		return ( osMac || ns6 )? parseInt( this.layer.style.top ):parseInt( this.layer.style.posTop );
	}
	this.top = this.getTop = getTop;
/**
 *	getWidth
 *	Get the width.
 *
 *	@public
 *	@return Number
 *
 */
	function getWidth() {
		if ( ns6 ) {
			return parseInt( this.css.borderLeftWidth ) + parseInt( this.css.borderRightWidth ) + parseInt( this.css.width );
		}
		else if ( osMac )  {
			return parseInt(this.css.width);
		}
		else {
			return parseInt( this.css.posWidth );
		}
	}
	this.width = this.getWidth = getWidth;

	
/**
 *	getHeight
 *	Get the height.
 *
 *	@public
 *	@return Number
 *
 */
	function getHeight() {
		if ( ns6 ) {		
			 return parseInt(this.css.borderTopWidth) + parseInt(this.css.borderBottomWidth) + parseInt(this.css.height);
		}
		else if ( osMac) {
			return parseInt(this.css.height);
		}
		else {
			return this.css.posHeight;
		}
	}
	this.height = this.getHeight = getHeight;
/**
 *	getClipLeft
 *	Get the clip left.
 *
 *	@public
 *	@return Number
 *
 */
	function getClipLeft() {
		return parseInt ( this.css.clipLeft );
	}
	this.getClipLeft = getClipLeft;
/**
 *	getClipRight
 *	Get the clip right.
 *
 *	@public
 *	@return Number
 *
 */
	function getClipRight() {
		return parseInt ( this.css.clipRight );
	}
	this.getClipRight = getClipRight;
/**
 *	getClipTop
 *	Get the clip top.
 *
 *	@public
 *	@return Number
 *
 */
	function getClipTop() {
		return parseInt ( this.css.clipTop );
	}
	this.getClipTop = getClipTop;
/**
 *	getClipBottom
 *	Get the clip bottom.
 *
 *	@public
 *	@return Number
 *
 */	
	function getClipBottom() {
		return parseInt ( this.css.clipBottom );
	}
	this.getClipBottom = getClipBottom;
/**
 *	getParent
 *	Get the xbkLayer parent.
 *
 *	@public
 *	@return xbkLayer
 *
 */	
	function getParent() {
		return this.parent;
	}
	this.getParent		= getParent;
/**
 *	getZIdex
 *	Get the z-index of the xbkLayer.
 *
 *	@public
 *	@return Number
 *
 */
	function getZIdex() {
		return parseInt ( this.css.zIndex );
	}
	this.getZIndex		= getZIdex;
/**
 *	setLeft
 *	Set the left.
 *
 *	@public
 *	@param num	Number	The number of pixels to set left.
 *	@return None
 *
 */
	function setLeft( num ) {
		this.css.left = (num < 0 )?0:num;
	}
	this.setLeft 		= setLeft;
/**
 *	setTop
 *	Set the top.
 *
 *	@public
 *	@param nume	Number	Set the number of pixels to top.
 *	@return None
 *
 */
	function setTop( num ) {
		this.css.top = (num < 0 )?0:num;
	}
	this.setTop 		= setTop;
/**
 *	setWidth
 *	Set the width
 *
 *	@public
 *	@param num	Number	Set the number of pixels to width.
 *	@return None
 *
 */
	function setWidth( num ) {
		if ( num <= 0 ) {
			return;
		}
		if ( ns6 ) {
			num -= parseInt( this.css.borderLeftWidth ) + parseInt( this.css.borderRightWidth );
			if ( num < 0 ) { num = 0; }
		}
		this.css.width = num;
	}
	this.setWidth 		= setWidth;
	

/**
 *	setHeight
 *	Set the height.
 *
 *	@public
 *	@param num	Number	Set the number of pixels to height.
 *	@return Number
 *
 */
	function setHeight( num ) {
		if ( ns6 ) {		
			num -= parseInt( this.css.borderTopWidth) + parseInt( this.css.borderBottomWidth );
			if ( num < 0 ) { num = 0; }
		}
		this.css.height = num;		
	}
	this.setHeight 		= setHeight;
/**
 *	setClipLeft
 *	Set the clip left.
 *
 *	@public
 *	@param num	Number	Set the number of pixels to set clip left.
 *	@return None
 *
 */

	function setClipLeft( num ) {
		if ( num < 0 ) return;
		this.clipLeft = num;
		this.css.clip = "rect(" + this.clipTop + " " + this.clipRight + " " + this.clipBottom + " " + num + " )";
	}
	this.setClipLeft 	= setClipLeft;
/**
 *	setClipRight
 *	Set the clip right.
 *
 *	@public
 *	@param num	Number	Set the number of pixels to set clip right.
 *	@return None
 *
 */
	function setClipRight( num ) {
		if ( num < 0 ) return;
		this.clipRight = num;
		this.css.clip = "rect(" + this.clipTop + " " + num + " " + this.clipBottom + " " + this.clipLeft + " )";
	}
	this.setClipRight 	= setClipRight;
/**
 *	setClipBottom
 *	Set the clip bottom.
 *
 *	@public
 *	@param num	Number	Set the number of pixels to set clip bottom.
 *	@return None
 *
 */
	function setClipBottom( num ) {
		if ( num < 0 ) return;
		this.clipBottom = num;
		this.css.clip = "rect(" + this.clipTop + " " + this.clipRight + " " + num + " " + this.clipLeft + " )";
	}
	this.setClipBottom 	= setClipBottom;
/**
 *	setClipTop
 *	Set the clip top.
 *
 *	@public
 *	@param num	Number	Set the number of pixels to set clip top.
 *	@param number	integer	paramComment
 *	@return None
 *
 */
	function setClipTop( num ) {
		if ( num < 0 ) return;
		this.clipTop = num;
		this.css.clip = "rect(" + num + " " + this.clipRight + " " + this.clipBottom + " " + this.clipLeft + " )";
	}
	this.setClipTop 	= setClipTop;
/**
 *	setVis
 *	Set the visibility.
 *
 *	@public
 *	@param type	String	Params: [hidden|inherit|show]
 *	@return None
 *
 */
	function setVis( type ) {
		if ( type == "hidden" || type == "hide" ) {
			this.css.display = "none";
			this.css.visibility = "hidden";
		}
		else if ( type == "inherit" ) {
			this.css.display = "block";
			this.css.visibility = "inherit";
		}
		else if ( type == "show" ) {
			this.css.display = "block";
			this.css.visibility = "visible";
		}
		else { 
			alert( "setVis() wrong parameter..." );
		}
	}
	this.setVis 		= setVis;
/**
 *	setBgColor
 *	Set the background color
 *
 *	@public
 *	@param color	String	The color to be use.
 *	@return None
 *
 */
	function setBgColor( color ) {
		this.css.backgroundColor = color;
	}
	this.setBgColor 	= setBgColor;
/**
 *	setOverflow
 *	Set the CSS of the xbkLayer overflow attribute.
 *
 *	@public
 *	@param sType	String	[ scroll | hidden | auto ]
 *	@return None
 *
 */
	function setOverflow( sType ) {
		this.css.overflow = sType;
	}
	this.setOverflow = setOverflow;
/**
 *	getBgColor
 *	Get the background color
 *
 *	@public
 *	@return String
 *
 */
	function getBgColor() {
		return this.css.backgroundColor;
	}
	this.getBgColor = getBgColor;

/**
 *	setBorderLeft
 *	Set the border of the left side.
 *
 *	@public
 *	@param width	Number	The number in pixels of the width.	
 *	@param color	String	The color to be use.
 *	@return None
 *
 */
	function setBorderLeft( width,color ) {
		this.css.borderLeft = width + "px solid " + color;
	}
	this.setBorderLeft 	= setBorderLeft;
/**
 *	setBorderTop
 *	Set the border of the top side.
 *
 *	@public
 *	@param width	Number	The number in pixels of the width.		
 *	@param color	String	The color to be use.
 *	@return None
 *
 */
	function setBorderTop( width,color ) {
		this.css.borderTop = width + "px solid " + color;
	}
	this.setBorderTop 	= setBorderTop;
/**
 *	setBorderRight
 *	Set the border of the right side.
 *
 *	@public
 *	@param width	Number	The number in pixels of the width.		
 *	@param color	String	The color to be use.
 *	@return None
 *
 */
	function setBorderRight( width,color ) {
		this.css.borderRight = width + "px solid " + color;
	}
	this.setBorderRight 	= setBorderRight;
/**
 *	setBorderBottom
 *	Set the border of the bottom side.
 *
 *	@public
*	@param width	Number	The number in pixels of the width.		
 *	@param color	String	The color to be use.
 *	@return None
 *
 */
	function setBorderBottom( width,color ) {
		this.css.borderBottom = width + "px solid " + color;
	}
	this.setBorderBottom 	= setBorderBottom;
/**
 *	setInnerHTML
 *	Set the inner html of the xbkLayer.
 *
 *	@public
 *	@param html	String	html to be use.
 *	@return None
 *
 */
	function setInnerHTML( html ) {
		this.layer.innerHTML = html;
	}
	this.setInnerHTML 	= setInnerHTML;
/**
 *	setEvent
 *	Set the event for the xbkLayer.
 *
 *	@public
 *	@param type	String	Params: [onmouseup|onclick|onmousedown|onmouseover|onmouseout|onmousemove]
 *	@param func	Handler	Reference to a function handler
 *	@return None
 *
 */
	function setEvent( type, func ) {
		if ( type == "onmouseup" ) {
			this.layer.onmouseup = func;
		}
		else if ( type == "onclick" ) {
			this.layer.onclick = func;
		}
		else if ( type == "onmousedown" ) {
			this.layer.onmousedown = func;
		}
		else if ( type == "onmouseover" ) {
			this.layer.onmouseover = func;
		}
		else if ( type == "onmouseout" ) {
			this.layer.onmouseout = func;
		}
		else if ( type == "onmousemove" ) {
			this.layer.onmousemove = func;
		}			
		else {
			alert("error: " + type );
		}
	}
	this.setEvent 		= setEvent;
/**
 *	setZIndex
 *	Set the z-index.
 *
 *	@public
 *	@param num	Number	
 *	@return None
 *
 */
	function setZIndex( num ) {
		this.css.zIndex = num;
	}
	this.setZIndex = setZIndex;
/**
 *	moveAboveBygetZIndex
 *	Move above the current xbkLayer pass in as a parameter.
 *
 *	@public
 *	@param obj	xbkLayer	The xbkLayer to move above
 *	@return None
 *
 */
	function moveAboveBygetZIndex( obj ) {
		//alert(obj.getZIndex());
		this.setZIndex( obj.getZIndex() + 1 );
	}
	this.moveAboveBygetZIndex = moveAboveBygetZIndex;
/**
 *	moveBelowBygetZIndex
 *	Move below the current xbkLayer pass in as a parameter.
 *
 *	@public
 *	@param sname	string	paramComment
 *	@param obj	xbkLayer	The xbkLayer to move below
 *	@return None
 *
 */
	function moveBelowBygetZIndex( obj ) {
		this.setZIndex( obj.getZIndex() - 1 );
	}
	this.moveBelowBygetZIndex = moveBelowBygetZIndex;
/**
 *	moveTo
 *	Move xbkLayer to x-y position.
 *
 *	@public
 *	@param x	Number	Move x pixels
 *	@param y	Number	Move y pixels
 *	@return None
 *
 */
	function moveTo( x, y ) {
		if ( x != null ) {
			if ( ns6 ) this.css.left = x;
			else this.css.pixelLeft = x;
		}
		if ( y != null ) {
			if ( ns6 ) this.css.top = y;
			else this.css.pixelTop = y;
		}
	}
	this.moveTo = moveTo;
/**
 *	moveBy
 *	Move xbkLayer by deltaX and deltaY.
 *
 *	@public
 *	@param x	Number	Move by x pixels
 *	@param y	Number	Move by y pixels
 *	@return None
 *
 */
	function moveBy( x, y ) {
		this.moveTo( this.getLeft() + x, this.getTop() + y );
	}
	this.moveBy = moveBy;
/**
 *	getElementById
 *	Get xbkLayer by id.
 *
 *	@public
 *	@param id	String	The id to by use to find the xbkLayer object
 *	@return xbkLayer
 *
 */
	function getElementById( id ) {
		return xbkObject.all[ id ];
	}
	this.getElementById	= getElementById;
/**
 *	getCSS
 *	Get the css object of the xbkLayer.
 *
 *	@public
 *	@return CSS
 *
 */
	function getCSS() {
		return this.css;
	}
	this.getCSS = getCSS;

	// init
	this.setTop( 0 );
	this.setLeft( 0 );
	this.setWidth( 0 );
	this.setHeight( 0 );
	this.setZIndex( 0 );
}
xbkLayer.prototype 	= new xbkObject;

