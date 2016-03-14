//MegaCities map

//defining a function to create the map
function createMap() {
//creating a variable called map that initializes our map, with zoom level and map center set
	var map = L.map('map').setView([30, 0], 2);
	
	//Here, the tile layer (base map) is set and added to the map
	L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
		maxZoom: 19,
		attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);

	//getData function is called to get the data for the map element
	getData(map);
};

//a funciton called onEachFeature is defined to add popup content for all properties
function onEachFeature (feature, layer) {
	var popupContent = "";
	//a loop is created to add the property names and property values as an HTML paragraph element
	if (feature.properties) {
		for (var property in feature.properties) {
			popupContent += "<p>" + property + ":" + feature.properties[property] + "</p>";
		}
		//The content will be displayed as a popup
		layer.bindPopup(popupContent);
	};
};

//creating a function to load in data from MegaCities.geojson using jquery ajax method
function getData(map) {
	$.ajax("data/MegaCities.geojson", {
		dataType: "json",
		success: function (response) {
			//marker style options are set to a variable
			var geojsonMarkerOptions = {
				radius: 8,
				fillColor: "#ff7800",
				color: "#000",
				weight: 1,
				opacity: 1,
				fillOpacity: 0.8
			};
			//geoJSON layer with leaflet is created to add data to the map
			L.geoJson(response, {
				//pointToLayer is used to change the marker features to circle markers, 
				//styled with geojsonMarkerOptions
				pointToLayer: function (feature, latlng) {
					return L.circleMarker (latlng, geojsonMarkerOptions);
				},
				//onEachFeature function is called to bind the data to the popup
				onEachFeature: onEachFeature
			}).addTo(map);
		}
	});
};

//when the DOM is ready, createMap is called 
$(document).ready(createMap);
