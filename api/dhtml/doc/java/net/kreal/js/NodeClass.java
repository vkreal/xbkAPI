package net.kreal.js;
import net.kreal.js.*;
import java.util.Vector;

class NodeClass {
	public String fileName		= null;
	public Vector children 		= new Vector();
	public Vector params        	= new Vector();
	public String className  	= null;
	public String version           = null;
	public String constructorName   = null;
	public String constructorComment= null;
	public String extendsName       = null;
	public String extendsComment    = null;
	public String description	= null;
	public String authorName 	= null;
	public String authorEmail  	= null;
	public Vector related   	= new Vector();
	public Vector examples		= new Vector();
	public String since		= null;
	public Vector fields   		= new Vector();
}

class NodeMethod {
	public String fileName		= null;
	public String methodname 	= null;
 	public String description   	= null;
 	public String methodScope  	= null;
	public String returnType    	= null;
	public String returnDesc    	= null;
 	public Vector params 	    	= new Vector();
}

class Node {
	public String str_0 = null;
	public String str_1 = null;
	public String str_2 = null;
}

