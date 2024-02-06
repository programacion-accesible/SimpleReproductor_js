// Reproductor de audio simple y accesible para lectores de pantalla
// Autor: Gerardo Késsler (http://gera.ar)
// This file is covered by the GNU General Public License.

// Obtenemos el elemento audio del dom
const audio_obj= document.querySelector('audio');
// Declaramos la variable de control de volúmen con el valor máximo
var audio_volume= 1.0;
// Creamos el elemento div, y añadimos una lista de botones y otros elementos del reproductor, incluyendo atajos de teclado con accesskey
let new_element= document.createElement("div");
new_element.innerHTML= `<ul style="list-style:none;margin-left:auto;margin-right:auto;">
	<li><button id="toggle" onClick="playPause();" accesskey="k">Reproducir</button></li>
	<li><button onClick="timeBack();" accesskey="j">Retroceder 5 segundos</button></li>
	<li><p id="time" onClick="speak(this.textContent);" accesskey="i">0:00</p></li>
	<li><button onClick="timeAdvance();" accesskey="l">Adelantar 5 segundos</button></li>
	<li><label>Velocidad de reproducción><input type="range" min="0" max="100" step="10" value="50" onChange="audioRate(this.value);" /></label></li>
	<li><button onClick="volumeUp();" accesskey="u">Subir volúmen</button></li>
	<li><button onClick="toggleMute();" accesskey="m">Silenciar, Quitar silencio</button></li>
	<li><button onClick="volumeDown();" accesskey="o">Bajar volúmen</button></li>
	<div id="alert" aria-live="assertive"></div>
</ul>`;
// Insertamos new_element justo debajo del elemento audio
audio_obj.parentNode.insertBefore(new_element, audio_obj.nextSibling);

// obtenemos los elementos toggle, time_p y alert anteriormente añadidos
const toggle_btn= document.querySelector('#toggle');
const time_p= document.querySelector('#time');
var alert_obj= document.querySelector('#alert');

//añadimos al elemento audio el atributo atributo onTimeUpdate
audio_obj.setAttribute('onTimeUpdate', 'audioTime();');

// agregamos un manejador de eventos al elemento audio para que renombre el botón al finalizar la reproducción
audio_obj.addEventListener('ended', () => {
	toggle_btn.textContent= 'Volver a reproducir';
	speak('Finalizado');
	toggle_btn.focus();
});

function playPause() {
	// verificamos si el audio está pausado, renombramos el botón y activamos o pausamos el audio según corresponda
	if (audio_obj.paused) {
		audio_obj.play();
		toggle_btn.textContent= "Pausar";
	} else {
		audio_obj.pause();
		toggle_btn.textContent= "Reproducir";
	}
}

// función que formatea el tiempo de duración en minutos y segundos, y renombra el elemento time_p
function audioTime() {
	let minutos= parseInt(audio_obj.duration / 60, 10);
	var segundos= parseInt(audio_obj.duration % 60);
	var segundos= (segundos < 10)? `0${segundos}` : segundos;
	let ACT_minutos= parseInt(audio_obj.currentTime / 60, 10);
	var ACT_segundos= parseInt(audio_obj.currentTime % 60);
	var ACT_segundos= (ACT_segundos < 10)? `0${ACT_segundos}` : ACT_segundos;
	time_p.textContent= `${ACT_minutos}:${ACT_segundos} de ${minutos}:${segundos}`;
}

// función que suma 5 al valor currentTime. Para verbalizar el valor de time_p, quitar los comentarios a las líneas correspondientes
function timeAdvance() {
	audio_obj.currentTime += 5.0;
	// let time_capture= time_p.textContent;
	// speak(time_capture);
}

// función que resta 5 al valor currentTime. Para verbalizar el valor de time_p, quitar los comentarios a las líneas correspondientes
function timeBack() {
	audio_obj.currentTime -= 5;
	// let time_capture= time_p.textContent;
	// speak(time_capture);
}

// función de verbalización para api de accesibilidad. Se actualiza el elemento alert, el cual tiene atributo aria-live con el valor assertive, y se elimina el texto luego de 50 ms de espera
function speak(str) {
	alert_obj.textContent= str;
	setTimeout(() => alert_obj.textContent= "", 50);
}

function audioRate(value) {
	// creamos un diccionario con las equivalencias de los valores de velocidad con el formato de 0 a 100 porciento
	let values= {'0':0.75, '10':0.80, '20':0.85, '30':0.90, '40':0.95, '50':1.0, '60':1.1, '70':1.2, '80':1.3, '90':1.4, '100':1.5};
	// modificamos el valor del atributo playbackRate con el recibido por parámetro con su equivalente en el diccionario
	audio_obj.playbackRate= values[value];
}

// función que aumenta en 0.1 el volúmen si el valor del mismo es menor a 1.0, de lo contrario verbaliza volúmen máximo
function volumeUp() {
	if (audio_volume < 1.0) {
		audio_volume += 0.1;
		audio_obj.volume= audio_volume;
	} else {
		speak('volúmen máximo');
	}
}

// función que disminuye en 0.1 el volúmen si el valor del mismo es mayor a 0.2, de lo contrario verbaliza volúmen mínimo
function volumeDown() {
	if (audio_volume > 0.2) {
		audio_volume -= 0.1;
		audio_obj.volume= audio_volume;
	} else {
		speak('Volúmen mínimo');
	}
}

// función que conmuta entre silenciado y activo, verbalizando su estado al cambiarlo
function toggleMute() {
	if (audio_obj.muted == false) {
		audio_obj.muted= true;
		speak('silenciado');
	} else {
		audio_obj.muted= false;
		speak('no silenciado');
	}
}
