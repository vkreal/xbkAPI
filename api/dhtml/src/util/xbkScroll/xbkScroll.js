/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkScroll
 *	
 *	The xbkScroll Class creates xbkLayer that scroll with the browser.
 *
 *	@author		xbkapi 		xbkapi@yahoo.com
 *	@example	exampleTitle	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	2.1
 *	@extends	xbkObject
 *	@constructor	xbkScroll
 *      @param inst String	The name or id to be use for this xbkScroll.
 *	@param xbkLayerObj xbkLayer	The xbkLayer to scroll.
 *
 */
function xbkScroll(inst,xbkLayerObj) {
	this.superClass=xbkObject;
   	this.superClass("xbkScroll");
	this.xbklayer=xbkLayerObj;
	this.inst=inst;
	this.initTop=this.xbklayer.top();
	this.initLeft=this.xbklayer.left();
	this.scrollDelay=100;
/**
 *	setScrollDelay
 *	Set the scroll delay.
 *
 *	@public
 * 	@param	num	Number	Scroll delay in milliseconds.
 *	@return None
 *
 */
	function setScrollDelay(num){
		this.scrollDelay=num;
	}

/**
 *	scroll
 *	Start the scroll.
 *
 *	@public
 *	@return None
 *
 */
	function scroll(){
    		if (xbkLayerObj.left() < document.body.scrollLeft+this.initLeft){
			this.xbklayer.moveBy(1,0);
        		setTimeout(inst+".scroll()", this.scrollDelay);
        	}
        	else if (xbkLayerObj.top() < document.body.scrollTop+this.initTop){
			this.xbklayer.moveBy(0,1);
            		setTimeout(inst+".scroll()", this.scrollDelay);
        	}
        	else if (xbkLayerObj.left() > document.body.scrollLeft+this.initLeft){
                	this.xbklayer.moveBy(-1,0);
                	setTimeout(inst+".scroll()", this.scrollDelay);
        	}
        	else if (xbkLayerObj.top() > document.body.scrollTop+this.initTop){
        		this.xbklayer.moveBy(0,-1);
                	setTimeout(inst+".scroll()", this.scrollDelay);
        	}
	}
	this.scroll=scroll;
}
xbkScroll.prototype = new xbkObject;