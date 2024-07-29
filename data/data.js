export let places = [
    {
        id: "1",
        name: "Gov House",
        arear: "Bolari",
        state: "Gombe",
        lat: 10.281837929897305, 
        lng: 11.163837737176364 
    },
    {
        id: "2",
        name: "CBN",
        arear: "Buba Shongo",
        state: "Gombe",
        lat: 10.281837929897305, 
        lng: 11.163837737176364
    },
    {
        id: "3",
        name: "DSS",
        area: "Buba Shongo",
        state: "Gombe",
        lat: 10.281837929897305, 
        lng: 11.163837737176364 
    },   
]

function add_school(name, area, state,lat, lng){
    place = {
        id: 0,
        name: name,
        area: area,
        state: state,
        lat: lat, 
        lng: lng
    }
    places.push(place);    
}