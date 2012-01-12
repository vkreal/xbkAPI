package net.kreal.js;
import net.kreal.js.*;
import net.kreal.js.XBKParser;
import java.util.Vector;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintStream;

public class XMLWriter {
	private PrintStream out = null;
	private boolean PUBLIC_ONLY				= true;
	private final String XML_HEADER   		= "<?xml version='1.0'?>";
	private final String XML_DTD			= "tech_ref.dtd";
	private final String XMLCDATA_OPEN      = "<![CDATA[";
	private final String XMLCDATA_CLOSE     = "]]>";
	private final String DESC_OPEN  		= "<desc>";
	private final String DESC_CLOSE			= "</desc>";
	private final String FIELDS_OPEN  		= "<fields>";
	private final String FIELDS_CLOSE 		= "</fields>";
	private final String CONSTRUCTOR_OPEN 	= "<constructor>";
	private final String CONSTRUCTOR_CLOSE 	= "</constructor>";
	private final String METHOD_DESC_OPEN 	= "<method_desc>";
	private final String METHOD_DESC_CLOSE 	= "</method_desc>";
	private final String PARAMS_OPEN 		= "<params>";
	private final String PARAMS_CLOSE 		= "</params>";
	private final String METHODS_OPEN       = "<methods>";
	private final String METHODS_CLOSE      = "</methods>";
	private final String RELATED_OPEN       = "<related>";
	private final String RELATED_CLOSE      = "</related>";
	private final String DEPS_OPEN   	 	= "<deps>";
	private final String DEPS_CLOSE   	 	= "</deps>";
	private final String EXAMPLES_OPEN  	= "<examples>";
	private final String EXAMPLES_CLOSE  	= "</examples>";
	private final String RETURN_OPEN  		= "<return>";
	private final String RETURN_CLOSE  		= "</return>";
	private boolean debug                   = false;
	
	public void xmlWriter( Vector objVector, File outputXML ) {
		for ( int i = 0; i < objVector.size(); i++ ) {
			NodeClass mynode = ( NodeClass )objVector.elementAt( i );
			//String fileName = mynode.fileName.substring( 0, mynode.fileName.indexOf( "." ) );
			String outFileString = outputXML.getPath() + File.separatorChar + mynode.className + ".xml";
			try {
				this.out = new PrintStream( new FileOutputStream( outFileString ) );
			}
			catch( FileNotFoundException e ) { 
				System.err.println( "error creating file " + outFileString + "  meassage: " + e );
			}
			if ( this.debug ) { System.err.println( "creating >>>> " + outFileString ); }
			// XML START
			createdXMLHeader( this.out );
			createXMLDOCTYPE( this.out, this.XML_DTD );
			createXMLClassTag_OPEN( this.out, mynode );
			createXMLDesc( this.out, mynode.description, this.DESC_OPEN, this.DESC_CLOSE );
			createTagWithParam( out, mynode.fields, this.FIELDS_OPEN, this.FIELDS_CLOSE );
			createXMLConstructor( this.out, mynode.params , mynode.constructorName, mynode.constructorComment );
			if ( mynode.children.size() > 0 ) {
				this.createMethod( mynode, this.out, this.PUBLIC_ONLY );
			}
			createRelatedTAG( out, mynode.related );
			createRelatedExampleTAG( out, mynode.examples );
			createExtendsTAG( out, mynode );
			createXMLClassTag_CLOSE( this.out );
		}
	}
	
	private void createMethod( NodeClass mynode, PrintStream out, boolean public_only ) {
		this.createMethods_OPEN( out );
		for ( int j = 0; j < mynode.children.size(); j++ ) {
			NodeMethod methodNode = ( NodeMethod )mynode.children.elementAt( j );
			if ( public_only == true ) {
				if ( methodNode.methodScope != null ) {
					if ( methodNode.methodScope.compareTo( "public" ) == 0  ) {
						createMethodBody( out, methodNode );
					}
				}
			}
			else {
				createMethodBody( out, methodNode );
			}
		}
		this.createMethods_CLOSE( out );
	}
	
	private void createExtendsTAG( PrintStream out, NodeClass node ) {
		out.println( "<extends name=\""+ node.extendsName +"\" />" );
	}
	private void createMethods_OPEN( PrintStream out ) {
		out.println( this.METHODS_OPEN );
	}
	private void createMethods_CLOSE( PrintStream out ) {
		out.println( this.METHODS_CLOSE );
	}
	private void createdXMLHeader( PrintStream out ) {
		out.println( this.XML_HEADER );
	}
	private void createXMLClassTag_OPEN( PrintStream out, NodeClass node ) {
		String temp = "<class name=\"" + node.className + "\" version=\"" + node.version + "\" since=\"" + node.since + "\">";
		out.println( temp );
	}
	private void createXMLDOCTYPE( PrintStream out, String str ) {
		String temp = "<!DOCTYPE class SYSTEM \"" + str + "\">";
		out.println( temp );
	}
	private void createXMLClassTag_CLOSE( PrintStream out ) {
		out.println( "</class>" );
	}
	private void createXMLDesc( PrintStream out, String str, String type_open, String type_close ) {
		out.println( type_open );
		createCDATA( out, str );
		out.println( type_close );
	}
	private void createCDATA( PrintStream out, String str ) {
		out.println( this.XMLCDATA_OPEN );
		out.println( str );
		out.println( this.XMLCDATA_CLOSE );
	}
	private void createParam( PrintStream out, Vector fieldsVector ) {
		for ( int i = 0; i < fieldsVector.size(); i++ ) {
			Node node = ( Node )fieldsVector.elementAt( i );
			out.println( "<param name=\"" + node.str_0 + "\" typename=\"" + node.str_1 + "\" comment=\"" + node.str_2 + "\" />" );
		}
	}
	private String createMethod_OPEN( String name, String comment ) {
		String str = "<method name=\""+ name +"\" comment=\"" + comment + "\" >";
		return str;
	}
	private String createMethod_CLOSE() {
		return "</method>";
	}
	private void createMethodBody( PrintStream out, NodeMethod node ) {
		out.println( createMethod_OPEN( node.methodname, "" ) );
		createXMLDesc( out, node.description, this.METHOD_DESC_OPEN, this.METHOD_DESC_CLOSE );
		createTagWithParam( out, node.params, this.PARAMS_OPEN, this.PARAMS_CLOSE );
		createReturnAttr( out, node );
		out.println( createMethod_CLOSE() );
	}
	
	private void createReturnAttr( PrintStream out, NodeMethod node ) {
		String str = "";
		if ( node.returnType != null ) {
			str = "<return typename=\""+ node.returnType +"\" comment=\"" + node.returnDesc + "\" ></return>";
		}
		else {
			node.returnType = "Nothing";
			node.returnDesc = "";
			str = "<return typename=\""+ node.returnType +"\" comment=\"" + node.returnDesc + "\" ></return>";
		}
		out.println( str );
	}
	
	private String createMethodDesc( String desc ) {
		return "<method_desc> " + desc + " </method_desc>";
	}
	private void createTagWithParam( PrintStream out, Vector fieldsVector, String TAG_OPEN, String TAG_CLOSE ) {
		out.println( TAG_OPEN );
		createParam( out, fieldsVector );
		out.println( TAG_CLOSE );
	}
	private void createXMLConstructor ( PrintStream out, Vector params, String constructorName, String constructorComment ) {
		out.println( this.CONSTRUCTOR_OPEN );
		out.println( createMethod_OPEN( constructorName, "" ) );
		out.println( createMethodDesc( constructorComment ) );
		createTagWithParam( out, params, this.PARAMS_OPEN, this.PARAMS_CLOSE );
		out.println( createMethod_CLOSE() );
		out.println( this.CONSTRUCTOR_CLOSE );
	}
	private void createRelatedTAG( PrintStream out, Vector fieldsVector ) {
		out.println( this.RELATED_OPEN );
		for ( int i = 0; i < fieldsVector.size(); i++ ) {
			Node node = ( Node )fieldsVector.elementAt( i );
			out.println( "<ref url=\"" + node.str_1 + "\" name=\"" + node.str_0 + "\" comment=\"" + node.str_2 + "\" />" );
		}
		out.println( this.RELATED_CLOSE );
	}
	private void createRelatedExampleTAG( PrintStream out, Vector fieldsVector ) {
		out.println( this.EXAMPLES_OPEN );
		for ( int i = 0; i < fieldsVector.size(); i++ ) {
			Node node = ( Node )fieldsVector.elementAt( i );
			out.println( "<example url=\"" + node.str_1 + "\" title=\"" + node.str_0 + "\" comment=\"" + node.str_2 + "\" />" );
		}
		out.println( this.EXAMPLES_CLOSE );
	}
}
