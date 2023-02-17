import axios from 'axios';
import React from 'react'

function Test() {

  const googleMaps = () =>{

    axios.get('https://maps.googleapis.com/maps/api/js?key=AIzaSyB9qHB47v8fOmLUiByTvWinUehYqALI6q4')
    .then(res=>console.log(res))
    let autocomplete;
    let id = "location";

    autocomplete = new google.maps.places.Autocomplete((document.getElementById(id)),{types:['geocode']})
    console.log(autocomplete)
    google.maps.event.addListener(autocomplete, 'place_changed', function(){
      let place = autocomplete.getPlace();
      document.getElementById("lat").value = place.geometry.location.lat();
      document.getElementById("long").value = place.geometry.location.lng();
    })
    
  }
  
  return (
    <div className="h-screen">
      <input type="text" id="location" onChange={googleMaps}/>
      <input type="text" placeholder="Latitude" id="lat"/>
      <input type="text" placeholder="Longitude" id="long"/>
    </div>
  )
}

export default Test