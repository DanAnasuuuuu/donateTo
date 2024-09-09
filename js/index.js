let places = [
  {
      id: "1",
      name: "Malam Musa Tsangaya",
      area: "Bolari",
      state: "Gombe",
      lat: 10.281837929897305, 
      lng: 11.163837737176364 
  },
  {
      id: "2",
      name: "King Orphanage",
      area: "Buba Shongo",
      state: "Gombe", 
      lat: 10.292714531741417, 
      lng: 11.1393879503173124
  },
  {
      id: "3",
      name: "Malam Sambo Tsangaya",
      area: "Tudun Wada",
      state: "Gombe",
      lat: 10.30451430788377, 
      lng:  11.172868681000196
  },   
  {
      id: "4",
      name: "Mal. Buba Tsangaya",
      area: "Bolari",
      state: "Gombe",
      lat: 10.279520330231096,
      lng:  11.167661203168947
  },   
]


// Global variables
let match = '';
let latitude = null;
let longitude = null;
let selectPlace = document.querySelector('#select');


// The following block of code execute only when the content of the page is loaded
// 1.Add options to the select school dropdown
// 2.Initialize a blank map 
let optionsHtml = '<option value="">Almajiri Schools/Orphanages</option>';
document.addEventListener('DOMContentLoaded', ()=>{
    places.forEach(place =>{
        optionsHtml += `
        <option value="${place.id}">${place.name}</option>
        `;
    });
    document.querySelector('#select').innerHTML = optionsHtml;
    blankMap();
});


// Initialize and add the map
let map;


// The following functions intialize a map given a specific place.
async function initMap(place) {
  // The location of the place
  const position = { lat: place.lat, lng: place.lng };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at selected place
  map = new Map(document.getElementById("map"), {
    zoom: 17,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at selected place
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: `${place.name}, ${place.state}`,
  });
}

// The following function create a blank map of Gombe state
async function blankMap() {
  // The location of Gombe
  const position = { lat: 10.287181644822075, lng: 11.166351351103321 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered Gombe main round about
  map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: position,
    mapId: "DEMO_MAP_ID",
  });
}


// The following function get the location the device
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    console.log("Geolocation is not supported by this browser.");
    return ''
  }
}

// work together with getLoaction
function showPosition(position) {
  
   latitude =  position.coords.latitude; 
 longitude = position.coords.longitude;
  console.log(latitude, longitude);
}



// Add event "change" to facilitate selection of a particular school/orphanage
selectPlace.addEventListener('change', ()=>{
  if (selectPlace.value != ""){
    match = findMatch();
    initMap(match);
    let cood = {lat:latitude, lng:longitude};
    console.log(cood);
    document.querySelector('#direction').disabled = false;
  }
});

// Add click event to the direction button
document.querySelector('#direction').addEventListener('click', ()=>{
  if (document.querySelector('#select').value != ""){
    let cood = getLocation();
    // let match = findMatch();
    console.log("cood", cood, "match", match);
    direction(cood, match);
  }
})

// The following code allow the direction button to redirect to google map for directions
function direction(cood, match){
  window.open(`https://www.google.com/maps/dir/?api=1&origin=${cood.lat},${cood.lng}&destination=${match.lat},${match.lng}&travelmode=TRAVEL_MODE`)
}

// Look through the array of places and find the place that match users selection
function findMatch(){
  let match = '';
  let selectPlace = document.querySelector('#select');
  // console.log(selectPlace.value);
  places.forEach(place =>{
    if (place.id == selectPlace.value){
        match = place;
    }
  });
  return {lat: match.lat, lng: match.lng};
}
