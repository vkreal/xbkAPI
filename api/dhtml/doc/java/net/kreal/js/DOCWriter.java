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


public class DOCWriter {
	private PrintStream out= null;
	private final String STYLE_CSS = "styles.css";
	
	public void docWriter( Vector objVector, File outputHELP ) {
		//System.err.println(objVector.size());
		for ( int i = 0; i < objVector.size(); i++ ) {
			NodeClass myNode = (NodeClass)objVector.elementAt(i);
			//System.err.println( myNode.fileName );
			
			String fileName = myNode.className;
			String outputFile = outputHELP.getPath() + File.separator + fileName + ".html";
			try {
				this.out = new PrintStream( new FileOutputStream( outputFile ) );
			}
			catch ( FileNotFoundException fnf ) {
				System.err.println( fnf );
			}
			this.printHTML_BODY_OPEN( myNode.className );
			this.printClassName( myNode.className );
			this.printDesc( myNode.description );
			this.printAttribute( myNode.since, "Since" );
			this.printAttribute( myNode.version, "Version" );
			this.printAttributeExtends( myNode.extendsName, "Extends" );
			this.out.println ("<h2>Constructor</h2>");
			this.printConstructor( myNode );
			this.printMethods( myNode.children );
			this.printExample( myNode.className, "html" );
			this.printHTML_BODY_CLOSE();
		}
		try {
			this.generateTechRefDesc( objVector, outputHELP, "html" );
		}
		catch (Exception err) {}
	}
	private void printHTML_BODY_OPEN( String name ) {
		this.out.println ("<LINK REL='stylesheet' HREF='" + this.STYLE_CSS + "' TYPE='text/css'>");
		this.out.println( "<title>" + name + " documentation</title>" );	
		this.out.println( "<BODY>" );
	}
	private void printHTML_BODY_CLOSE() {
		this.out.println( "</BODY>" );
	}
	private void printClassName( String name ) {
		this.out.println( "<h1>" + name + "</h1></font>" );
	}
	private void printDesc ( String desc ) {
			this.out.println ( "<p>"+desc+"</p>" );
	}
	private void printAttribute( String type, String tag ) {
		if ( type != null ) {
			this.out.println( "<br><b>" + tag + ":</b>&nbsp;" + type + "");
		}
	}
	private void printAttributeExtends( String type, String tag ) {
		if ( type != null ) {
			this.out.println( "<br><b>" + tag + ":</b>&nbsp;<a href='"+type+".html'>" + type + "</a>");
		}
	}
	private void printMethods(  Vector vMethods ) {
		this.out.println ("<h2>Methods</h2>");
		for ( int i = 0; i < vMethods.size(); i++ ) {
			NodeMethod node = (NodeMethod)vMethods.elementAt(i);
			this.printMethod( node );
		}
	}
	private void printMethod( NodeMethod tempNode ) { 
		String paramsList = "";
		
		if (  tempNode.params != null ) {
			 for ( int i = 0; i < tempNode.params.size(); i++ ) {
				if ( i != 0 ) {
					paramsList += ", ";
				}
				//System.err.println( "blah" );
				
				Node node = (Node)tempNode.params.elementAt(i);
				paramsList += "<font class='paramType'>"+node.str_1+ "</font> <font class='paramFieldName'>";
				paramsList += node.str_0 + "</font>";
			}
		}	 
		this.out.println ("<a name='"+tempNode.methodname +"' >");
		this.out.println ("<hr class='methodHR'>");
		this.out.println ( "<font class='methodName'>" + tempNode.methodname + "(</font>"+paramsList+"<font class='methodName'>)</font><br>" );
		this.out.println ( "<font class='DOC_DESC'>"+tempNode.description+"</font>" );
		// params definition
		for ( int i = 0; i < tempNode.params.size(); i++ ) { 
			Node node = (Node)tempNode.params.elementAt(i);
			this.printParam( node );
		}
		
		this.out.println ("<br><font class='methodParams'>Returns:</font>");
		this.out.println ( "<font class='paramType'>" +tempNode.returnType+ "</font>" );
		this.out.println ( "<font class='paramComment'>" + tempNode.returnDesc + "</font>" );
		this.out.println("</a>");
		
	} /// END ///
	private void printConstructor( NodeClass tempNode ) { 
		String paramsList = "";
		
		if (  tempNode.params != null ) {
			 for ( int i = 0; i < tempNode.params.size(); i++ ) {
				if ( i != 0 ) {
					paramsList += ", ";
				}
				//System.err.println( "blah" );
				
				Node node = (Node)tempNode.params.elementAt(i);
				paramsList += "<font class='paramType'>"+node.str_1+ "</font> <font class='paramFieldName'>";
				paramsList += node.str_0 + "</font>";
			}
		}	 
		this.out.println ("<a name='"+tempNode.className +"' >");
		this.out.println ("<hr class='methodHR'>");
		this.out.println ( "<font class='methodName'>" + tempNode.className + "(</font>"+paramsList+"<font class='methodName'>)</font><br>" );
		// params definition
		for ( int i = 0; i < tempNode.params.size(); i++ ) { 
			Node node = (Node)tempNode.params.elementAt(i);
			this.printParam( node );
		}
		/*
		this.out.println ("<br><font class='methodParams'>Returns:</font>");
		this.out.println ( "<font class='paramType'>" +tempNode.returnType+ "</font>" );
		this.out.println ( "<font class='paramComment'>" + tempNode.returnDesc + "</font>" );
		*/
		this.out.println("</a>");
		
	} /// END ///
	private void printParam ( Node paramNode ) {
		this.out.println ("<li><font class='paramType'>" + paramNode.str_1 + "</font>");
		this.out.println ("<font class='paramFieldName'>" + paramNode.str_0 + "</font> ");
		this.out.println ("<br><font class='paramComment'>" + paramNode.str_2 + "</font></li>");						  
	}
	
	private void printExample ( String name, String fileType ) {
		this.out.println ("<HR class='sectionHR'>");
		this.out.println( "<h2>Examples</h2>");	
		String url = "../../../examples/" + name + "." + fileType;
		out.println( "<a href='"+ url +"'class='elink'>" + name + "</a>");
	}
	
	public void generateTechRefDesc ( Vector mainNavRef, File outputDir, String fileType ) throws Exception {
		String outTechRef = outputDir.getPath() + File.separator +  "main" + "." + fileType;
		this.out = new PrintStream( new FileOutputStream( outTechRef ) );
		this.out.println ( "<link rel='stylesheet' type='text/css' href='"+ this.STYLE_CSS +"'>" );
		this.out.println ("<table width=100% bgcolor='white' border=1 cellpadding=5 cellspacing=0>");
		String sTemp = "";
		for ( int i = 0; i < mainNavRef.size(); i++ ) {
			this.out.println ("<tr>");
			NodeClass node = (NodeClass)mainNavRef.elementAt(i);
			String name = node.fileName;
			if ( sTemp.compareTo( name ) != 0 ) {
				this.out.println ("<td valign=top>");
				
				this.out.println( "<a class='mainNav' href=" + name + "." + fileType + ">" +  name + "</a>" );
				
				this.out.println ("</td>");
				this.out.println ("<td>");
				this.printDesc (node.description);
				this.out.println ("</td>");
				sTemp = name;
			}
			this.out.println ("</tr>");
		}
		this.out.println ("</table>");
	}
	
	
}