import React from 'react'
import DeckGL from '@deck.gl/react'
import { ScatterplotLayer } from '@deck.gl/layers'
import { StaticMap } from 'react-map-gl'
import './App.css'

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoicm9iaW54aWEiLCJhIjoiY2lteG1paWJhMDNuY3ZobTR3MWlzaXc3YyJ9.-_adI58kkwW7-UtgvQcjMw'

const data = [
  {
    geometry: { coordinates: [-114.0581, 51.0453], type: 'Point' },
    properties: { name: 'P-034' },
    type: 'Feature',
  },
]

const layer = new ScatterplotLayer({
  id: 'scatterplot-layer',
  data,
  pickable: true,
  opacity: 0.8,
  stroked: true,
  filled: true,
  radiusScale: 6,
  radiusMinPixels: 1,
  radiusMaxPixels: 100,
  lineWidthMinPixels: 1,
  getPosition: d => d.geometry.coordinates,
  getRadius: d => 100,
  getFillColor: d => [255, 140, 0],
  getLineColor: d => [0, 0, 0],
  onHover: ({ object, x, y }) => {},
})

const App = () => {
  return (
    <DeckGL
      initialViewState={{ longitude: -114.0581, latitude: 51.0453, zoom: 12 }}
      controller={true}
      layers={[layer]}
    >
      <StaticMap
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  )
}

export default App
