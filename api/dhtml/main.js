function xbkSort(){	
	var tempArray = [];
	var j = 0;
	for (var i in xbkCLASSOBJ){
		tempArray[j++]=xbkCLASSOBJ[i].className;	
	}
	tempArray.sort();
	var tempArray2 = [];
	j = 0;
	for(var k=0;k<tempArray.length;k++) {
		for(var i in xbkCLASSOBJ){
			if(tempArray[k] == xbkCLASSOBJ[i].className){
				tempArray2[j++]=xbkCLASSOBJ[i];
			}
		}
		 
	}
	xbkCLASSOBJ=tempArray2;
}

xbkSort();


var my_window = null;
function adWindow(urlTarget) {
   winStats='toolbar=no,location=no,directories=no,menubar=no,'
   winStats+='scrollbars=yes, resizable=yes'
   if (navigator.appName.indexOf("Microsoft")>=0) {
      winStats+=',left=100,top=50,width=600,height=400'
    }else{
      winStats+=',screenX=100,screenY=50,width=600,height=400'
    }
   my_window=window.open(urlTarget,"",winStats)     
   my_window.focus()
}

// TOP LOGO
var sLOGO = "";
sLOGO += "<table width='100%' border='0' cellspacing='0' cellpadding='4'><tr>";
sLOGO += "<td class='myTitle' height='40'>&nbsp;<font size=6>xbkAPI</td></font>";
sLOGO += "<td class='mySubTitle' align='right' valign='bottom'>Cross-Browser xbkAPI.DHTML&nbsp;</td>";
sLOGO += "</tr></table>";

// WELCOME HTML
var xbkWELCOME_HTML = "<div class='xbkContentBody'>";
xbkWELCOME_HTML += "<h1>Welcome to xbkAPI.DHTML</h1>";
xbkWELCOME_HTML += "<p>The lastest xbkAPI is version 1.01</p>";


xbkWELCOME_HTML += "<h2>What is xbkAPI.DHTML?</h2>";
xbkWELCOME_HTML += "<p>xbkAPI.DHTML is a cross-browser DHTML Javascript API use to develop dynamic web applications. xbkAPI.DHTML has controls and components, built and tested for cross-browser and cross-platform compatibility for rapid web application development.</p>";




xbkWELCOME_HTML += "<h2>xbkAPI.DHTML Class Hierarchy</h2>";
xbkWELCOME_HTML += "<p>";
xbkWELCOME_HTML += " See inheritance hierarchy <a href=javascript:adWindow('chart/xbkAPI.jpg');>chart.</a>";
xbkWELCOME_HTML += "</p>";

xbkWELCOME_HTML += "<h2>GNU LGP License</h2>";
xbkWELCOME_HTML += "<p>xbkAPI is free to use. xbkAPI is distributed under the terms of the GNU LGP License. Please read the <a href=javascript:adWindow('License.html')>license.</a></p>";


xbkWELCOME_HTML += "</div>"; 

// EXAMPLE HTML
var xbkEXAMPLE_HTML = "<div class='xbkContentBody'>";
xbkEXAMPLE_HTML += "<h1>xbkAPI Class Documentation and Examples</h1>";
xbkEXAMPLE_HTML += "<h2>Quick Example Links</h2>";
xbkEXAMPLE_HTML += "<ul>";
for (var i in xbkCLASSOBJ) {
	var urlTarget = "examples/"+xbkCLASSOBJ[i].className+".html";
	xbkEXAMPLE_HTML += "<li><a class='mainNav' href=javascript:adWindow('"+urlTarget+"')>"+xbkCLASSOBJ[i].className+"</a>";
}
xbkEXAMPLE_HTML += "</ul>";

for (var i in xbkCLASSOBJ) {
	var urlExample = "examples/"+xbkCLASSOBJ[i].className+".html"
	var urlDoc     = "doc/html/doc/"+xbkCLASSOBJ[i].className+".html";
	var urlExtends = "doc/html/doc/"+xbkCLASSOBJ[i].extendsName+".html";
	var urlExampleCode = "doc/html/help/"+xbkCLASSOBJ[i].className+".html";

	xbkEXAMPLE_HTML += "<h2>"+xbkCLASSOBJ[i].className+"</h2>";
	xbkEXAMPLE_HTML += "<p name='"+xbkCLASSOBJ[i].className+"'>";
	xbkEXAMPLE_HTML += xbkCLASSOBJ[i].description;
	xbkEXAMPLE_HTML += "<br><a href=javascript:adWindow('"+urlExample+"')>Example</a><br>";
	xbkEXAMPLE_HTML += "<a href=javascript:adWindow('"+urlExampleCode+"')>Example Source</a><br>";
	xbkEXAMPLE_HTML += "<a href=javascript:adWindow('"+urlDoc+"')>Documentation</a><br>";
	xbkEXAMPLE_HTML += "<a href=javascript:adWindow('"+urlExtends+"')>Class Extends</a>";
	xbkEXAMPLE_HTML += "</p>";
}

// xbkSUPPORT_HTML
var xbkSUPPORT_HTML = "<div class='xbkContentBody'>";
xbkSUPPORT_HTML += "<h1>xbkAPI Support</h1>";
xbkSUPPORT_HTML += "<h2>Email Support</h2>";
xbkSUPPORT_HTML += "<p>";
xbkSUPPORT_HTML += "<a href='mailto:xbkapi@yahoo.com'>Contact</a>";
xbkSUPPORT_HTML += "</p>";

// xbkPROJECTS
var xbkPROJECTS_HTML = "<div class='xbkContentBody'>";
xbkPROJECTS_HTML += "<h1>xbkAPI Projects</h1>";

xbkPROJECTS_HTML += "<h2>XBKParser 1.0</h2>";
xbkPROJECTS_HTML += "<p>";
xbkPROJECTS_HTML += "under development";
//xbkPROJECTS_HTML += "I've originally written this program to help automate the creation of documentation for the xbkAPI classes. The XBKParser generate xml and html files from comments in the source files.";
//xbkPROJECTS_HTML += "</p>";
//xbkPROJECTS_HTML += "<p>";
//xbkPROJECTS_HTML += "<a href=javascript:adWindow('doc/doc.html')>Help</a><br>";
//xbkPROJECTS_HTML += "<a href='doc.zip'>Download Source</a>";
xbkPROJECTS_HTML += "</p>";

var xbkDEMO_HTML = "<div class='xbkContentBody'>";
xbkDEMO_HTML += "<h1>xbkAPI Demo Applications</h1>";
xbkDEMO_HTML += "<h2>xbkEmail</h2>";
xbkDEMO_HTML += "<p>";
xbkDEMO_HTML += "This xbkEmail Demo was written using the xbkAPI. It is meant to demo the cross browser api and rapid development capabilities.";
xbkDEMO_HTML += "</p>";
xbkDEMO_HTML += "<p><a href='projects/xbkEmail/index.html'>See xbkEmail Demo</a>";
xbkDEMO_HTML += "</p>";


//
xbkDEMO_HTML += "<h2>Control Drag and Drop</h2>";
xbkDEMO_HTML += "<p>";
xbkDEMO_HTML += "This demo show drag and drop of one control to another. Click and drag the top control and drop it to the bottom empty control layer.";
xbkDEMO_HTML += "</p>";
xbkDEMO_HTML += "<p><a href='projects/xbkDragAndDropControl/index.html'>See DnD Demo</a>";
xbkDEMO_HTML += "</p>";


xbkDEMO_HTML += "<h2>eProject.com</h2>";
xbkDEMO_HTML += "<p>";
xbkDEMO_HTML += "This eProject Demo was written using the xbkAPI.";
xbkDEMO_HTML += "</p>";
xbkDEMO_HTML += "<p><a href='projects/eproject/eproject.html'>See eProject Demo</a>";
xbkDEMO_HTML += "</p>";


var xbkDOWNLOADS_HTML = "<div class='xbkContentBody'>";
xbkDOWNLOADS_HTML += "<h1>xbkAPI Downloads</h1>";

/*
xbkDOWNLOADS_HTML += "<h2>XBKParser 1.0</h2>";
xbkDOWNLOADS_HTML += "<p>";
xbkDOWNLOADS_HTML += "The zip file contain all java source and class files.";
xbkDOWNLOADS_HTML += "</p>";
xbkDOWNLOADS_HTML += "<p>";
xbkDOWNLOADS_HTML += "<a href='doc.zip'>Download XBKParser Source</a>";
xbkDOWNLOADS_HTML += "</p>";
*/
xbkDOWNLOADS_HTML += "<h2>XBKAPI 1.01</h2>";
xbkDOWNLOADS_HTML += "<p>";
xbkDOWNLOADS_HTML += "The zip file contain all sources and examples files that you would need to use the API.";
xbkDOWNLOADS_HTML += "</p>";
xbkDOWNLOADS_HTML += "<p>";
xbkDOWNLOADS_HTML += "<a href='xbkAPI.zip'>Download xbkAPI Source</a>";
xbkDOWNLOADS_HTML += "</p>";