import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'

import markerIcon from '../../assets/location.svg'

const Marker = () => (
  <img
    style={{
      height: '40px',
      position: 'absolute',
      transform: 'translate(-50%, 0)',
    }}
    src={markerIcon}
    alt="Marcador Mapa"
  />
)

const Map = ({ address }) => {
  const [center, setCenter] = useState({ lat: 39.82, lng: -98.57 })

  const getCoordinates = async (map, maps) => {
    const Geocoder = new maps.Geocoder()
    await Geocoder.geocode({ address }, function (results, status) {
      if (status === 'OK') {
        setCenter({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng(),
        })
      }
    })
  }

  if (!center) return <h1>Carregando...</h1>

  return (
    // Important! Always set the container height explicitly
    <>
      {center && (
        <div style={{ height: '300px' }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.REACT_APP_MAPS_KEY,
            }}
            onGoogleApiLoaded={({ map, maps }) => getCoordinates(map, maps)}
            yesIWantToUseGoogleMapApiInternals
            zoom={16}
            center={center}
          >
            <Marker lat={center.lat} lng={center.lng} />
          </GoogleMapReact>
        </div>
      )}
    </>
  )
}

export default Map
