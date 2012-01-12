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

public class JSWriter {
	private PrintStream out= null;
	public void jsWriter( Vector objVector, File outputJS ) {
		String outputFile = outputJS.getPath() + File.separator + "xbkGeneratedClassAtrribute" + ".js";
		try {
			this.out = new PrintStream( new FileOutputStream( outputFile ) );
		}
		catch ( FileNotFoundException fnf ) { System.err.println( fnf ); }; 
		
		this.out.println("var xbkCLASSOBJ = [];");
		for ( int i = 0; i < objVector.size(); i++ ) {
			NodeClass myNode = (NodeClass)objVector.elementAt(i);
			this.out.println("xbkCLASSOBJ["+i+"] = new Object();");
			this.out.println("xbkCLASSOBJ["+i+"].className = '"+myNode.className+"';");
			this.out.println("xbkCLASSOBJ["+i+"].description = '"+myNode.description+"';");
			this.out.println("xbkCLASSOBJ["+i+"].extendsName = '"+myNode.extendsName+"';");
		}
	}
}