/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkList
 *	
 *	The xbkList class display information in a list type system.
 *
 *	@author		xbkapi			xbkapi@yahoo.com
 *	@example	exampleTitle		pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.0
 *	@extends	xbkLayer	extendsComment
 *	@constructor	xbkList
 *	@param inst String	The name or id to be use for this xbkList.
 *	@param parent xbkLayer	The parent of the xbkList object.
 *      
 */
xbkList.all = [];
function xbkList( inst, parent ) {
	this.superClass = xbkLayer;
	this.superClass(parent);
	this.inst = inst;
	this.contents = [];	
	this.heading  = [];
	this.setOverflow( "auto" );
	xbkList.all[inst] = this;
	this.selectedColor = "5D5BAA";
	/**
	 *	setSelectedColor
	 *	Set the background color of the selected row.
	 *	
	 *	@public
	 *	@param color String The color to use. 
	 *	@return None
	 */
	function setSelectedColor( color ) {
		this.selectedColor = color;
	}	
	/**
	 *	aHeading
	 *	Set the heading of the xbkList.
	 *	
	 *	@public
	 *	@param aHeading Array The heading to be use. 
	 *	@return None
	 */
	function addHeading( aHeading ) {
		this.heading = aHeading;
		this.draw();
	}
	this.addHeading = addHeading;
	/**
	 *	addRow
	 *	Set a row to the xbkList.
	 *	
	 *	@public
	 *	@param id String A unique id for the row. 
	 *	@param aRow Array The row html string. 
	 *	@param fhandler Reference A reference to a function handler for the row. 
	 *	@return None
	 */
	function addRow( id, aRow, fhandler ) {
		var node=new xbkNode(id,null,null,null,null,fhandler,this);
		node.aRow=aRow;
		//this.contents[id] = {id:id,aRow:aRow,fhandler:fhandler};
		this.contents[id] = node;
		this.draw();
	}
	this.addRow = addRow;
	/**
	 *	removeRow
	 *	Remove the row by id.
	 *	
	 *	@public
	 *	@param id String A unique id for the row. 
	 *	@return None
	 */
	function removeRow( id ) {
		var tempArray = [];
		for (i in this.contents) { 
			if (this.contents[i].id != id) {
				tempArray[ this.contents[i].id ] = this.contents[i];
			}
		}
		this.contents = tempArray;
		this.draw();
	}
	this.removeRow = removeRow;

	this.xbkList_setWidth = this.setWidth;
	function xbkList_setWidth_OL(num){
		this.xbkList_setWidth(num);
		this.draw();
	}
	this.setWidth=xbkList_setWidth_OL;

	function draw() {
		var out = "<table width='100%' CELLPADDING='2' CELLSPACING='0' border=0>";
		out += "<tr>";
		var i;
		for(i in this.heading) {
			out += "<td class='colHeader'>" + this.heading[i] + "</td>";
		}
		out += "</tr>";	
		
		var k = 0;
		for (i in this.contents) {
			out += "<tr id='"+this.contents[i].id+"' onmouseover='xbkList_ONMOUSEOVER(this);' onmouseout='xbkList_ONMOUSEOUT(this);' onmousedown='xbkList_ONCLICK(this, \""+this.contents[i].id+"\",\""+this.inst+"\");'>";
			for (var j in this.contents[i].aRow) {
				var node = this.contents[i].aRow;
				//if(k%2==0){
					//out += "<td class='xbkListCol2'><nobr>" + node[j] + "</nobr></td>";
			//	}
			//	else{
					out += "<td class='xbkListCol'><nobr>" + node[j] + "</nobr></td>";
			//	}
			}
			k++;
			out += "</tr>";	
		}
		out += "</table>\n";
		this.layer.innerHTML = out;
	}
	this.draw = draw;
	

	this.selected = null;
	
	function setSelectedById( id ) {
		
	}
	this.setSelectedById = setSelectedById;
	
	function setSelectedByObj( rowObj ) {
		if (this.selected) {
			this.selected.style.backgroundColor = (this.getBgColor())?this.getBgColor():"";
			this.selected.style.color = "black";
		}
		this.selected = rowObj;
		rowObj.style.backgroundColor = (this.selectedColor)?this.selectedColor:"5D5BAA";
		rowObj.style.color = "white";
	}
	this.setSelectedByObj = setSelectedByObj;

	function getELEMENTDIV(id) {
		if(ns6){
			return document.getElementById(id);
		}
		else {
			var node = document.all[id];
			if(node){
				return node;
			}
			else { return eval(id); }
		}
	}
	this.getELEMENTDIV = getELEMENTDIV;
}
xbkList.prototype 	= new xbkLayer;


function xbkList_ONMOUSEOVER( obj ) {
	//obj.className = "onmouseoverCELL";
	//obj.style.backgroundColor = "blue";
}
function xbkList_ONMOUSEOUT( obj ) {
	//obj.style.backgroundColor = "white";
}
function xbkList_ONCLICK(obj,id,inst) {
	var curList = xbkList.all[inst];
	curList.setSelectedByObj( obj );
	if (curList.contents[obj.id].fhandler) {
		curList.contents[obj.id].fhandler( obj );
	}
}





