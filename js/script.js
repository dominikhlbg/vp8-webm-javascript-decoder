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

function EventListener(obj,evt,fnc,useCapture){
	if (!useCapture) useCapture=false;
	if (obj.addEventListener){
		obj.addEventListener(evt,fnc,useCapture);
		return true;
	} else if (obj.attachEvent) return obj.attachEvent("on"+evt,fnc);
} 

function disabledbuttons() {
	var buttons = document.getElementsByTagName('input');
	for(var i=0;i<buttons.length;i++)
	buttons[i].disabled=true;
}
	
var canvas, context;

window.onload = function(){
	isActive=false;
	var buttons = document.getElementsByTagName('input');
	for(var i=0;i<buttons.length;i++)
	buttons[i].disabled=false;
		
	canvas = document.getElementById("vpximage"),
	context = canvas.getContext("2d");
	  
	context.fillText("Choose one WebM - file from above", 52, 72);
	if (typeof FileReader !== "undefined")
	context.fillText("or drop a *.webm file into this field", 55, 82);
	
	EventListener(canvas, "dragenter", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}, false);

	EventListener(canvas, "dragover", function (evt) {
		evt.preventDefault();
		evt.stopPropagation();
	}, false);

	EventListener(canvas, "drop", function (evt) {
		var files = evt.dataTransfer.files;
		if (files.length > 0) {
			evt.preventDefault();
			evt.stopPropagation();
			var file = files[0];
			if (typeof FileReader !== "undefined") {
				if(!isActive) {
				var freader = new FileReader();
				freader.onload = function (evt) {
					isActive=true;
					disabledbuttons();
					webmdata(evt.target.result.split('').map(function(e){return e.charCodeAt(0) & 0xff}));
				};
				freader.readAsBinaryString(file);
				} else alert('refresh your browser to add a new file');
			} else {
				alert('Your Browser don\'t support the Filereader API');
			}
		}
	}, false);
}