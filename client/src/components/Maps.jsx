import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};



function Maps() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB9qHB47v8fOmLUiByTvWinUehYqALI6q4"
  })

  const [center,setCenter] = React.useState({
    lat: 0,
    lng: 0
  })
  
  React.useEffect(()=>{
    setCenter({  lat: -12.0939685,
      lng: -76.9501867})
  },[])
  

  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const zoom = 18
    map.setZoom(zoom)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        
      >
        <Marker position={center}></Marker> 
        <></>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Maps)