// import React from 'react'
import { useParams } from 'react-router'
import { useEffect } from 'react'

const RouteSetterFromParams = ({ setSelectedCountry, setSelectedRoute, selectedRoute, routes, countries }) => {
  const params = useParams()

  const { routeSlug: routeSlugFromLocation } = params

  useEffect(() => {
    if (routes && routeSlugFromLocation && !selectedRoute) {
      const route = routes.find(r => r.slug === routeSlugFromLocation)
      if (!route) return
      setSelectedCountry(countries.find(c => route.cityA.country === c.code))
      setSelectedRoute(route)
    }
  }, [routeSlugFromLocation, routes, countries, selectedRoute, setSelectedCountry, setSelectedRoute])

  return null
}

export default RouteSetterFromParams
