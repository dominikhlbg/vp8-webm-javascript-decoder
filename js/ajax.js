// Copyright 2011 Google Inc. All Rights Reserved.
//
// This code is licensed under the same terms as WebM:
//  Software License Agreement:  http://www.webmproject.org/license/software/
//  Additional IP Rights Grant:  http://www.webmproject.org/license/additional/
// -----------------------------------------------------------------------------
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. 
// IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, 
// INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, 
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY 
// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING 
// NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, 
// EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// -----------------------------------------------------------------------------
//
// Author: John Koleszar (jkoleszar@google.com)
//         Dominik Homberger (dominik.homberger@gmail.com)

"use strict";
function createRequestObject() {
      var  ro = new XMLHttpRequest();
    return ro;
}

var http = createRequestObject();

function convertResponseBodyToText(IEByteArray) {
	var ByteMapping = {};
	for ( var i = 0; i < 256; i++ ) {
		for ( var j = 0; j < 256; j++ ) {
			ByteMapping[ String.fromCharCode( i + j * 256 ) ] = 
				String.fromCharCode(i) + String.fromCharCode(j);
		}
	}
	var rawBytes = IEBinaryToArray_ByteStr(IEByteArray);
	var lastChr = IEBinaryToArray_ByteStr_Last(IEByteArray);
	return rawBytes.replace(/[\s\S]/g, 
		function( match ) { return ByteMapping[match]; }) + lastChr;
}
 
var IEBinaryToArray_ByteStr_Script = 
	"<!-- IEBinaryToArray_ByteStr -->\r\n"+
	"<script type='text/vbscript'>\r\n"+
	"Function IEBinaryToArray_ByteStr(Binary)\r\n"+
	"	IEBinaryToArray_ByteStr = CStr(Binary)\r\n"+
	"End Function\r\n"+
	"Function IEBinaryToArray_ByteStr_Last(Binary)\r\n"+
	"	Dim lastIndex\r\n"+
	"	lastIndex = LenB(Binary)\r\n"+
	"	if lastIndex mod 2 Then\r\n"+
	"		IEBinaryToArray_ByteStr_Last = Chr( AscB( MidB( Binary, lastIndex, 1 ) ) )\r\n"+
	"	Else\r\n"+
	"		IEBinaryToArray_ByteStr_Last = "+'""'+"\r\n"+
	"	End If\r\n"+
	"End Function\r\n"+
	"</script>\r\n";
document.write(IEBinaryToArray_ByteStr_Script);

function readfile(callback,filename) {
	http.open('get', filename);
	
	if (http.overrideMimeType)
		http.overrideMimeType('text/plain; charset=x-user-defined');
	else
		http.setRequestHeader('Accept-Charset', 'x-user-defined');

	http.send(null);
	http.onreadystatechange = function() {
		if(http.readyState == 4){
			if (typeof http.responseBody=='undefined') {
				var response = http.responseText.split('').map(function(e){return e.charCodeAt(0) & 0xff});
				//alert(response);
				if (callback) callback(response);
			} else {
				var response = convertResponseBodyToText(http.responseBody).split('').map(function(e){return e.charCodeAt(0) & 0xff});
				if (callback) callback(response);
				http.onreadystatechange=null;
			}
		}
	};
}

