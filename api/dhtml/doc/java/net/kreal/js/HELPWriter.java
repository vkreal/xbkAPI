package net.kreal.js;
import net.kreal.js.*;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.File;
import java.io.PrintStream;
import java.io.FileOutputStream;
import java.io.FileNotFoundException;
import java.lang.String;

public class HELPWriter {
	private PrintStream out	= null;
	private final String OPEN_SIGN	= "&lt;";
	private final String CLOSE_SIGN	= "&gt;";
	private final static String FILETYPE	= ".html";

	public static void main( String[] args ) throws Exception {
		if ( args == null || args.length < 2 ) {}
		File input			= new File( args[ 0 ] );
		File output			= new File( args[ 1 ] );
		File output_html		= new File( args[ 2 ] );
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
		new HELPWriter().parse( input, output_html );
	}

	public void parse( File inputDir, File outputDir ) throws Exception {
		File[] list = inputDir.listFiles();
		for ( int i = 0; i < list.length; i++ ) {
			File curFile = list[ i ];
			if ( curFile.isDirectory() ) { this.parse( curFile, outputDir ); }
			else if ( curFile.getName().endsWith( this.FILETYPE ) ) {
				System.gc();
				// see if we should parse this file
				//if ( new BufferedReader( new FileReader( list[ i ]  )).readLine().indexOf ( this.DONT_PARSE_FILE ) == -1 ) {
				//	if ( this.debug ) { System.err.println( "parsing >>>> " +  curFile.getName() ); }
					this.parseFile( new BufferedReader( new FileReader( list[ i ]  ) ), curFile.getName(), outputDir );
				//}
			}
		}
	}
	public void parseFile( BufferedReader inBuffer, String fileName, File output ) throws Exception {
		String outputFile = output.getPath() + File.separator + fileName;
		try {
			this.out = new PrintStream( new FileOutputStream( outputFile ) );
		}
		catch ( FileNotFoundException fnf ) {
			System.err.println( fnf );
		}

		String line = new String();
		this.out.println("<style>");
		this.out.println("pre{background-Color:#EBFFED;color:black;font-family:verdana;font-size:10px;}");
		this.out.println("</style>");
		this.out.println("<pre>");
      		while ((line=inBuffer.readLine())!=null ) {		
			line=line.replaceAll("<",this.OPEN_SIGN);
			line=line.replaceAll(">",this.CLOSE_SIGN);
			this.out.println(line);
		}
		this.out.println("</pre>");
	}
}