<?
$dbhostname = "localhost";
$dbusername = "krealne_kreal";
$dbpassword = "kreal";
$dbdatabase = "krealne_test";

global $dbh;

if( !isset( $dbh ) ){
	$dbh  =  mysql_connect( $dbhostname,$dbusername,$dbpassword );
	mysql_select_db( $dbdatabase );
	$blah = 'connect to '.$dbdatabase. " MySQL DB";
	echo $blah;
	//echo $dbh;
}
function createHeader() {
	echo "<script>";
}
function createFooter() {
	echo "</script>";
}
?>