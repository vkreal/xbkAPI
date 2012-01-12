/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkFileExplorer
 *	
 *	The xbkFileExplorer class provide a file explorer.
 *
 *	@author		xbkapi		xbkapi@yahoo.com
 *	@example	exampleTitle	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.2
 *	@extends	xbkLayer	extendsComment
 *	@constructor	xbkFileExplorer
 *	@param inst String	The name or id to be use for this xbkFileExplorer.
 *	@param parent xbkLayer	The parent of the xbkFileExplorer object if it has one.
 *	@version    1.0
 *      
 */
xbkFileExplorer.all=[];
function xbkFileExplorer(inst,parent) {
	this.superClass = xbkLayer;
	this.superClass( parent );
	this.inst = inst;
	xbkFileExplorer.all[this.id]=this;
	this.treeWidth = 150;
	this.tree = new xbkTree( "this.tree", this ); 
	this.icon = new xbkIconBrowser( "this.icon", this );
	this.icon.setHighLightColor("ghostwhite");

	this.bwLeft=0;
	this.bwTop=0;
	this.bwRight=0;
	this.bwBottom=0;
	
	this.iconWidth = null;	
	this.iconHeight = null;
	//this.tree.setBgColor("yellow");
	this.icon.setBgColor("silver");

	
	this.xbkFileExplorer_setBorderBottom = this.setBorderBottom;
	function xbkFileExplorer_setBorderBottom_OL(num,color){
		this.bwBottom = num;
		this.xbkFileExplorer_setBorderBottom(num,color);
		(this.iconHeight)?this.icon.setHeight(this.iconHeight-this.bwTop-this.bwBottom):null;
	}
	this.setBorderBottom = xbkFileExplorer_setBorderBottom_OL;

	this.xbkFileExplorer_setBorderTop = this.setBorderTop;
	function xbkFileExplorer_setBorderTop_OL(num,color){
		this.bwTop = num;
		this.xbkFileExplorer_setBorderTop(num,color);
		(this.iconHeight)?this.icon.setHeight(this.iconHeight-this.bwTop-this.bwBottom):null;
	}
	this.setBorderTop = xbkFileExplorer_setBorderTop_OL;

	this.xbkFileExplorer_setBorderLeft = this.setBorderLeft;
	function xbkFileExplorer_setBorderLeft_OL(num,color){
		this.bwLeft = num;
		this.xbkFileExplorer_setBorderLeft(num,color);
		(this.iconWidth)?this.icon.setWidth(this.iconWidth-this.bwRight-this.bwLeft):null;
	}
	this.setBorderLeft = xbkFileExplorer_setBorderLeft_OL;

	this.xbkFileExplorer_setBorderRight = this.setBorderRight;
	function xbkFileExplorer_setBorderRight_OL(num,color){
		this.bwRight = num;
		this.xbkFileExplorer_setBorderRight(num,color);
		(this.iconWidth)?this.icon.setWidth(this.iconWidth-this.bwRight-this.bwLeft):null;
	}
	this.setBorderRight = xbkFileExplorer_setBorderRight_OL;

	this.xbkFileExplorer_setVis = this.setVis;
	function xbkFileExplorer_setVis_OL(vis){
		this.xbkFileExplorer_setVis(vis);
		this.tree.setVis(vis);
		this.icon.setVis(vis);
	}
	this.setVis = xbkFileExplorer_setVis_OL;

	this.xbkFileExplorer_setHeight = this.setHeight;
	function xbkFileExplorer_setHeight_OL(num){
		this.xbkFileExplorer_setHeight(num);
		this.tree.setHeight(num);
		this.icon.setHeight(num);
		this.iconHeight = num;
		this.icon.setHeight(this.iconHeight-this.bwTop-this.bwBottom);
	}
	this.setHeight = xbkFileExplorer_setHeight_OL;

	this.xbkFileExplorer_setWidth = this.setWidth;
	function xbkFileExplorer_setWidth_OL(num){
		this.xbkFileExplorer_setWidth(num);
		this.tree.setWidth(this.treeWidth);
		this.iconWidth=num-this.treeWidth;
		this.icon.setWidth(this.iconWidth-this.bwRight-this.bwLeft);
	}
	this.setWidth = xbkFileExplorer_setWidth_OL;	

	this.xbkFileExplorer_setTop = this.setTop;
	function xbkFileExplorer_setTop_OL(num){
		this.xbkFileExplorer_setTop(num);
		this.tree.setTop(0);
		this.icon.setTop(0);
	}
	this.setTop = xbkFileExplorer_setTop_OL;	

	this.xbkFileExplorer_setLeft = this.setLeft;
	function xbkFileExplorer_setLeft_OL(num){
		this.xbkFileExplorer_setLeft(num);
		this.tree.setLeft(0);
		this.icon.setLeft(this.treeWidth);
	}
	this.setLeft = xbkFileExplorer_setLeft_OL;
	/**
	 *	getParentNode
	 *	Creates a parent xbkTreeNode Folder and return it.
	 *	
	 *	@public
	 *	@param text String Text that appears for the item. 
	 * 	@param fHandler Reference	Reference to a handler function for this xbkTreeNode.
	 *	@param closeImg String Image to use for folder close. 
	 *	@param openImg String Image to use for folder open. 
	 *	@return xbkTreeNode	Reference to a xbkTreeNode note: see xbkTreeNode class
	 */
	function getParentNode( text,fHandler,closeImg,openImg ) {
		return this.tree.getParentNode( text,fHandler,closeImg,openImg );
	}
	this.getParentNode = getParentNode;
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
	function getChildNode(text,fHandler,img, vis) {
		var node = this.tree.getChildNode(text,fHandler,img);
		return node;
	}
	this.getChildNode = getChildNode;
	function addRoot( node ) {
		this.tree.addRoot( node );
	}
	this.addRoot = addRoot;
	/**
	 *	removeSelectedItem
	 *	Remove the selected item.
	 *
	 *	@public
	 *	@return	None
	 */
	function removeSelectedItem(){
		if(this.icon.selected){
			var id = this.icon.selected.id;
			this.icon.removeItem(id);
			this.tree.removeNode(id);
		}
	}
	this.removeSelectedItem = removeSelectedItem;

	function drawIcon(nodeList){
		this.icon.removeALL();
		var cur = nodeList.children;
		while(cur){
			var node = cur.data;
			var image = "";
			if (node.bFolder) {
				image=	"../images/xbkIconView/folderLarge.gif"
			}
			else {
				image = "../images/xbkIconView/docL.gif"
			}
			this.icon.addItem(node.id,node.text,image);
			cur = cur.next;
		}		

	}
	this.drawIcon = drawIcon;
}
xbkFileExplorer.prototype = new xbkLayer;

////////////// OVERLOAD xbkTree METHODS ////////////////////
function xbkTreeClick(id) {
	var thisNode = xbkTreeNode.all[id];
	(thisNode.tree)?thisNode.tree.selected = thisNode:null;
	if (thisNode.bFolder) {
		thisNode.bNeedWrite = true;
		(thisNode.bOpen)?thisNode.bOpen = false:thisNode.bOpen = true;
		(thisNode.tree)?thisNode.tree.draw():null;
	}
	// open
	var parentLayerNode = xbkLayer.all[thisNode.tree.id].getParent();
	var xbkFileExplorerNode = xbkFileExplorer.all[parentLayerNode.id]
	xbkFileExplorerNode.drawIcon(thisNode);
}