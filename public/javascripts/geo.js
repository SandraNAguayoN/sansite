//Cargar coordenadas Mapa leaflet
var latitude = document.getElementById('lat').value;
var longitude = document.getElementById('long').value;
var mymap = L.map('mapid').setView([21.15756, -100.93452], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=sk.eyJ1Ijoic2FuZHJhZ3VheTMxIiwiYSI6ImNrZ3VqN2d4eDA0Z3EydG44cXlwbDRkYWYifQ.AQ6DW4KKlteosEK9D8borA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }).addTo(mymap);


