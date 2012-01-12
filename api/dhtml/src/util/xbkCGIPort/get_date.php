<?
/**
*
* PHP version
*
* This example:
* - Gets server date and time 
* - Builds a client-side Object (JavaScript) with the date and time
* - Sends Object back through cgiPipe to client
*
*/


// Get server date & time

$d = getdate();
$dDate = $d[mon] . "/" . $d[mday] . "/" . $d[year];

$hour = $d[hours];

if ($hour > 11){
        $ampm = "PM";
        $hour = $hour - 12;
}
else{
        $ampm = "AM";
}

if ($hour == 0) $hour = 12;

$min = $d[minutes];

if ($min < 10){
        $mZero = "0";
}

$seconds = $d[seconds];

if ($seconds < 10){
        $sZero = "0";
}
$tTime = $hour . ":" . $mZero . $min . ":" . $sZero . $seconds . " " . $ampm;


// Open <script> to enable JavaScript
echo "<script>\n\n";

// Create an instance of a new js Object
echo "var obj = new Object();\n\n";

// Give the Object date and time variales and assign them the server values
echo "obj.date = '" . $dDate ."';\n";
echo "obj.time = '" . $tTime ."';\n\n";
// Send the Obect back
echo "parent.cgi_port.finish( obj );\n";
echo "</script>"
?>


