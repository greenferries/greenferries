import React from 'react'
import { Map, TileLayer, Polyline, Tooltip } from 'react-leaflet'
import Media from 'react-media'
import { useHistory } from 'react-router'
import 'leaflet/dist/leaflet.css'

const position = [46.845, 0.615] // france

const RouteSelectMap = ({ routes, setSelectedRoute, selectedRoute, setSelectedCountry, countries }) => {
  const history = useHistory()

  return (
    <Media query='(max-width: 48em)'>
      {screenIsSmall =>
        <Map
          center={position}
          zoom={5}
          style={{
            height: screenIsSmall ? 'calc(100vh - 120px)' : '400px',
            width: screenIsSmall ? '100%' : '400px',
            borderRadius: screenIsSmall ? '0' : '30px',
            boxShadow: screenIsSmall ? 'none' : '0px 5px 13px rgba(0, 0, 0, 0.25)'
          }}
        >
          <TileLayer
            attribution='&amp;copy <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRpcGFzcXVhbGUiLCJhIjoiY2pxZjludW05NG13dDQ4bGMxM3ByaWVrNyJ9.jPlbYXNedgJ1thHf8LRITA'
            id='mapbox/satellite-v9'
          />
          {routes.map(route => {
            const a = [route.cityA.latitude, route.cityA.longitude]
            const b = [route.cityB.latitude, route.cityB.longitude]
            const isSelected = selectedRoute && selectedRoute.slug === route.slug
            return (
              <Polyline
                key={route.slug}
                positions={[[a, b]]}
                color={isSelected ? 'red' : 'white'}
                onClick={() => {
                  setSelectedCountry(countries.find(c => c.code === route.cityA.country))
                  setSelectedRoute(route)
                  history.push(`/routes/${route.slug}`)
                }}
              >
                <Tooltip>
                  {route.cityA.name}
                  <span role='img' aria-label='to and from'>↔️</span>
                  {route.cityB.name}
                </Tooltip>
              </Polyline>
            )
          })}
        </Map>}
    </Media>
  )
}

export default RouteSelectMap
