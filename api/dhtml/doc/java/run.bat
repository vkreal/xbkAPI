rem #######################################################################
rem ##	usage:
rem ##		java [ main entry ][ source ][ xml destination ][ html destination ] 
rem ##
rem #######################################################################

cls
rmdir /Q /S ..\xml
java net/kreal/js/XBKParser ../../src/ ../xml/ ../html/doc/
copy tech_ref.dtd ..\xml\tech_ref.dtd


java net/kreal/js/HELPWriter ../../examples/ ../xml/ ../html/help/