import { FetchMethod } from "hooks/useFetch/types"
import { useCoordinatesType, IGeoResponse } from "./types"

const useCoordinates: useCoordinatesType = async (address) => {
  const apiKey = process.env.REACT_APP_YANDEX_KEY
  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&geocode=${address}&format=json`

  const fetchOptions = {
    method: FetchMethod.GET
  }

  const res = await fetch(url, fetchOptions)
  const data: IGeoResponse = await res.json()

  const posArray = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(" ")
  return posArray.map((item) => Number(item)).reverse()
}

export default useCoordinates
