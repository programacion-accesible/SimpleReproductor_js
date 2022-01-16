# SimpreReproductor_js

Este es un sencillo reproductor de audio diseñado para obtener un buen funcionamiento con lectores de pantalla. Programado en JavaScript vanilla y sin dependencias.  
[Demo](http://gera.ar/reproductor "Demostración en la página gera.ar")  

## ¿Como funciona?

Al terminar de cargarse el documento html recorre los elementos del dom en busca de objetos con la etiqueta audio. 
Construye en base al id de cada objeto los botones y funciones necesarias agregándolos al documento en caliente. 
Al pulsar el botón de reproducción en el documento se crean los atajos de cada acción y se asignan las funciones de cada botón. 
Si hay más de un elemento audio, al pulsar el botón de reproducción en otro elemento se eliminan los atajos asignados previamente, y se crean los nuevos en base al actual elemento. . 

## ¿Como se utiliza?

En nuestro documento html debemos importar el archivo reproductor.js, y crear la etiqueta de audio con un id diferente por cada etiqueta junto a su atributo src correspondiente del archivo a reproducir.
El script realiza las asignaciones colocando los atajos de teclado siguientes:

* Reproducir, pausar; alt + k
* Adelantar 10 segundos; alt + l
* Retroceder 10 segundos; alt + j
* Verbalizar el tiempo actual de reproducción y el total del archivo; alt + i
* Bajar el volúmen un 10 porciento; alt + o
* Subir el volúmen un 10 porciento; alt + u
* Silenciar y quitar silencio; alt + m


