import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "store/selectors"
import {
  setLockOrderStep,
  setOrderCar,
  setOrderExtra,
  setPlaceCity,
  setPlaceStreet
} from "store/order/actions"
import { setLoading } from "store/common/actions"
import { IMapState } from "components/OrderBlock/OrderMap/types"
import { getPoints } from "store/location/actions"
import useCoordinates from "hooks/useCoordinates"
import OrderInput from "components/OrderBlock/OrderInput"
import OrderMap from "components/OrderBlock/OrderMap"
import Loading from "components/Loading"
import { IPoint } from "store/location/types"
import { IGeoCoordinate, showOnMapType } from "./types"

import "./styles.scss"

const Place: FC = () => {
  const { order, common, location } = useTypedSelector((state) => state)
  const [city, setCity] = useState<Nullable<string>>(order.place.city?.name || common.city || null)
  const [street, setStreet] = useState<Nullable<string>>(order.place.street?.address || null)
  const [streetGeo, setStreetGeo] = useState<Nullable<IGeoCoordinate[]>>(null)
  const [cityGeo, setCityGeo] = useState<Nullable<IGeoCoordinate[]>>(null)
  const [mapState, setMapState] = useState<IMapState>({ center: [55.355198, 86.086847], zoom: 10 })

  const params = useParams()
  const dispatch = useDispatch()

  const setCoordinateStates = useCallback<VoidFunc<IPoint[]>>(async (data) => {
    const geoStreets = await Promise.all(
      data.map(async (elem) => {
        const cityName = elem.cityId.name
        const streetName = elem.address.split(",")[0].replace(/^ул\./, "").trim()
        const arrayAddress = elem.address.split(" ")
        const numberValue = arrayAddress[arrayAddress.length - 1]
        const address = `${cityName}+${streetName}+${numberValue}`
        const coordinates = await useCoordinates(address)

        return {
          name: elem.address,
          coord: coordinates
        }
      })
    )
    setStreetGeo(geoStreets)

    const geoCities = await Promise.all(
      data.map(async (elem) => {
        const coordinates = await useCoordinates(elem.cityId.name)
        return {
          name: elem.cityId.name,
          coord: coordinates
        }
      })
    )
    setCityGeo(geoCities)
  }, [])

  const setPlaceByStreet = useCallback<VoidFunc<string>>(
    (currentStreet) =>
      location.points?.map((elem) => {
        if (elem.address === currentStreet) {
          dispatch(setPlaceCity({ name: elem.cityId.name, id: elem.cityId.id }))
          dispatch(setPlaceStreet({ address: elem.address, id: elem.id }))
        }
      }),
    [dispatch, location.points]
  )

  const showCityOnMap = useCallback<showOnMapType>((town, data) =>
    data.map((elem) => {
      if (elem.name === town) {
        setMapState({ center: elem.coord, zoom: 10 })
      }
    }), [])

  const showOrderPlaceOnMap = useCallback<showOnMapType>((address, data) =>
    data.map((elem) => {
      if (elem.name === address) {
        setMapState({ center: elem.coord, zoom: 17 })
      }
    }), [])

  useEffect(() => {
    if (street && streetGeo) {
      setPlaceByStreet(street)
      showOrderPlaceOnMap(street, streetGeo)
      dispatch(setLockOrderStep("car", true))
    } else {
      dispatch(setPlaceStreet(null))
    }
  }, [street, streetGeo, dispatch, setPlaceByStreet, showOrderPlaceOnMap])

  useEffect(() => {
    if (!city) {
      dispatch(setPlaceCity(null))
      dispatch(setPlaceStreet(null))
    }
  }, [city, dispatch])

  useEffect(() => {
    if (city && cityGeo) {
      showCityOnMap(city, cityGeo)
    }
  }, [city, cityGeo, showCityOnMap])

  useEffect(() => {
    if (order.place.city?.name && order.place.city.name !== city) {
      setCity(order.place.city.name)
    }
  }, [city, order.place.city])

  useEffect(() => {
    if (!order.place.street) {
      dispatch(setOrderCar(null))
      dispatch(setOrderExtra(null))
      dispatch(setLockOrderStep("car", false))
      dispatch(setLockOrderStep("extra", false))
      dispatch(setLockOrderStep("total", false))
    }
  }, [dispatch, order.place.street])

  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(getPoints())
  }, [dispatch])

  useEffect(() => {
    if (location.points) {
      setCoordinateStates(location.points)
    }
  }, [location.points, setCoordinateStates])

  useEffect(() => {
    if (streetGeo && cityGeo && params.id === "place") {
      dispatch(setLoading(false))
    }
  }, [streetGeo, cityGeo, params.id, dispatch])

  const cityData = useMemo<string[]>(
    () => (location.points ? location.points.map((elem) => elem.cityId?.name) : []),
    [location.points]
  )

  const streetData = useMemo<string[]>(() => {
    if (location.points) {
      const data = !city
        ? location.points
        : location.points.filter((elem) => elem.cityId.name === city)
      return data.map((elem) => elem.address)
    }
    return []
  }, [city, location.points])

  const map = useMemo<ReactNode>(
    () => streetGeo && (
    <OrderMap
      mapState={mapState}
      dataGeo={streetGeo}
      setState={setStreet}
    />
    ),
    [streetGeo, mapState]
  )

  const content = useMemo<ReactNode>(
    () =>
      (common.loading ? (
        <Loading />
      ) : (
        <>
          <div className="Place__inputs">
            <OrderInput
              id="city"
              label="Город"
              placeholder="Введите город"
              value={order.place.city?.name}
              defaultValue={common.city}
              data={cityData}
              setState={setCity}
            />
            <OrderInput
              id="street"
              label="Пункт выдачи"
              placeholder="Начните вводить пункт ..."
              value={order.place.street?.address}
              data={streetData}
              setState={setStreet}
              disabled={!city}
            />
          </div>

          <div className="Place__map-wrap">
            <p className="Place__map-text">Выбрать на карте:</p>
            <div className="Place__map">{map}</div>
          </div>
        </>
      )),
    [
      common.loading,
      city,
      cityData,
      common.city,
      map,
      order.place.city?.name,
      order.place.street?.address,
      streetData
    ]
  )

  return <div className="Place">{content}</div>
}

export default Place
