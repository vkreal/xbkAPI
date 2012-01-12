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
sLOGO += "<td class='myTitle' height='40'>&nbsp;<font size=6>xbkAPI</font></td>";
sLOGO += "<td class='mySubTitle' align='right' valign='bottom'>xbkAPI WDK&nbsp;</td>";
sLOGO += "</tr></table>";

// WELCOME HTML
var xbkWELCOME_HTML = "<div class='xbkContentBody'>";
xbkWELCOME_HTML += "<h1>Welcome xbkAPI</h1>";
xbkWELCOME_HTML += "<p>The lastest xbkAPI is version 1.01</p>";

xbkWELCOME_HTML += "<h2>What is xbkAPI?</h2>";
xbkWELCOME_HTML += "<p>xbkAPI is web development kit. xbkAPI contains two main platform. <a href='dhtml/index.html'>xbkAPI.DHTML</a> is a cross-browser DHTML Javascript API, and <a href='http://w0550.www69.innerhost.com/'>xbkAPI.NET</a> is a cross-browser ASP.NET controls and components using C#. Both xbkAPI's is use to develop rapid dynamic web applications</p>";
xbkWELCOME_HTML += "<h2>GNU LGP License</h2>";
xbkWELCOME_HTML += "<p>xbkAPI is free to use. xbkAPI is distributed under the terms of the GNU LGP License. Please read the <a href=javascript:adWindow('License.html')>license.</a></p>";



// xbkSUPPORT_HTML
var xbkSUPPORT_HTML = "<div class='xbkContentBody'>";
xbkSUPPORT_HTML += "<h1>xbkAPI Support</h1>";
xbkSUPPORT_HTML += "<h2>Email Support</h2>";
xbkSUPPORT_HTML += "<p>";
xbkSUPPORT_HTML += "<a href='mailto:kreal@hotmail.com'>Contact</a>";
xbkSUPPORT_HTML += "</p>";


var xbkDEMO_HTML = "<div class='xbkContentBody'>";
xbkDEMO_HTML += "<h1>xbkAPI Demo Applications</h1>";
xbkDEMO_HTML += "<h2>xbkEmail</h2>";
xbkDEMO_HTML += "<p>";
xbkDEMO_HTML += "This xbkEmail Demo was written using the xbkAPI. It is meant to demo the cross browser api and rapid development capabilities.";
xbkDEMO_HTML += "</p>";
xbkDEMO_HTML += "<p><a href='dhtml/projects/xbkEmail/index.html'>See xbkEmail Demo</a>";
xbkDEMO_HTML += "</p>";

xbkDEMO_HTML += "<h2>Control Drag and Drop</h2>";
xbkDEMO_HTML += "<p>";
xbkDEMO_HTML += "This demo show drag and drop of one control to another. Click and drag the top control and drop it to the bottom empty control layer.";
xbkDEMO_HTML += "</p>";
xbkDEMO_HTML += "<p><a href='dhtml/projects/xbkDragAndDropControl/index.html'>See DnD Demo</a>";
xbkDEMO_HTML += "</p>";


xbkDEMO_HTML += "<h2>eProject.com</h2>";
xbkDEMO_HTML += "<p>";
xbkDEMO_HTML += "This eProject Demo was written using the xbkAPI.";
xbkDEMO_HTML += "</p>";
xbkDEMO_HTML += "<p><a href='dhtml/projects/eproject/eproject.html'>See eProject Demo</a>";
xbkDEMO_HTML += "</p>";

