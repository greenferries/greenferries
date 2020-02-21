import React from 'react'
import { Box } from '@chakra-ui/core'
import { Route, Redirect, Switch } from 'react-router-dom'

import Faq from './Faq'
import RouteSetterFromParams from './RouteSetterFromParams'
import Header from './Header'
import Footer from './Footer'
import ShipSearch from './ShipSearch'
import ShipPage from './ShipPage'
import CompanySearch from './CompanySearch'
import CompanyPage from './CompanyPage'
import FaqEcoScore from './FaqEcoScore'
import SitemapPage from './SitemapPage'
import AppDesktop from './AppDesktop'
import ComputedStatsPage from './ComputedStatsPage'
import TextureBackground from '../images/lines-texture-small.png'
import RouteTitle from './RouteTitle'
import ItinerariesComparator from './ItinerariesComparator'

const Layout = ({ children, resetRoute }) => (
  <Box
    minHeight='100vh'
    display='flex'
    flexDirection='column'
  >
    <Box
      backgroundImage={`url(${TextureBackground})`}
      paddingTop={10}
      paddingBottom={20}
      flexGrow={1}
    >
      <Box
        margin='auto'
        maxWidth={900}
        boxShadow='0 0 13px #999'
        background='white'
        borderRadius={20}
        paddingBottom={10}
      >
        <Header resetRoute={resetRoute} />
        {children}
      </Box>
    </Box>
    <Footer />
  </Box>
)

const AppRoutesDesktop = (allProps) => {
  const { airports, resetRoute, ships, companies, routes, selectedRoute, setSelectedRoute, selectedShipRoute, selectedShip, setSelectedShip, setSelectedShipRoute } = allProps
  return (
    <Layout resetRoute={resetRoute}>
      <Switch>
        <Route exact path='/'>
          <AppDesktop {...allProps} />
        </Route>
        <Route path='/routes/:routeSlug'>
          <RouteSetterFromParams {...allProps} />
          <AppDesktop {...allProps} />
        </Route>
        <Route exact path='/ships'>
          <ShipSearch ships={ships} companies={companies} />
        </Route>
        <Route path='/ships/:shipSlug'>
          <RouteTitle selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} setSelectedShipRoute={setSelectedShipRoute} />
          <ShipPage ships={ships} selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} setSelectedShipRoute={setSelectedShipRoute} selectedShipRoute={selectedShipRoute} selectedShip={selectedShip} setSelectedShip={setSelectedShip} />
        </Route>
        <Route exact path='/companies'>
          <CompanySearch companies={companies} />
        </Route>
        <Route path='/companies/:companySlug'>
          <CompanyPage companies={companies} />
        </Route>
        <Route exact path='/itineraries-comparator'>
          <RouteTitle
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
            setSelectedShipRoute={setSelectedShipRoute}
            selectedShip={selectedShip}
            withShip
          />
          <ItinerariesComparator
            ships={ships}
            airports={airports}
            selectedRoute={selectedRoute}
            setSelectedRoute={setSelectedRoute}
            selectedShipRoute={selectedShipRoute}
            setSelectedShipRoute={setSelectedShipRoute}
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
          />
        </Route>
        <Route exact path='/faq'>
          <Faq />
        </Route>
        <Route exact path='/ecoscore'>
          <FaqEcoScore />
        </Route>
        <Route exact path='/computed-statistics'>
          <ComputedStatsPage />
        </Route>
        <Route exact path='/sitemap'>
          <SitemapPage ships={ships} companies={companies} routes={routes} />
        </Route>

        <Redirect from='/select-route' to='/' />
        <Redirect from='/select-route-map' to='/' />
      </Switch>
    </Layout>
  )
}

export default AppRoutesDesktop
