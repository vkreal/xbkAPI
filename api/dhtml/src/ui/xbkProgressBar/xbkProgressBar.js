/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */


/**
 *	xbkAPI
 *	xbkProgressBar
 *	
 *	The xbkProgressBar class provides visual feedback to users about the progress of task, such as loading an application or querying a database.
 *
 *	@author		xbkapi 		xbkapi@yahoo.com
 *	@exmaple	xbkProgressBar 	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkLayer	extendsComment
 *  	@constructor xbkProgressBar
 *	@param inst String	The name or id to be use for this xbkProgressBar.
 *	@param parent xbkLayer	The parent of the xbkProgressBar object if it has one.
 *	@version    1.0
 *  
 */
xbkProgressBar.all = [];
function xbkProgressBar(inst,parent) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.inst = inst;
	xbkProgressBar.all[this.inst] = this;
	this.percent	= 0;
	this.startText = "";
	this.endText = "";
	this.bar = new xbkLayer();
	this.startStyleClass = "";	
	this.endStyleClass = "";
	/**
	 *	setStyleClass
	 *	Set the style className for the current xbkProgessBar
	 *	
	 *	@public
	 *	@param startStyleClass String The style class name for the start.
	 *	@param endStyleClass String The style class name for the end.
	 *	@return None
	 */
	function setStyleClass(startStyleClass,endStyleClass){
		this.startStyleClass = startStyleClass;	
		this.endStyleClass = endStyleClass;
	}
	this.setStyleClass = setStyleClass;

	this.xbkProgressBar_setBorderLeft = this.setBorderLeft;
	function xbkProgressBar_setBorderLeft_OL(num, sBorder) {
		(ns6)?this.xbkProgressBar_setBorderLeft(num,sBorder):this.bar.setBorderLeft(num, sBorder);
	}
	this.setBorderLeft = xbkProgressBar_setBorderLeft_OL;

	this.xbkProgressBar_setBorderTop = this.setBorderTop;
	function xbkProgressBar_setBorderTop_OL(num, sBorder) {
		(ns6)?this.xbkProgressBar_setBorderTop(num,sBorder):this.bar.setBorderTop(num, sBorder);
	}
	this.setBorderTop = xbkProgressBar_setBorderTop_OL;

	this.xbkProgressBar_setBorderBottom = this.setBorderBottom;
	function xbkProgressBar_setBorderBottom_OL(num, sBorder) {
		(ns6)?this.xbkProgressBar_setBorderBottom(num,sBorder):this.bar.setBorderBottom(num, sBorder);
	}
	this.setBorderBottom = xbkProgressBar_setBorderBottom_OL;

	this.xbkProgressBar_setBorderRight = this.setBorderRight;
	function xbkProgressBar_setBorderRight_OL(num, sBorder) {
		(ns6)?this.xbkProgressBar_setBorderRight(num,sBorder):this.bar.setBorderRight(num, sBorder);
	}
	this.setBorderRight = xbkProgressBar_setBorderRight_OL;	

	this.xbkProgressBar_setWidth = this.setWidth;
	function xbkProgressBar_setWidth_OL( num ) {
		this.xbkProgressBar_setWidth( num );
		this.bar.setWidth( num );
	}
	this.setWidth = xbkProgressBar_setWidth_OL;	

	this.xbkProgressBar_setHeight = this.setHeight;
	function xbkProgressBar_setHeight_OL( num ) {
		this.xbkProgressBar_setHeight( num );
		this.bar.setHeight( num );
	}
	this.setHeight = xbkProgressBar_setHeight_OL;

	this.xbkProgressBar_setLeft = this.setLeft;

	function xbkProgressBar_setLeft_OL( num ) {
		this.xbkProgressBar_setLeft( num );
		this.bar.setLeft((ns6)?num+1:num);
	}
	this.setLeft = xbkProgressBar_setLeft_OL;

	this.xbkProgressBar_setTop = this.setTop;
	function xbkProgressBar_setTop_OL( num ) {
		this.xbkProgressBar_setTop( num );
		this.bar.setTop((ns6)?num+1:num);
	}
	this.setTop = xbkProgressBar_setTop_OL;
	
	this.xbkProgressBar_setVis = this.setVis;
	function xbkProgressBar_setVis_OL( sType ) {
		this.xbkProgressBar_setVis(sType); 
		this.bar.setVis(sType);	
	}	
	this.setVis = xbkProgressBar_setVis_OL;

	this.xbkProgressBar_setZIndex = this.setZIndex;
	function xbkProgressBar_setZIndex_OL( num ) {
		this.xbkProgressBar_setZIndex ( num );
		this.bar.setZIndex( num );
	}
	this.setZIndex = xbkProgressBar_setZIndex_OL;

	function buildHTMLSTRING(isOuter) {
		var styleClass;	
		(isOuter)?styleClass = this.endStyleClass:styleClass = this.startStyleClass;
		return "<div align='center' class='"+styleClass+"' >" + this.startText + " " + this.percent + "%" + this.endText + "</div>";
	}
	this.buildHTMLSTRING = buildHTMLSTRING;
	
	this.xbkProgressBar_setInnerHTML = this.setInnerHTML;
	function xbkProgressBar_setInnerHTML_OL(sOuterHTML, sBarHTML) {
		this.xbkProgressBar_setInnerHTML( sOuterHTML );
		this.bar.setInnerHTML( sBarHTML );
	}
	this.setInnerHTML = xbkProgressBar_setInnerHTML_OL;

	
	this.xbkProgressBar_setBgColor = this.setBgColor;
	function xbkProgressBar_setBgColor_OL( startColor, endColor ) {
		this.xbkProgressBar_setBgColor(startColor);
		this.bar.setBgColor(endColor);
	}
	this.setBgColor = xbkProgressBar_setBgColor_OL;
	/**
	 *	setPercentComplete
	 *	Set the percentage of completion.
	 *	
	 *	@public
	 *	@param num Number Use the number 1-100 to represent the percent.
	 *	@return None
	 */
	function setPercentComplete(num) {
		( num > 100 )?num = 100:null;
		( num < 0 )?num = 0:null;
		this.percent = num;
		this.setInnerHTML(this.buildHTMLSTRING(true),this.buildHTMLSTRING(false));	
		this.bar.setClipLeft(Math.floor( this.getWidth() * (num/100)));
	}
	this.setPercentComplete = setPercentComplete;
}
xbkProgressBar.prototype = new xbkLayer();


