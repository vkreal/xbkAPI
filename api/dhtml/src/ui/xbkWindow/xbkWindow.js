/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkWindow
 *	
 *	The xbkWindow Class creates a window like look and feel tool for any xbkAPI web applications. 
 *
 *	@author		xbkapi		xbkapi@yahoo.com
 *	@example	exampleTitle	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.1
 *	@extends	xbkLayer
 *	@constructor	xbkWindow
 *	@param inst String	The name or id to be use for this xbkWindow.
 *	@param	parent	xbkLayer	The windows parent, if any.
 *
 */
xbkWindow.all 		= [];
function xbkWindow(inst,parent) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.inst	= inst
	xbkWindow.all[ this.id ] = this;
	this.mainBody   	= new xbkLayer( this );
	this.mainBody.setOverflow("auto");
	this.dragableBody   	= new xbkLayer( this );
	this.iconPanel     	= new xbkLayer( this );
	this.controlMin 	= new xbkLayer( this );
	this.controlMax		= new xbkLayer( this );
	this.controlX 		= new xbkLayer( this );
	this.resize 		= new xbkLayer( this );
	this.drag = new xbkDragEvent();
	this.drag.enableDragEvent( this.dragableBody );
	this.drag.setBoundedToParent( true );
	// images
	this.controlMin.setInnerHTML ( "<img src='../images/xbkWindow/min1.gif'>" );
	this.controlMax.setInnerHTML ( "<img src='../images/xbkWindow/max1.gif'>" );
	this.controlX.setInnerHTML( "<img src='../images/xbkWindow/close1.gif'>" );
	this.iconPanel.setInnerHTML(  "<img src='../images/xbkWindow/icon.gif'>" );
	// attributes
	this.controlX.setBorderLeft( 1,"black");
	this.controlMin.setBorderLeft( 1,"black");
	this.controlMax.setBorderLeft( 1,"black");
	this.controlMin.setBorderBottom( 1,"gray");
	this.controlMax.setBorderBottom( 1,"gray");
	this.controlX.setBorderBottom( 1,"gray");
	this.dragableBody.setBorderBottom( 1,"gray");
	this.iconPanel.setBorderBottom( 1,"gray");
	
	this.dragableBody.layer.style.cursor = "move";
	
	this.navHeight = 22;
	this.navWidth  = 20;
	
	// original configure
	this.firstInstX = true;
	this.firstInstY = true;
	this.firstInstW = true;
	this.firstInstH = true;
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;

	// windows size state info
	this.FULL_SIZE = false;
	this.MIN_SIZE	= false;

	// navigate events
	this.controlX.setEvent("onclick", xbkCloseWinClick );
	this.controlMin.setEvent("onclick", xbkMinWinClick );
	this.controlMax.setEvent("onclick", xbkMaxWinClick );
	this.iconPanel.setEvent("onclick", xbkIconWinClick );
	

/**
 *	setWindowTitle
 *	Set the title and style for the xbkWindow.
 *
 *	@public
 *	@param text	String	Text for the title.
 *	@param style	String	The class style name.
 *	@return None
 *
 */
	function setWindowTitle(text,style){
		this.dragableBody.setInnerHTML("<table><tr><td class='"+style+"'>"+text+"</td></tr><table>");
	}
	this.setWindowTitle = setWindowTitle;

	// overload super class setWidth()
	this.superSetWidth = this.setWidth;
	function __setWidth ( num ) {
		// remember state
		if (this.firstInstW) {
			this.w = num;
			this.firstInstW = false;
		}
	
		this.superSetWidth( num );
		this.dragableBody.setWidth( this.width() - 80 );
		this.mainBody.setWidth( this.width() - 2 );
		this.controlMin.setWidth( this.navWidth );
		this.controlMax.setWidth( this.navWidth );
		this.controlX.setWidth( this.navWidth );
		this.iconPanel.setWidth( this.navWidth );
		
		// set only when width is known
		this.controlX.setLeft( this.width() - this.navWidth - 2 );
		this.controlMax.setLeft( this.width() - this.navWidth*2 - 3 );
		this.controlMin.setLeft( this.width() - this.navWidth*3 - 3 );
	}
	this.setWidth = __setWidth;
	
	this.superSetHeight = this.setHeight;
	function __setHeight ( num ) {
		if (this.firstInstH) {
			this.h = num;
			this.firstInstH = false;
		}
		this.superSetHeight( num );
		this.dragableBody.setHeight( this.navHeight );
		this.mainBody.setHeight( this.height() - this.navHeight - 2 );
		this.controlMin.setHeight( this.navHeight );
		this.controlMax.setHeight( this.navHeight );
		this.controlX.setHeight( this.navHeight );
		this.iconPanel.setHeight( this.navHeight );
	}
	this.setHeight = __setHeight;
	
	this.superSetTop = this.setTop;
	function __setTop( num ) {
		if (this.firstInstX) {
			this.x = num;
			this.firstInstX = false;
		}
		this.superSetTop( num );
		this.dragableBody.setTop( 0 );
		this.mainBody.setTop( this.navHeight );
		this.controlMin.setTop( 0 );
		this.controlMax.setTop( 0 );
		this.controlX.setTop( 0 );
		this.iconPanel.setTop( 0 );
	}
	this.setTop = __setTop;
	
	this.superSetLeft = this.setLeft;
	function __setLeft( num ) {
		if (this.firstInstY) {
			this.y = num;
			this.firstInstY = false;
		}
		this.superSetLeft( num );
		this.dragableBody.setLeft( this.navWidth );
		this.mainBody.setLeft( 0 );
	}
	this.setLeft = __setLeft;
	
	this.superSetVis = this.setVis;
	function __setVis( sType ) {
		this.superSetVis( sType );
		this.dragableBody.setVis( sType );
		this.mainBody.setVis( sType );
		this.controlMin.setVis( sType );
		this.controlMax.setVis( sType );
		this.controlX.setVis( sType );
		this.iconPanel.setVis( sType );
	}
	this.setVis = __setVis;
	
	// overload super class setInnerHTML function
	function __setInnerHTML( sHTML ) {
		this.mainBody.setInnerHTML( sHTML );
	}
	this.setInnerHTML = __setInnerHTML;
	
	// init mainBody object
	with( this.mainBody ) {
		setBgColor("ghostwhite");
	}
	// init dragableBody object
	with( this.dragableBody ) {
		setBgColor("silver");
	}
	
	
	this.closeWinFunc	= null;
	this.minWinFunc		= null;
	this.maxWinFunc		= null;
	this.iconWinFunc	= null;
/**
 *	setCloseWindowHandler
 *	Set the close window handler.
 *
 *	@public
 *	@param func	Handler	Handler to be call when the window close.
 *	@return None
 *
 */
	function setCloseWindowHandler( func ) {
		this.closeWinFunc = func;
	}
	this.setCloseWindowHandler = setCloseWindowHandler;
/**
 *	setMinWindowHandler
 *	Set the minimize window handler.
 *
 *	@public
 *	@param func	Handler	Handler to be call when the window minimize.
 *	@return None
 *
 */
	function setMinWindowHandler( func ) {
		this.minWinFunc = func;
	}
	this.setMinWindowHandler = setMinWindowHandler;
/**
 *	setMaxWindowHandler
 *	Set the maximize window handler.
 *
 *	@public
 *	@param func	Handler	Handler to be call when the window maximize.
 *	@return None
 *
 */
	function setMaxWindowHandler( func ) {
		this.maxWinFunc = func;
	}
	this.setMaxWindowHandler = setMaxWindowHandler;
/**
 *	setIconWinHandler
 *	Set the icon click handler.
 *
 *	@public
 *	@param func	Handler	Handler to be call when the icon is click.
 *	@return None
 *
 */
	function setIconWinHandler( func ) {
		this.iconWinFunc = func;
	}
	this.setIconWinHandler = setIconWinHandler;
	
}
xbkWindow.prototype = new xbkLayer;

// static function
function findOutWinLayerById ( id ) {
	var cur = xbkLayer.all[ id ];
	var outerParent = null;
	while( cur != null ) {
		cur = cur.getParent();
		if ( cur != null ) {
			outerParent = cur;
		}
	}
	return outerParent;
}

	//this.iconWinFunc	= null;

function xbkCloseWinClick() {
	var outerParent = findOutWinLayerById( this.id );
	if ( outerParent ) {
		if (outerParent.closeWinFunc) {
			outerParent.closeWinFunc();
		}	
		outerParent.setVis( "hidden" );
	}
	
}

function xbkMaxWinClick() {
	var outerParent = findOutWinLayerById( this.id );
	if ( outerParent ) {
		if ( outerParent.maxWinFunc ) {
			outerParent.maxWinFunc();
		}
		if (outerParent.MIN_SIZE || outerParent.FULL_SIZE) {
			//alert(1);
			xbkWindow_setNormal( outerParent );
			outerParent.FULL_SIZE = false;	
		}
		else {
			xbkWindow_setFULL( outerParent );
			outerParent.FULL_SIZE = true;
		}
	}
}
function xbkMinWinClick() {
	var outerParent = findOutWinLayerById( this.id );
	if ( outerParent ) {
		if (outerParent.minWinFunc) {
			outerParent.minWinFunc();
		}
		//alert("min window click..." + " id: " + outerParent.id );
		if (outerParent.MIN_SIZE || outerParent.FULL_SIZE) {
			//alert(1);
			xbkWindow_setNormal( outerParent );
			outerParent.MIN_SIZE = false;
			outerParent.FULL_SIZE = false;
		}
		else {
			xbkWindow_setMIN( outerParent );
			outerParent.MIN_SIZE = true;
		}
	}
	
}

function xbkIconWinClick() {
	var outerParent = findOutWinLayerById( this.id );
	if ( outerParent ) {
		if (outerParent.iconWinFunc) {
			outerParent.iconWinFunc();
		}
		//alert("Icon window click..." + " id: " + outerParent.id );
	}
}

function xbkWindow_setMIN( obj ) {
	with ( obj ) {
		var minWin = 0;
		for (i in xbkWindow.all) {
			//alert(xbkWindow.all[i].MIN_SIZE)
			if (xbkWindow.all[i].MIN_SIZE == true) {
				
				minWin++;	
			}
		}
		
		//setVis( "hidden" );

		(minWin==0)?minWin=1:minWin++;
		setTop(xbkUtil.APP_HEIGHT() - (minWin*23));
		setLeft(0);
		setWidth( obj.w );
		mainBody.setVis( "hidden" );
		setHeight(obj.navHeight+2);
	}
}



function xbkWindow_setFULL( obj ) {
	with ( obj ) {
		setTop(0);
		setLeft(0);
		setWidth( xbkUtil.APP_WIDTH() );
		setHeight( xbkUtil.APP_HEIGHT() );
		mainBody.setVis( "show" );
	}
}

function xbkWindow_setNormal( obj ) {
	with ( obj ) {
		setTop(obj.x);
		setLeft(obj.y);
		setWidth( obj.w );
		setHeight( obj.h );
		mainBody.setVis( "show" );
	}
}
