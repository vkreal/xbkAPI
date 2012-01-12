/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkTree
 *	
 *	The xbkTree class display information in a hierarchal tree system.
 *
 *	@author		xbkapi		xbkapi@yahoo.com
 *	@example	exampleTitle	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.2
 *	@extends	xbkLayer	extendsComment
 *	@constructor	xbkTree
 *	@param inst String	The name or id to be use for this xbkMenu.
 *	@param parent xbkLayer	The parent of the xbkMenu object if it has one.
 *      
 */
xbkTree.all = [];
function xbkTree(inst,parent) {
	this.superClass=xbkLayer;
	this.superClass(parent);
	this.inst = inst;
	this.imagePATH = "../images/xbkTree/";
	this.defaultImg = "default.gif";
	this.minusImg	= "minus.gif";
	this.plusImg	= "plus.gif";
	this.fopenImg	= "folderOpen.gif";
	this.fcloseImg	= "folderClosed.gif";
	this.transImg   = "1by1.gif";	
	this.root=new xbkTreeNode( true,null,this );
	this.setOverflow("auto");
	this.itemCSS="treeText";
	this.selected=null;
	this.LeftOffset = 5;
	this.TopOffset = 0;
	this.trv_INDENT = 20;
	this.trv_HEIGHT = 20;
	this.trv_V_PAD = 2;
	xbkTree.all[inst]=this;
	
	/**
	 *	getSelectedNode
	 *	Get the current selected xbkTreeNode.
	 *	
	 *	@public
	 *	@return xbkTreeNode
	 */
	function getSelectedNode(){
		return this.selected;
	}
	this.getSelectedNode = getSelectedNode;
	/**
	 *	setImagePath
	 *	Set the path for the image location folder.
	 *	
	 *	@public
	 *	@param path String location of images folder. 
	 *	@return None
	 */
	function setImagePath( path ) {
		this.imagePATH = path;
	}
	this.setImagePath = setImagePath;
	/**
	 *	getChildNode
	 *	Creates a child xbkTreeNode and return it.
	 *	
	 *	@public
	 *	@param text String Text that appears for the item. 
	 * 	@param fHandler Reference	Reference to a handler function for this xbkTreeNode.
	 *	@param img String Image to use.
	 *	@return xbkTreeNode	Reference to a xbkTreeNode note: see xbkTreeNode class
	 */
	function getChildNode(text,fHandler,img) {
		var node = new xbkTreeNode(false,fHandler,this);
		(img)?node.image = img:null;
		node.text = text;
		return node;
	}
	this.getChildNode = getChildNode;
	/**
	 *	getParentNode
	 *	Creates a parent xbkTreeNode and return it.
	 *	
	 *	@public
	 *	@param text String Text that appears for the item. 
	 * 	@param fHandler Reference	Reference to a handler function for this xbkTreeNode.
	 *	@param closeImg String Image to use for folder close. 
	 *	@param openImg String Image to use for folder open. 
	 *	@return xbkTreeNode	Reference to a xbkTreeNode note: see xbkTreeNode class
	 */
	function getParentNode( text,fHandler,closeImg,openImg ) {
		var node = new xbkTreeNode(true,fHandler,this);
		(closeImg)?node.image=node.oimage=closeImg:null;
		(openImg)?node.oimage=openImg:null;
		node.text=text;
		return node;
	}
	this.getParentNode = getParentNode;
	/**
	 *	addRoot
	 *	Add a root xbkTreeNode to the current xbkTree.
	 *	
	 *	@public
	 *	@param node xbkTreeNode A xbkTreeNode to be added to the root level. 
	 *	@return None
	 */
	function addRoot( node ) {
		this.root.addChildNode( node );
		this.draw();
	}
	this.addRoot = addRoot;
	/**
	 *	removeNode
	 *	Remove a node by id from the current xbkTree.
	 *	
	 *	@public
	 *	@param id String
	 *	@return None
	 */
	function removeNode( id ) {
		var node = xbkTreeNode.all[id];
		node.removeChildNode( id );
		this.draw();
	}
	this.removeNode = removeNode;
	/**
	 *	draw
	 *	Draw the xbkTree.
	 *	
	 *	@public
	 *	@return None
	 */
	function draw() {
		var output = "";
		var cur = this.root.children;
		while ( cur != null ) {
			output += cur.data.createTREE_HTML_STRING(this.trv_V_PAD);
			cur = cur.next;
		}
		this.layer.innerHTML = output;	
	}
	this.draw = draw;
}
xbkTree.prototype 	= new xbkLayer;

/////////////////////////////////////////////////////////////////////////
///////////////////// PRIVATE HELPER FUNCTIONS //////////////////////////
/////////////////////////////////////////////////////////////////////////
function xbkTreeClick(id) {
	var thisNode = xbkTreeNode.all[id];
	(thisNode.tree)?thisNode.tree.selected = thisNode:null;
	if ( thisNode.clickFunc ) {
		openFolder = thisNode.clickFunc(thisNode);
	}
	if (thisNode.bFolder) {
		thisNode.bNeedWrite = true;
		(thisNode.bOpen)?thisNode.bOpen = false:thisNode.bOpen = true;
		(thisNode.tree)?thisNode.tree.draw():null;
	}
}
