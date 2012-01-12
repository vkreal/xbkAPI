/*
 *  Copyright (c) 2002 xbkapi (xbkapi@yahoo.com)
 * This library is distributed under the terms of the GNU Lesser General Public License (gnu.org).
 */

var ie  = false;
var ie6 = false;
var ie55 = false;
var ie5 = false;
var ie4 = false;
var ie3 = false;
var ns3 = false;
var ns4 = false;
var ns6 = false;
var osWindows  = false;
var osMac = false;
var osLynix = false;
var ie5Mac = false;

var bName = navigator.appName;
var bVersion = parseInt(navigator.appVersion);

if ( navigator.platform == "Win32" || navigator.platform == "Win" || navigator.platform == "NT") {
	osWindows = true;
}
else if ( navigator.platform == "MacPPC" ) {
	osMac = true;	
}
else {
	osLynix = true;
}

// check for Netscape 
if (bName == "Netscape") {
	//confirm ( bVersion );
  //browser = "ns" + bVersion;
  if ( bVersion >=3 && bVersion < 4 ) {
      ns3 = true;
  }
  else if(bVersion >=4 && bVersion < 5 ) {
      ns4 = true;
  }
  else if (bVersion >=5){
         ns6 = true;
 }
} else {
  // check for MSIE
   if (bName == "Microsoft Internet Explorer") {
      
     ie = true;
	 if ( bVersion >=3 && bVersion < 4 ) {
         ie3 = true;
     }
     else if ( navigator.userAgent.indexOf("MSIE 5.") != -1) {
        ie5 = true;
		if ( navigator.userAgent.indexOf("MSIE 5.5") != -1){
			ie55 = true;
		}
     } 
	 else if ( navigator.userAgent.indexOf("MSIE 6") != -1) {
	 	ie5 = true;
	 	ie6 = true;
	 }
     else if (bVersion >=4 && bVersion < 5){
         ie4 = true;
     }
     else if (bVersion >=5){
         ie5 = true;
     }
   }
}

if ( ie5 && osMac ) {
	ie5Mac = true;
}
/**
 *  xbkAPI
 *	xbkObject
 *	
 *	This class is an abstract class that is inherited by all xbkAPI classes.
 *
 *	@author		xbkapi		xbkapi@yahoo.com
 *	@example	exampleTitle	pathToExampleFile	exampleComment
 *	@since		1.0
 *	@version	1.0
 *	@constructor	xbkObject
 *	@param	type	String	The object that instantiated this class.
 *	@param	ref		Reference	A reference to that object that has instantiated this abstract class.
 */
function xbkObject( type, ref ) {
	this.xbkObject_type	= type || "";
	this.ref	= ref || null;
	this.id 	= "xbkObject_" + this.xbkObject_type + "_"+ xbkObject.count++;
	this.remove	= null;
	xbkObject.all[ this.id ] = this;
/**
 *	getxbkObjectId
 *	Get current xbkObject id.
 *
 *	@public
 *	@return String
 *
 */
	function getxbkObjectId() {
		return this.id;
	}
/**
 *	getxbkObjectById
 *	Get xbkObject by id.
 *
 *	@public
 *	@param 	id	String	The id xbkObject to find.
 *	@return xbkObject
 *
 */
	function getxbkObjectById( id ) {
		return xbkObject.all[ id ];
	}
}
xbkObject.count = 0;
xbkObject.all	= [];


// xbkUtilCLASS
xbkUtil = new Function();
xbkUtil.APP_WIDTH = function () {
	if ( ns6 || ns4 ) {
		return window.innerWidth;	
	}
	else {
		return document.body.clientWidth;	
	}
}

xbkUtil.APP_HEIGHT = function () {
	if ( ns6 || ns4 ) {
		return window.innerHeight;
	}
	else {
		return document.body.clientHeight;
	}	
}

xbkUtil.elipsisName = function( sFilename ) {
	var sNewFilename = sFilename;
	if ( sFilename.length > 11 ){
		sNewFilename = "";
		for ( var i = 0; i < 8; i++ ){
			if ( i == 7 ){
				if ( sFilename.charAt( 7 ) == " " || sFilename.charAt( 7 ) == "." ){
					sNewFilename = sNewFilename;
				}
				else {
					sNewFilename = sNewFilename + sFilename.charAt( i );
				}
			}
			else {
					sNewFilename = sNewFilename + sFilename.charAt( i );
			}
		}
			//	Add elipsis
		sNewFilename = sNewFilename + "...";
	}
	return sNewFilename;
}

xbkUtil.xbkGLOBAL_COUNT = 0;



