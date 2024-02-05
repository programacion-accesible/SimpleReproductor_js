// Reproductor de audio simple y accesible para lectores de pantalla
// Autor: Gerardo Késsler (http://gera.ar)
// This file is covered by the GNU General Public License.

const audio_obj= document.querySelector('audio');
var audio_volume= 1.0;
let new_element= document.createElement("div");
new_element.innerHTML= `<ul style="list-style:none;margin-left:auto;margin-right:auto;">
	<li><button id="toggle" onClick="playPause();" accesskey="k">Reproducir</button></li>
	<li><button id="back" onClick="timeBack();" accesskey="j">Retroceder 10 segundos</button></li>
	<li><p id="time" onClick="speak(this.textContent);" accesskey="i">0:00</p></li>
	<li><button id="advance" onClick="timeAdvance();" accesskey="l">Adelantar 10 segundos</button></li>
	<li><label>Velocidad de reproducción><input type="range" min="0" max="100" step="10" value="50" onChange="audioRate(this.value);" /></label></li>
	<li><button id="up" onClick="volumeUp();" accesskey="u">Subir volúmen</button></li>
	<li><button id="toggle_mute" onClick="toggleMute();" accesskey="m">Silenciar, Quitar silencio</button></li>
	<li><button id="down" onClick="volumeDown();" accesskey="o">Bajar volúmen</button></li>
	<div id="alert" aria-live="assertive"></div>
</ul>`;
audio_obj.parentNode.insertBefore(new_element, audio_obj.nextSibling);

const toggle_btn= document.querySelector('#toggle');
const time_p= document.querySelector('#time');
const toggle_mute= document.querySelector('#toggle_mute');
var alert_obj= document.querySelector('#alert');

audio_obj.setAttribute('onTimeUpdate', 'audioTime();');
audio_obj.addEventListener('ended', () => {
	toggle_btn.innerHTML= 'Volver a reproducir';
	speak('Finalizado');
	toggle_btn.focus();
});

function playPause() {
	if (audio_obj.paused) {
		audio_obj.play();
		toggle_btn.innerHTML= "Pausar";
	} else {
		audio_obj.pause();
		toggle_btn.innerHTML= "Reproducir";
	}
}

function audioTime() {
	let minutos= parseInt(audio_obj.duration / 60, 10);
	var segundos= parseInt(audio_obj.duration % 60);
	var segundos= (segundos < 10)? `0${segundos}` : segundos;
	let ACT_minutos= parseInt(audio_obj.currentTime / 60, 10);
	var ACT_segundos= parseInt(audio_obj.currentTime % 60);
	var ACT_segundos= (ACT_segundos < 10)? `0${ACT_segundos}` : ACT_segundos;
	time_p.innerHTML= `${ACT_minutos}:${ACT_segundos} de ${minutos}:${segundos}`;
}

function timeAdvance() {
	audio_obj.currentTime += 10.0;
	let time_capture= time_p.textContent;
	//speak(time_capture);
}

function timeBack() {
	audio_obj.currentTime -= 10;
	let time_capture= time_p.textContent;
	//speak(time_capture);
}

function speak(str) {
	alert_obj.textContent= str;
	setTimeout(() => alert_obj.textContent= "", 50);
}

function audioRate(value) {
	let values= {'0':0.75, '10':0.80, '20':0.85, '30':0.90, '40':0.95, '50':1.0, '60':1.1, '70':1.2, '80':1.3, '90':1.4, '100':1.5};
	audio_obj.playbackRate= values[value];
}

function volumeUp() {
	if (audio_volume < 1.0) {
		audio_volume += 0.1;
		audio_obj.volume= audio_volume;
	} else {
		speak('volúmen máximo');
	}
}

function volumeDown() {
	if (audio_volume > 0.2) {
		audio_volume -= 0.1;
		audio_obj.volume= audio_volume;
	} else {
		speak('Volúmen mínimo');
	}
}

function toggleMute() {
	if (audio_obj.muted == false) {
		audio_obj.muted= true;
		speak('silenciado');
	} else {
		audio_obj.muted= false;
		speak('no silenciado');
	}
}
