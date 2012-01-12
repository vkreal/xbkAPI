/*
 * Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */


/**
 *  xbkAPI
 *	xbkCGIPort
 *	
 *	The xbkCGIPort provides CGI tasks that passes data back and forth and queing. The xbkCGIPort receives data from a CGI program and then directs that data to the correct function. 
 *
 *	@author		xbkapi			xbkapi@yahoo.com
 *	@example	exampleTitle		pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.0
 *	@constructor	xbkCGIPort
 *	@extends	xbkObject
 *	@param	target	Refence	Location on the cgi target.
 *
 */
function xbkCGIPort( target ) {
	this.superClass = xbkObject;
   	this.superClass( "xbkCGIPort" );
	this.target         = target || null;
	this.que            = new xbkStack();
	this.executing      = false;
	this.lastCommandObj = null;
	this.debug_mode     = false;
	
/**
 *	add
 *	A new cgi call command object to the que.
 *
 *	@public
 *	@param commandObj	Command	Command object created.
 *	@return None
 *
 */
	this.add = function( commandObj ) {
		(ie)?this.que.push( commandObj ):this.que.shift( commandObj );
		this.next();
	}
	
	this.start = function() {
		var obj = this.que.unshift();
		if ( !obj ) {
			return;
		}
		this.executing            = true;
		this.lastCommandObj       = obj;
		this.target.location = obj.query;
		this.next();
	}
/**
 *	command
 *	A new command object.
 *
 *	@public
 *	@return Object
 *
 */
	this.command = function() {
		this.query      = new String();
		this.id         = 'id_' + Math.floor ( Math.random() * 1000000000 );
		this.returnFunc = null;
		this.status     = null;
		this.form       = false;
		return this;
	}
	this.finish = function( params ) {
		if ( this.lastCommandObj ) {
			this.lastCommandObj.returnFunc( params )
		}
		this.executing      = false;
		this.lastCommandObj = null; 
		this.next();
	}
	this.next = function() {
		if ( !this.executing ) {
			this.start();
		}
	}
}
xbkCGIPort.prototype = new xbkObject;
function qsAppend(n, v) {
	return "&" + n + "=" + escape( v );
}
function qsRand() {
	var time = new Date();
	var s = Math.random() + time.getUTCFullYear() + time.getUTCDay() + time.getUTCMonth() + time.getUTCMilliseconds() ;
	return "&rand=" + escape ( s );

}
		
