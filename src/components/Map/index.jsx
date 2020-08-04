import React, { useMemo } from 'react'
import DeckGL from '@deck.gl/react'
import { ScatterplotLayer, TextLayer } from '@deck.gl/layers'
import { StaticMap } from 'react-map-gl'
import { useAsync } from 'react-use'
import moment from 'moment'

const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoicm9iaW54aWEiLCJhIjoiY2lteG1paWJhMDNuY3ZobTR3MWlzaXc3YyJ9.-_adI58kkwW7-UtgvQcjMw'

const Map = () => {
  const state = useAsync(async () => {
    const response = await fetch('https://corona.lmao.ninja/v2/countries?sort=cases', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const result = await response.json()
    return result
  }, [])

  const data = useMemo(() => {
    if (!state?.value) return []

    return state.value.map((countryData) => {
      const {
        countryInfo: { lat, long },
      } = countryData
      return {
        geometry: { coordinates: [long, lat], type: 'Point' },
        properties: countryData,
        type: 'Feature',
      }
    })
  }, [state?.value])

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
    getPosition: (d) => d.geometry.coordinates,
    getRadius: (d) => d.properties.cases / 10,
    getFillColor: (d) => [255, 140, 0],
    getLineColor: (d) => [0, 0, 0],
    onHover: ({ object, x, y }) => {},
  })

  const textLayer = new TextLayer({
    id: 'text-layer',
    data,
    getColor: [255, 255, 255],
    pickable: true,
    getPosition: (d) => d.geometry.coordinates,
    getText: (d) => d.properties.country,
    getAngle: 0,
    getSize: 10,
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'top',
  })

  const getTooltip = ({ object }) => {
    if (object) {
      const { updated, flag, country, cases, deaths, active } = object.properties
      const date = moment(updated).format('LL')
      return `${country} \n Date: ${date} \n Active ${active} \n Confirmed: ${cases}\n Death ${deaths}`
    }
  }
  return (
    <DeckGL
      initialViewState={{ longitude: -114.0581, latitude: 51.0453, zoom: 2 }}
      controller={true}
      getTooltip={getTooltip}
      layers={[layer, textLayer]}
    >
      <StaticMap
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
    </DeckGL>
  )
}

export default Map
