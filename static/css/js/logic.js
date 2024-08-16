const earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson'


let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


var map = L.map('map', {
    center: [39.09, -95.71],
    zoom: 4,
    layers: [tileLayer]
});

let baseMaps = {
    "streets": tileLayer
};

let earthquake = new L.LayerGroup();
let plates = new L.LayerGroup();

let overlays = {
    "Earthquakes": earthquake,
    "Tectonic Plates": plates
};

L.control.layers(baseMaps, overlays).addTo(map)

function crfStyle(feature) {
    return {
        color: changeColor(feature.geometry.coordinates[2]),
        radius: changeRadius(feature.properties.mag),
        fillColor: changeColor(feature.geometry.coordinates[2])
    }
};

let changeColor = (depth) => {
    if (depth > 90) return "red";
    else if (depth > 10) return "orange";
    else if (depth > 30) return "yellow";
    else if (depth > 50) return "pink";
    else if (depth > 70) return "blue";
    else return "green";

};

function changeRadius(magnitude) {
    return magnitude * 5;
};

d3.json(earthquakeUrl).then(function (data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latlon) {
            return L.circleMarker(latlon).bindPopup(feature.id);
        },
        style: crfStyle
    }).addTo(earthquake);
    earthquake.addTo(myMap);

    
});





