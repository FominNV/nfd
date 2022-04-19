import { FC, useCallback, useMemo } from "react"
import { YMaps, Map, Placemark, FullscreenControl, PlacemarkGeometry } from "react-yandex-maps"

import marker from "assets/icons/OrderMap/marker.svg"
import { IOrderMapProps } from "./types"

const OrderMap: FC<IOrderMapProps> = ({ mapState, dataGeo, setState }) => {
  const placeMarkers = useMemo<JSX.Element[]>(() => {
    return dataGeo.map((elem, index) => (
      <Placemark
        geometry={elem.coord}
        onClick={() => setState(elem.name)}
        options={{
          iconLayout: "default#image",
          iconImageHref: marker,
          iconImageSize: [18, 18],
          iconImageOffset: [-9, -9]
        }}
        key={`Placemark_${index}`}
      />
    ))
  }, [setState, dataGeo])

  return (
    <YMaps>
      <Map
        state={mapState}
        width="100%"
        height={320}
      >
        <FullscreenControl />
        {placeMarkers}
      </Map>
    </YMaps>
  )
}

export default OrderMap
