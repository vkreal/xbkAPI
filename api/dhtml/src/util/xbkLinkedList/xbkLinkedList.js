// @notFinished
/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkLinkedList
 *	
 *	Linked List Data Structure Class for xbkAPI web applications. 
 *
 *	@author		xbkapi		xbkapi@yahoo.com
 *	@example	exampleTitle		pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkObject
 *	@constructor	xbkLinkedList
 *
 */
function xbkLinkedList(){
	this.userDefined   = null;
	this.insert        = _insert;    
	this.printList     = _printList; 
	this.remove        = _remove;    
	this.deleteList    = _deleteList;
	this.getLength     = _length;
	this.isInList      = _isInList;
	this.isEmpty       = _isEmpty;
	this.insertSorted  = _insertSorted;
	this.insertAt      = _insertAt; 
	this.insertAtEnd   = _insertAtEnd;
	this.exportList    = _export;
	this.importList    = _import;
	this.get           = _get;


	this.head        = null;
	this.tail        = null;
	this.iLen        = 0;
	
/**
 *	exportList
 *	Export the list.
 *
 *	@public
 *	@return xbkLinkedList
 *
 */
	function _export(){
		return this;
	}
/**
 *	importList
 *	Import a list.
 *
 *	@public
 *	@param oList	xbkLinkedList	The list to import.
 *	@return None
 *
 */
	function _import( oList ){
		this = oList;
	}
/**
 *	insertAtEnd
 *	Insert at the end of the list.
 *
 *	@public
 *	@param obj	Variant	An Variant object to be insert at the end of the list.
 *	@return None
 *
 */
	function _insertAtEnd( obj ) {
		var newNode = new Object();
		newNode.next = null;
		newNode.data = obj;
		this.iLen++;	
		if ( this.head == null ) {
			this.head = newNode;	
			this.tail = newNode;
			return;
		}
		this.tail.next = newNode;
		this.tail = newNode;
	}
	
/**
 *	insertAt
 *	Insert at a specific location in the list.
 *
 *	@public
 *	@param i	Number	Location in the list.
 *	@param obj	Variant	An Variant object to be insert at the end of the list.
 *	@return None
 *
 */
	function _insertAt( i, obj ) {
		var newNode = new Object();
		newNode.next = null;
		newNode.data = obj;
		this.iLen++;
		if ( this.head == null ) {
			this.head = newNode;	
			this.tail = newNode;
			return;
		}
		if ( i == 0 ) {
			newNode.next = this.head;
			this.head = newNode;	
			return;
		}
		var place = 0;
		var last = this.head;
		var cur = this.head;
		while( cur != null && place != i ) {
			place++;
			last = cur;
			cur = cur.next;
		}
		newNode.next = last.next;
		last.next = newNode;
		if ( newNode.next == null ) {
			this.tail = newNode;
		}
	}
/**
 *	insert
 *	Insert a object at the head of the list.
 *
 *	@public
 *	@param obj	Variant	An Variant object to be insert at the end of the list.
 *	@return None
 *
 */	
	function _insert( obj ) {
		var newNode = new Object();
		newNode.next = null;
		newNode.data = obj;
		if (this.head==null) {
			this.head = newNode;
			this.tail = newNode;
		}
		else {
			var temp = this.head;
			this.head = newNode;
			this.head.next = temp;
		}
		this.iLen++;
	}
/**
 *	insertSorted
 *	Insert the data sorted.
 *
 *	@public
 *	@param obj	Variant	An Variant object to be insert at the end of the list.
 *	@return None
 *
 */	
	function _insertSorted( obj ) {
		var newNode = new Object();
		newNode.next = null;
		newNode.data = obj;
		if ( this.head == null ) {
			this.head = newNode;
			this.tail = newNode;
			this.iLen++;
			return;
		}
		if ( newNode.data.get_sSorted() < this.head.data.get_sSorted() ) {
			newNode.next = this.head;
			this.head = newNode;
		}
		else{		
			var found = false;
			var prev, cur = this.head;
			while( cur != null && !found ){
				if ( newNode.data.get_sSorted() < cur.data.get_sSorted() ) {
					found = true;
				}
				else{
					prev = cur;
					cur = cur.next;
				}
			}
			newNode.next = cur;
			prev.next = newNode;
		}
		if ( newNode.next == null ) {
			this.tail = newNode;
		}
		this.iLen++;
	}

	function _printList( sType ) {
		if (this.head == null){
			confirm("List is Empty");
			return;
		}
		var cur = this.head;
		while ( cur != null ) {
			confirm ( cur.data[sType] );
			cur = cur.next;
		}
	}
/**
 *	deleteList
 *	Delete the list.
 *
 *	@public
 *	@return None
 *
 */	
	function _deleteList() {	
		this.head = this.tail = null;
	}
	
/**
 *	remove
 *	Remove a object from the list.
 *
 *	@public
 *	@param oObj	Variant	An Variant object to be insert at the end of the list.
 *	@return None
 *
 */	
	function _remove( oObj, sType ) {
		var cur = this.head; 
		var prev = this.head;
		while( cur != null ) {
			if ( cur.data.sType == oObj.sType ) {
				if ( cur == this.head ) {
						this.head = cur.next;
						delete cur.data;
						cur = null;
						this.iLen--;
						return true;	
				}
				if ( cur.next == null ) {
						this.tail = prev;
						delete cur.data;
						cur = null;
						this.iLen--;
						return true;	
				}
				else {	
						delete cur.data;
						cur = cur.next;
						prev.next = cur;
						this.iLen--;
						return true;
				}
			}
			prev = cur;
			cur = cur.next;
		}
		return false;
	}	

	function _isInList( input ) {
		if ( this.head==null ) {
			return false;
		}
		var cur = this.head;
		while( cur != null ) {
			if( input == cur.data ) {
				return true;
			}
		} 
		return false;
	}

	function _get( input ) {
		if ( this.head==null ) {
			return null;
		}
		var cur = this.head;
		while( cur != null ) {
			if( input == cur.data ) {
				return cur.data;
			}
		} 
		return null;
	}
/**
 *	getLength
 *	Get the length of the list.
 *
 *	@public
 *	@return Number
 *
 */
	function _length() {
		return ( this.iLen );
	}
/**
 *	isEmpty
 *	Check if the list is empty.
 *
 *	@public
 *	@return boolean
 *
 */	
	function _isEmpty() {
		if ( this.head == null ) {
			return true;
		}
		return false;
	} 		
}     ////////////////////////// END OF LINKED-LIST CLASS //////////////////////