// @notFinished
/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkTreeNode
 *	
 *	The xbkTreeNode data structure holds information about an item of a xbkTree.
 *
 *	@author		xbkapi			xbkapi@yahoo.com
 *	@example	exampleTitle		pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.2
 *	@extends	xbkObject	extendsComment
 *	@constructor	xbkTreeNode
 *	@param bFolder Boolean	If this xbkTreeNode is a folder or file.
 *	@param fHandler Reference	A reference to a handler function for this xbkTreeNode.
 *	@param xbkTreeRef xbkTree	A reference to the xbkTree that created this xbkTreeNode.
 *      
 */
xbkTreeNode.all = [];
function xbkTreeNode(bFolder,fHandler,xbkTreeRef) {
	this.superClass = xbkObject;
   	this.superClass( "xbkTreeNode" );
	this.parent= null;
	this.children= null;
	this.data= null;
	this.img= null;
	this.cImage= null;
	this.oImage= null;
	this.aimage= "";
	this.bFolder= bFolder;
	this.clickFunc= fHandler;
	this.bOpen= false;
	this.bNeedWrite= true;
	this.bCached= false;
	this.text= null;
	this.tree= xbkTreeRef;
	this.id= xbkTreeRef.id +"_xbkTreeNode_"+ xbkUtil.xbkGLOBAL_COUNT++;
	this.hidden= false;
	xbkTreeNode.all[this.id]= this;
	this.level= 0;
	/**
	 *	hidden
	 *	Hide a folder or file, default to false.
	 *	
	 *	@public
	 *	@param bHide Boolean
	 */
	function hidden(bHide){
		this.hidden = bHide;
	}
	/**
	 *	addChildNode
	 *	Add a xbkTreeNode.
	 *	
	 *	@public
	 *	@param xbkNewNode xbkTreeNode A xbkTreeNode to add.
	 */
	function addChildNode( xbkNewNode ) {
		xbkNewNode.parent = this;
		var newLink = {
			data: xbkNewNode,
			next: null
		}
		var cur = this.children;
		if ( cur != null ) {
			while ( cur.next != null ) {
				cur = cur.next;
			}
			cur.next = newLink;
		}
		else {
			this.children = newLink;
		}
	}
	this.addChildNode = addChildNode;
	/**
	 *	removeChildNode
	 *	Add a xbkTreeNode.
	 *	
	 *	@public
	 *	@param	id	String Id of a xbkTreeNode to remove.
	 */
	function removeChildNode( id ) {
		var node = xbkTreeNode.all[id];
		if ( node == null ) {
			return;
		}
		var removeParent = node.parent;
		var cur = removeParent.children;
		var last = null;
		while ( cur != null ) {
			var curNode = cur.data;
			if ( curNode.id == id ) {
				if ( last == null ) {
					removeParent.children = cur.next;
				}
				else {
					last.next = cur.next;
				}
				break;
			}
			last = cur;
			cur = cur.next;
		}
	}
	this.removeChildNode = removeChildNode;

	function createTREE_HTML_STRING( level ) {
		if (!this.hidden) {
			var sImg = null;
			var sSign = "";
			if ( this.bFolder ) {
				if ( this.bOpen ) {
					(this.oimage)?sImg = this.oimage:sImg = this.tree.imagePATH+this.tree.fopenImg;
					sSign = "<img border=0 src='"+this.tree.imagePATH+this.tree.minusImg+"'>";
				}
				else {
					(this.img)?sImg = this.img:sImg = this.tree.imagePATH+this.tree.fcloseImg;			
					sSign = "<img border=0 src='"+this.tree.imagePATH+this.tree.plusImg+"'>";
				}
			}
			else {(this.img)?sImg = this.img:sImg=this.tree.imagePATH+this.tree.defaultImg;}	
			var out = "<nobr><a href='#'  onmousedown='" +
				"xbkTreeClick(\""+this.id+"\");' class='" + this.tree.itemCSS + "'>"+sSign+ 
				"<img border=0 src='" + sImg + "' > " +  // width='16px' height='16px'
				this.text + this.aimage +"</a></nobr><br>";
			if ( this.bFolder && this.bOpen && this.children != null ) {
				var cur = this.children;
				while ( cur != null ) {
					out += cur.data.createTREE_HTML_STRING(level+this.tree.trv_INDENT);	
					cur = cur.next;
				}
			}
			this.level = level;
			return "<img src='"+this.tree.imagePATH+this.tree.transImg+"' height='"+this.tree.trv_HEIGHT+"' width='"+level+"'>" + out;	
		}
		return "";
	}
	this.createTREE_HTML_STRING = createTREE_HTML_STRING;
}
xbkTreeNode.prototype = new xbkObject;
