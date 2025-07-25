import React from 'react'
import {Marker} from 'sanity'

export default function renderCustomMarkers(markers: Marker[]) {
  return (
    <div>
      {markers.map((marker, index) => {
        if (marker.type === 'comment') {
          return <div key={`marker${index}`}>A comment!</div>
        }
        return null
      })}
    </div>
  )
}
