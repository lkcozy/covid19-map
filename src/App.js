import React from 'react'
import DeckGL from '@deck.gl/react'
import { StaticMap } from 'react-map-gl'
import './App.css'

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoicm9iaW54aWEiLCJhIjoiY2lteG1paWJhMDNuY3ZobTR3MWlzaXc3YyJ9.-_adI58kkwW7-UtgvQcjMw'

const App = () => {
  return (
    <DeckGL
      initialViewState={{ longitude: -114.0581, latitude: 51.0453, zoom: 12 }}
      controller={true}
      layers={[]}
    >
      <StaticMap
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  )
}

export default App
