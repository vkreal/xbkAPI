//-------------------------------------------------------------------
//	KREAL.NET
//	
//-------------------------------------------------------------------
package net.kreal.js;
import net.kreal.js.*;
import net.kreal.js.XMLWriter;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.File;
import java.io.PrintStream;
import java.io.FileOutputStream;
import java.util.Vector;
import java.util.LinkedList;
import java.io.FileNotFoundException;

public class XBKParser {
	public final static String DONT_PARSE_FILE  = "@notFinished";
	public final static String FILETYPE         = ".js";
	public final static String ASTERICK         = "*";
	public final static String CLASS_BEGIN 		= "xbkAPI";
	public final static String METHOD_MARKER 	= "@";
	public final static String COMMENT_BEGIN 	= "/**";
	public final static String COMMENT_END 		= "*/";
	public final static String AUTHOR 			= "@author";
	public final static String RELATED 			= "@related";
	public final static String EXAMPLE 			= "@example";
	public final static String SINCE 			= "@since";
	public final static String FIELD 			= "@field";
	public final static String METHOD_PRIVATE   = "@private";
	public final static String METHOD_PUBLIC    = "@public";
 	public final static String METHOD_PARAM     = "@param";
	public final static String CONSTRUCTOR      = "@constructor";
	public final static String EXTENDS          = "@extends";
	public final static String RETURN           = "@return";
	public final static String VERSION          = "@version";
	public final int ZERO 						= 0;
	public static Vector CLASS_NODE_VECTOR 		= new Vector();
	public static Vector METHOD_NODE_VECTOR 	= new Vector();
	private boolean descFlag 					= true;
	private static String DESC_STRING 			= "";
	private XBK_UTIL xbk_util 					= new XBK_UTIL();
	private LinkedList List						= new LinkedList();;
	private Node NODE_TEMP 						= null;
	private boolean debug                       = false;
	
	public static void main( String[] args ) throws Exception {
		if ( args == null || args.length < 2 ) { printUsage(); }
		File input			= new File( args[ 0 ] );
		File output			= new File( args[ 1 ] );
		File output_html	= new File( args[ 2 ] );
		if ( !input.exists() ) {
			System.err.println( "bad file input >>>  " + args[ 0 ] );
			System.exit( 0 );
		}
		if ( !output.exists() ) { 
			System.err.println( "warning! no such directory >>> " + args[ 1 ] + " creating new directory >>> " + args[ 1 ] );
			output.mkdir(); 
		}
		if ( !output_html.exists() ) { 
			System.err.println( "warning! no such directory >>> " + args[ 2 ] + " creating new directory >>> " + args[ 2 ] );
			output_html.mkdir(); 
		}
		new XBKParser().parse( input, output );
		new XMLWriter().xmlWriter( CLASS_NODE_VECTOR, output );
		new KEEP_LOG().writeMethodLog( METHOD_NODE_VECTOR );
		new DOCWriter().docWriter( CLASS_NODE_VECTOR, output_html );
		new JSWriter().jsWriter( CLASS_NODE_VECTOR, output_html );
	}
	public void parse( File inputDirJS, File outputXML ) throws Exception {
		File[] list = inputDirJS.listFiles();
		for ( int i = 0; i < list.length; i++ ) {
			
			File curFile = list[i];
			if ( curFile.isDirectory() ) { 
				this.parse( curFile, outputXML ); 
			}
			//else {

			//	System.err.println(curFile.getName().endsWith( this.FILETYPE ));
			//}
			else if ( curFile.getName().endsWith( this.FILETYPE ) ) {
				//System.gc();
				// see if we should parse this file
				BufferedReader reader = new BufferedReader(new FileReader(curFile));
				if (reader!=null) {
					String str = reader.readLine();
					if(str!=null){
						//System.err.println(i);
						if ( str.indexOf ( this.DONT_PARSE_FILE ) == -1 ) {
							if ( this.debug ) { System.err.println( "parsing >>>> " +  curFile.getName() ); }
							this.parseFile( new BufferedReader( new FileReader( list[ i ]  ) ), curFile.getName() );
						}
					}
				}
				//if ( new BufferedReader( new FileReader( list[ i ]  )).readLine().indexOf ( this.DONT_PARSE_FILE ) == -1 ) {
					//if ( this.debug ) { System.err.println( "parsing >>>> " +  curFile.getName() ); }
					//this.parseFile( new BufferedReader( new FileReader( list[ i ]  ) ), curFile.getName() );
				//}
			}
			
		}
		
	}
	public void parseFile( BufferedReader inBuffer, String fileName ) throws Exception {
		String line = "";
		NodeMethod nodeMethod 	= null;
		NodeClass nodeClass 	= null;
      		while ( ( line = inBuffer.readLine() ) != null ) {
			if ( line.indexOf ( this.COMMENT_BEGIN ) != -1  ) {
				boolean bGood = true;
				while ( ( line = inBuffer.readLine() ) != null && ( bGood == true ) ) {
					if ( xbk_util.stringContainsMatch( line, this.CLASS_BEGIN, " \t*\n"  ) ) {
						nodeClass = new NodeClass();
						nodeClass.fileName = fileName;
						CLASS_NODE_VECTOR.add( nodeClass );
						int count = 0;
						this.descFlag = true;
						this.DESC_STRING = "";
						while (( line = inBuffer.readLine() ) != null && ( bGood == true ) ) {
							if ( count == this.ZERO ) { this.getNameClass( line, nodeClass ); }
							if ( count > this.ZERO && this.descFlag ) { this.getClassDescription( line, nodeClass ); }
							this.getClassAttribute( line, nodeClass );
							count++;
							if ( line.indexOf ( this.COMMENT_END ) != -1 ) { bGood = false; }
						}
					}
					else {
						this.descFlag = true;
						this.DESC_STRING = "";
						nodeMethod = new NodeMethod();
						nodeMethod.fileName = fileName;
						this.getNameMethod( line, nodeMethod );
						if ( nodeClass != null ) { nodeClass.children.add( nodeMethod ); }
						else { this.METHOD_NODE_VECTOR.add( nodeMethod ); }
						while (( line = inBuffer.readLine() ) != null && ( bGood == true ) ) {
							if ( this.descFlag ) { this.getMethodDescription( line, nodeMethod ); }
							this.getMethodAttribute( line, nodeMethod );
							if ( line.indexOf ( this.COMMENT_END ) != -1 ) { bGood = false; }
						}
					}
				}
			}
		}
	}
	public void getClassDescription( String str, NodeClass node  ) {
		if ( str.indexOf( this.METHOD_MARKER ) != -1 ) {
			this.descFlag = false;
			node.description = this.cleanString( this.DESC_STRING );
			this.DESC_STRING = new String();
		}
		else {
			this.DESC_STRING = this.DESC_STRING.concat( str );
		}
	}
	public void getNameClass( String str, NodeClass node ) {
		String className = cleanTags( str, this.ASTERICK );
		node.className = this.cleanString( className );
		//System.err.println( className );
	}
	public void getClassAttribute( String str, NodeClass node ) {
		str = this.cleanString( str );
		if ( str.indexOf( this.AUTHOR ) != -1 ) {
			this.getAuthor( str, node );
		}	
		else if ( str.indexOf( this.RELATED ) != -1 ) {
			this.getRelated( str, node );
		}
		else if ( str.indexOf( this.EXAMPLE ) != -1 ) {
			this.getExample( str, node );
		} 
		else if ( str.indexOf( this.SINCE ) != -1 ) {
			this.getSince( str, node );
		}
		else if ( str.indexOf( this.VERSION ) != -1 ) {
			this.getVersion( str, node );
		}
		else if ( str.indexOf( this.FIELD ) != -1 ) {
			this.getField( str, node );
		}
		else if ( str.indexOf( this.METHOD_PARAM ) != -1 ) {
			this.getParam( str, node );
		}
		else if ( str.indexOf( this.CONSTRUCTOR ) != -1 ) {
			this.getConstructor( str, node );
		}
		else if ( str.indexOf( this.EXTENDS ) != -1 ) {
			this.getExtends( str, node );
		}
	}
	public void getExtends( String str, NodeClass node ) {
		str = cleanTags( str, this.EXTENDS );
		String constructorName = str.substring( 0, this.findNextWhiteSpace( str ) );
		constructorName = constructorName.trim();
		node.extendsName = constructorName;
		node.extendsComment = trim( str, constructorName );
		//System.err.println(node.extendsComment);
	}
	public void getConstructor( String str, NodeClass node ) {
		str = cleanTags( str, this.CONSTRUCTOR );
		String constructorName = str.substring( 0, this.findNextWhiteSpace( str ) );
		constructorName = constructorName.trim();
		node.constructorName = constructorName;
		node.constructorComment = trim( str, constructorName );
		//System.err.println( node.constructorComment );
	}
	public void getParam( String str, NodeClass node ) {
		Node paramNode = new Node();
		str = cleanTags( str, this.METHOD_PARAM );
		String paramName = str.substring( 0, this.findNextWhiteSpace( str ) );
		paramName = paramName.trim();
		paramNode.str_0 = paramName;
		str = trim( str, paramName );
		String paramTypename = str.substring( 0, this.findNextWhiteSpace( str ) );
		paramTypename = paramTypename.trim();
		paramNode.str_1 = paramTypename;
		String paramComment = trim( str, paramTypename );
		paramNode.str_2 = paramComment;
		node.params.add( paramNode );
	}
	public void getField( String str, NodeClass node ) {
		Node fieldNode = new Node();
		str = cleanTags( str, this.FIELD );
		String fieldName = str.substring( 0, this.findNextWhiteSpace( str ) );
		fieldNode.str_0 = fieldName;
		str = trim( str, fieldName );
		String fieldType = str.substring( 0, this.findNextWhiteSpace( str ) );
		fieldNode.str_1 = fieldType;
		String fieldComment = trim( str, fieldName );
		fieldNode.str_2 = fieldComment;
		node.fields.add( fieldNode );
		//System.err.println( fieldComment );
	}
	public void getSince( String str, NodeClass node ) {
		String since = cleanTags( str, this.SINCE );
		node.since = since;
		//System.err.println( since );
	}
	public void getVersion( String str, NodeClass node ) {
		String version = cleanTags( str, this.VERSION );
		node.version = version;
		//System.err.println( version );
	}
	public void getExample( String str, NodeClass node ) {
		str = cleanTags( str, this.EXAMPLE );
		Node exampleNode = new Node();
		String exampleTitle = str.substring( 0, this.findNextWhiteSpace( str ) );
		exampleNode.str_0 = exampleTitle;
		//System.err.println( exampleTitle );
		str = trim( str, exampleTitle );
		String pathToExampleFile = str.substring( 0, this.findNextWhiteSpace( str ) );
		exampleNode.str_1 = pathToExampleFile;
		//System.err.println( pathToExampleFile );
		String exampleComment = trim( str, pathToExampleFile );
		exampleNode.str_2 = exampleComment;
		node.examples.add( exampleNode );
		//System.err.println( exampleComment );
	}
	public void getRelated( String str, NodeClass node ) {
		str = cleanTags( str, this.RELATED );
		Node relatedNode = new Node();
		String relatedName = str.substring( 0, this.findNextWhiteSpace( str ) );
		relatedName = relatedName.trim();
		relatedNode.str_0 = relatedName;
		//System.err.println( relatedName );
		str = trim( str, relatedName );
		String pathToRelatedFile = str.substring( 0, this.findNextWhiteSpace( str ) );
		pathToRelatedFile = pathToRelatedFile.trim();
		relatedNode.str_1 = pathToRelatedFile;
		//System.err.println( pathToRelatedFile );
		String relatedComment = trim( str, pathToRelatedFile );
		relatedNode.str_2 = relatedComment;
		node.related.add( relatedNode );
		//System.err.println( relatedComment );
	}
	public void getAuthor( String str, NodeClass node ) {
		str = cleanTags( str, this.AUTHOR );
		String authorName = str.substring( 0, this.findNextWhiteSpace( str ) );
		authorName = authorName.trim();
		node.authorName = authorName;
		
		String temp = str.substring( authorName.length() );
		temp = temp.trim();
		String temp2 = temp.substring( 0, this.findNextWhiteSpace( temp ) );
		
		if ( temp2.indexOf( "@" ) != -1  ) {
			node.authorEmail = temp2.trim();
		}
		else {
			node.authorName = node.authorName.concat( " " + temp2 );
		}
		String temp3 = temp.substring( temp2.length() );
		if( temp3 != null ) {
			node.authorEmail = temp3.trim();
		}
	}
	public String trim( String str, String src ) {
		str = str.substring( src.length() ); // cut
		str = str.trim();
		return str;
	}
	public String cleanTags( String str, String type ) {
		int i = str.indexOf( type );
		str = str.substring( i );
		str = str.trim();
		str = str.substring( type.length() ); // cut
		str = str.trim();
		str = str.replace( '\"', '\'' );
		return str;
	}
	public String cleanString( String str ) {
		str = str.replace( '*', ' ' );
		//str = str.replace( '/', ' ' );
		str = str.replace( '\"', '\'' );
		str = str.trim();
		return str;
	}
	
	public int findNextWhiteSpace( String str ) {
		int i = 0;
		for ( i = 0; i < str.length(); i++ ) {
			if ( true ) {
				Character temp = new Character( str.charAt( i ) );
				if ( temp.isWhitespace( str.charAt( i ) ) ) {
					break;
				}
			}
		}
		return i;
	}
	// END
	public void getMethodAttribute( String str, NodeMethod node ) {
		str = this.cleanString( str );
		if ( str.indexOf( this.METHOD_PUBLIC ) != -1 ) {
			node.methodScope = "public";
			//System.err.println( this.METHOD_PUBLIC  );
		}	
		else if ( str.indexOf( this.METHOD_PRIVATE ) != -1 ) {
			node.methodScope = "private";
			//System.err.println( this.METHOD_PRIVATE  );
		}
		else if ( str.indexOf( this.METHOD_PARAM ) != -1 ) {
			getMethodParam( str, node );
			//System.err.println( this.METHOD_PARAM  );
		}
		else if ( str.indexOf( this.RETURN ) != -1 ) {
			getReturn( str, node );
			//System.err.println( this.RETURN + " <<<<<<<<<<<<<<<<<<<<< "  );
		}
		else { // get more than one line of comment on a methods description
			if ( this.NODE_TEMP != null ) {
				if ( this.List != null ) {
					for ( int i = 0; i < this.List.size(); i++ ) {
						String temp = ( String )List.removeFirst();
						
						//System.err.println( temp );
						this.NODE_TEMP.str_2.concat( temp );
					}
				}
				this.NODE_TEMP = null;
			}
			this.List.add( str );
		}
	}
	
	public void getReturn( String str, NodeMethod node ) {
		str = cleanTags( str, this.RETURN );
		String returnType = str.substring( 0, findNextWhiteSpace( str ) );
		returnType = returnType.trim();
		node.returnType = returnType;
		str = trim( str, returnType );
		node.returnDesc = str;
	}
	
	public void getMethodParam( String str, NodeMethod node ) {
		Node paramNode = new Node();
		this.NODE_TEMP = paramNode;
		str = cleanTags( str, this.METHOD_PARAM );
		String paramName = str.substring( 0, findNextWhiteSpace( str ) );
		paramName = paramName.trim();
		paramNode.str_0 = paramName;
		str = trim( str, paramName );
		String paramTypename = str.substring( 0, findNextWhiteSpace( str ) );
		paramTypename = paramTypename.trim();
		paramNode.str_1 = paramTypename;
		String paramComment = trim( str, paramTypename );
		paramNode.str_2 = paramComment;
		node.params.add( paramNode );
	}
	public void getNameMethod( String str, NodeMethod node ) {
		String methodname = cleanTags( str, this.ASTERICK );
		node.methodname = methodname;
	}
	public void getMethodDescription( String str, NodeMethod node  ) {
		if ( str.indexOf( this.METHOD_MARKER ) != -1 ) {
			this.descFlag = false;
			node.description = cleanString( this.DESC_STRING );
			this.DESC_STRING = new String();
		}
		else {
			DESC_STRING = DESC_STRING.concat( str );
		}
	}
	private static void printUsage () {
		System.err.println();
		System.err.println( "provide a input dir, output dir and a file type." );
		System.err.println( "java [ main entry ][ input dir ][ output dir ]" );
		System.err.println( "example: java com/echospace/js/JScriptParser ../../sp_sdk_dev/SP/ ../xml/" );
		System.exit( 1 );
	}
}
class XBK_UTIL {
	public String cleanStringWhiteSpace( String str ) {
		return "";
	}
	private String cleanStringWhiteSpaceHelper( String str, int index ) {
		return "";
	}
	/**
	 * stringContainsMatch
	 * 
	 * @param hayStack - what you want to search in
	 * @param needle - what you are looking for
	 * @param okayChars - chars that can accur before and after needle
	 */
	boolean stringContainsMatch( String hayStack, String needle, String okayChars ) {
		
		int needle_i = 0;

		for (int i = 0; i < hayStack.length(); i++ ) {
			char curChar = hayStack.charAt(i);
			// see if that char is next in needle
			if ( curChar == needle.charAt(needle_i) ) {
				needle_i++;
			}// end if
			else if ( needle_i > 0 ) {
				
				// see if we have found needle
				if ( needle_i == needle.length() ) {
					// we have, check if this last char is valid
					for ( int k = 0; k < okayChars.length(); k++ ) {
						if ( curChar == okayChars.charAt(k) ) {
							return true;
						}
					}//end for
				}
				
				// either we havent found the needle and this is in the
				// middle of it, or, there was extra char after needle that
				// was not valid
				return false;
				
			}// end else if
			else  {
				// its still 0 so we havent started
				// see if the cur char is in the
				// okay list
				boolean found = false;
				for ( int j = 0; j < okayChars.length(); j++ ) {
					if ( curChar == okayChars.charAt(j) ) {
						found = true;
						break;
					}
				}//end for
				if ( !found ) {
					return false;	
				}
			}//end else if

		}// end for
		
		return true;
		
	}// end stringContains
}

class KEEP_LOG {
	PrintStream out = null;
	public void writeMethodLog( Vector methodVector ) {
		if ( methodVector.size() == 0 ) { return; }
		System.err.println( "Warning!!! there are " + methodVector.size() + " methods that does not belong to a class object. Please see log.txt for details.");
		try {
			this.out = new PrintStream( new FileOutputStream( "log.txt" ) );
			for ( int i = 0; i < methodVector.size(); i++ ) {
				NodeMethod node = ( NodeMethod )methodVector.elementAt( i );
				this.out.println( "From       : " + node.fileName );
				this.out.println( "Method     : " + node.methodname );
				this.out.println( "Description: " + node.description );
				this.out.println( "Scope      : " + node.methodScope );
				this.out.println( "" );
			}
		}
		catch ( FileNotFoundException fnf ) {
			System.err.println( "::::ERROR::::" + fnf );
		}
	}
}