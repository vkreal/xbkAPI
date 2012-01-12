// @notFinished
/*
 * Copyright (c) 2002 xbkAPI  (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

/**
 *  xbkAPI
 *	xbkQueue
 *	
 *	Queue Data Structure Class for xbkAPI web applications. 
 *
 *	@author		xbkapi			xbkapi@yahoo.com
 *	@example	exampleTitle		pathToExampleFile	exampleComment
 *	@since		1.0
 *	@extends	xbkObject
 *	@constructor	xbkQueue
 */
function xbkQueue() {
   this.superClass = xbkObject;
   this.superClass( "xbkQueue" );
   this.intArray = new Array();
   this.length = 0;
   this.dequeue   	= _dequeue;
   this.enqueue 	= _enqueue;  
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
 *	dequeue
 *	Dequeue an object off the queue.
 *
 *	@public
 *	@param obj	Variant	Object to be dequeue off the queue
 *	@return None
 *
 */

   function _dequeue(){
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
 *	enqueue
 *	Enqueue an object onto the off.
 *
 *	@public
 *	@return Variant
 *
 */

   function _enqueue( obj ) {
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
xbkQueClass.prototype = new xbkObject;