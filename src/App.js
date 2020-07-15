import React from 'react'
import DeckGL from '@deck.gl/react'
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers'
import { StaticMap } from 'react-map-gl'
import { useAsync } from 'react-use'
import fetchGraphQL from './lib/fetchGraphQL'

import './App.css'

const DATA_ENDPOINT_URL = 'https://covid19-graphql.now.sh'

const CountryQuery = `query {
  country(name: "Canada") {
    name
    mostRecent {
      date(format: "yyyy-MM-dd")
      confirmed
      recovered
      deaths
      growthRate
    }
  }
}
`

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoicm9iaW54aWEiLCJhIjoiY2lteG1paWJhMDNuY3ZobTR3MWlzaXc3YyJ9.-_adI58kkwW7-UtgvQcjMw'

const App = () => {
  const state = useAsync(async () => {
    const response = await fetchGraphQL(DATA_ENDPOINT_URL, CountryQuery)
    const result = await response.data
    return result
  }, [])
  console.log('state: ', state)

  const {
    mostRecent: { date, confirmed, recovered, deaths, growthRate } = {},
  } = state?.value?.country || {}

  const data = [
    {
      geometry: { coordinates: [-114.0581, 51.0453], type: 'Point' },
      properties: {
        name: 'P-034',
        value: `Date: ${date} \n Active ${
          confirmed - recovered
        } \n Confirmed: ${confirmed}\n Recovered: ${recovered} \n Death ${deaths}, \n Growth Rate:${(
          growthRate * 100
        ).toFixed(2)}`,
      },
      type: 'Feature',
    },
  ]

  const layer = new ScatterplotLayer({
    id: 'scatterplot-layer',
    data,
    pickable: true,
    opacity: 0.2,
    stroked: true,
    filled: true,
    radiusScale: 6,
    radiusMinPixels: 1,
    radiusMaxPixels: 100,
    lineWidthMinPixels: 1,
    getPosition: d => d.geometry.coordinates,
    getRadius: d => 10,
    getFillColor: d => [255, 140, 0],
    getLineColor: d => [0, 0, 0],
    onHover: ({ object, x, y }) => {},
  })

  const textLayer = new TextLayer({
    id: 'text-layer',
    data,
    getColor: [255, 255, 255],
    pickable: true,
    getPosition: d => d.geometry.coordinates,
    getText: d => d.properties.value,
    getSize: 42,
    getAngle: 0,
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'top',
  })

  return (
    <DeckGL
      initialViewState={{ longitude: -114.0581, latitude: 51.0453, zoom: 12 }}
      controller={true}
      layers={[layer, textLayer]}
    >
      <StaticMap
        mapStyle='mapbox://styles/mapbox/dark-v9'
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  )
}

export default App
