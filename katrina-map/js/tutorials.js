//leaflet tutorials document

//Quick Start tutorial
//creating a variable called map that initializes our map, with zoom level and map center set
var map = L.map('map').setView([51.505, -0.09], 13);

//Here, the tile layer (base map) is set and added to the map
L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}', {
	maxZoom: 19,
	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//A variable called marker is created and set to a marker put on the map at specified coordinates
var marker = L.marker([51.5, -0.09]).addTo(map);

//A variable called circle is created and set to a circle put on the map at a specific place with a specific radius
var circle = L.circle([51.508, -0.11], 500, {
	//style properties for the circle are assigned
	color: 'red',
	fillColor: '#fo3',
	fillOpacity: 0.5
}).addTo(map);

//a polygon is created with the vertices set to specified coordinates
var polygon = L.polygon([
	[51.509, -0.08],
	[51.503, -0.06],
	[51.51, -0.047]
]).addTo(map);

//A popup is created for the marker that is immediately opened
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
//A popup is created for the circle
circle.bindPopup("I am a circle.");
//A popup is created for the polygon
polygon.bindPopup("I am a polygon.");

//The following is commented out to avoid overlapping code because there were multiple ways of doing the same/similar things
//mentioned in the tutorial
//Below, a popup is created as a layer which is opened when the map loads
// var popup = L.popup()
// 	.setLatLng([51.5, -0.09])
// 	.setContent("I am a standalone popup.")
//Because .openOn is used, popups are closed when others are clicked opened
// 	.openOn(map);

//a function is created to open an alert with specific coordinates when a place on the map is clicked
// function onMapClick(e) {
// 	alert("You clicked the map at " + e.latlng);
// }

// map.on('click', onMapClick);

//a popup layer is set to the variable popup
var popup = L.popup();

//A function is created to open a popup and give a message with coordinates when a place on the map is clicked
function onMapClick(e) {
	popup
		.setLatLng(e.latlng)
		.setContent("You clicked the map at " + e.latlng.toString())
		.openOn(map);
}

map.on('click', onMapClick);

//GeoJSON with Leaflet tutorial
//The below code is commented out because it is redundant with ohter pieces of code
//A geojson feature with certain properties and geometry is created and added to the map as a geoJSON layer
// var geojsonFeature = {
// 	"type": "Feature",
// 	"properties": {
// 		"name": "Coors Field",
// 		"amenity": "Baseball Stadium",
// 		"popupContent": "This is where the Rockies play!"
// 	},
// 	"geometry": {
// 		"type": "Point",
// 		"coordinates": [-104.99404, 39.75621]
// 	}
// };

// L.geoJson(geojsonFeature).addTo(map);

//an array of geoJSON objects is created to add lines to the map
var myLines = [{
	"type": "LineString",
	"coordinates": [[-100, 40], [-105, 45], [-110, 55]]
}, {
	"type": "LineString",
	"coordinates": [[-105, 40], [-110, 45], [-115, 55]]
}];

// var myLayer = L.geoJson().addTo(map);
// myLayer.addData(geojsonFeature);

//style properties are set to the myStyle variable
var myStyle = {
	"color": "#ff7800",
	"weight": 5,
	"opacity": 0.65
};

//the lines styled with the myStyle properties are added as a geoJSON layer
L.geoJson(myLines, {
	style: myStyle
}).addTo(map);

//an array of geoJSON objects is created to add polygons to the map
var states = [{
	"type": "Feature",
	"properties": {"party": "Republican"},
	"geometry": {
		"type": "Polygon",
		"coordinates": [[
			[-104.05, 48.99],
			[-97.22, 48.98],
			[-96.58, 45.94],
			[-104.03, 45.94],
			[-104.05, 48.99]
		]]
	}
}, {
	"type": "Feature",
	"properties": {"party": "Democrat"},
	"geometry": {
		"type": "Polygon",
		"coordinates": [[
			[-109.05, 41.00],
			[-102.06, 40.99],
			[-102.03, 36.99],
			[-109.04, 36.99],
			[-109.05, 41.00]
		]]
	}
}];

//A function is created to style a specified property-in this case the party property is colored based
//on what that property is
L.geoJson(states, {
	style: function(feature) {
		switch (feature.properties.party) {
			case 'Republican': return {color: "#ff0000"};
			case 'Democrat': return {color: "#0000ff"};
		}
	}
}).addTo(map);

//A filter option is created (as an array of geoJSON objects)
//Busch Field will not be shown on the map because the show_on_map property is set to false
var someFeatures = [{
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "show_on_map": true
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
}, {
    "type": "Feature",
    "properties": {
        "name": "Busch Field",
        "show_on_map": false
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.74621]
    }
}];

//This is the geoJSON layer where we say we want the filter to be based on show_on_map
L.geoJson(someFeatures, {
    filter: function(feature, layer) {
        return feature.properties.show_on_map;
    }
}).addTo(map);

//the onEachFeature function is called on each feature, in this case, to add
//content from popupContent as a popup when clicked
function onEachFeature(feature, layer) {
	//if this feature have a property named popupContent, then that info will be displayed in the popup
	if (feature.properties && feature.properties.popupContent) {
		layer.bindPopup(feature.properties.popupContent);
	}
}

//this is a geoJSON feature containing properties and certain geometry
var geojsonFeature = {
	"type": "Feature",
	"properties": {
		"name": "Coors Field",
		"amenity": "Baseball Stadium",
		"popupContent": "This is where the Rockies play!"
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-104.99404, 39.75621]
	}
};

//a geoJSON layer is created where the geojsonFeature feature is passed to the 
//onEachFeature option and adds it to the map
//this allows for the popup to be on the map when the marker is clicked
L.geoJson(geojsonFeature, {
	onEachFeature: onEachFeature
}).addTo(map);

//style opetions for a marker are set to the variable geojsonMarkerOptions
var geojsonMarkerOptions = {
	radius: 8,
	fillColor: "#ff7800",
	color: "#000",
	weight: 1,
	opacity: 1,
	fillOpacity: 0.8
};

//a geoJSOn layer is created and added to the map where the geojsonFeature feature is passed to a function
//the function creates circle markers and styles them with geojsonMarkerOptions
L.geoJson(geojsonFeature, {
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, geojsonMarkerOptions);
	}
}).addTo(map);