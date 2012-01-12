// @notFinished
/*
 * Copyright (c) 2002 xbkAPI (xbkAPI@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkStack
 *	
 *	Stack Data Structure Class for xbkAPI web applications. 
 *
 *	@author		xbkapi			xbkAPI@yahoo.com
 *	@example	exampleTitle		pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkObject
 *	@constructor	xbkStack
 */
function xbkStack() {
   this.superClass = xbkObject;
   this.superClass( "xbkStack" );
   this.intArray = new Array();
   this.length = 0;
   this.push    	= _push;
   this.pop     	= _pop;
   this.shift   	= _shift;
   this.unshift 	= _unshift;  
   this.peekFirst   	= _peekFirst;
   this.peekLast  	= _peekLast;


/**
 *	peekFirst
 *	Peek at the first on the stack.
 *
 *	@public
 *	@return Variant
 *
 */
   function _peekFirst() {
      return this.intArray[0];
   }
   
/**
 *	peekLast
 *	Peek at the last of the stack.
 *
 *	@public
 *	@return Variant
 *
 */
   function _peekLast() {
      return this.intArray[ this.length -1 ];
   }

/**
 *	push
 *	Push a obj into the stack.
 *
 *	@public
 *	@param obj	Variant	Object to be push onto the stack.
 *	@return None
 *
 */
   function _push( obj ) {
      this.intArray[ this.length ] = obj;
      this.length++;
   }
   
/**
 *	pop
 *	Pop an object from the stack.
 *
 *	@public
 *	@return Variant
 *
 */
   function _pop() {
   
      if ( this.length == 0) {
         return null;
      }
   
      this.length--;
      var ret = this.intArray[ this.length];
      this.intArray[ this.length] = null;
      return ret;
   }

/**
 *	unshift
 *	unshift an object off the stack.
 *
 *	@public
 *	@return Variant
 *
 */
   function _unshift(){
      var ret = this.intArray[0];
      
      if ( ret == null ) {
         return null;
      }
      
      var newArray = new Array();
      var i;
      for ( i = 0; i < this.length; i++) {
         newArray[i] = this.intArray[i+1];
      }
   
      this.intArray = newArray;
      this.length--;
      return ret;
   }
/**
 *	shift
 *	shift an object onto the stack.
 *
 *	@public
 *	@param obj	Variant	Object to be unshift onto the stack
 *	@return None
 *
 */
   function _shift( obj ) {
      var ret = this.intArray[this.length -1];
      
      if ( ret == null ) {
         return null;
      }
      
      var newArray = new Array();
      newArray[ 0 ] = obj;
      var i;
      for ( i = 0; i < this.length; i++) {
         newArray[ i + 1 ] = this.intArray[i];
      }
      this.length++;
      this.intArray = newArray;
   }

}
xbkStack.prototype = new xbkObject;
