import useFetch from "hooks/useFetch"
import { FetchMethod, URLS } from "hooks/useFetch/types"
import { Dispatch } from "react"
import { IPoint, LocationAction, LocationActionTypes } from "./types"

export const getPoints = () => async (dispatch: Dispatch<LocationAction>) => {
  const fetchOptions = {
    method: FetchMethod.GET,
    headers: {
      "X-Api-Factory-Application-Id": process.env.REACT_APP_API_KEY as string
    }
  }

  const { data, error } = await useFetch(URLS.POINT_URL, fetchOptions)

  if (error) {
    throw new Error("Can't get points...")
  }
  const dataPoints = data?.data as IPoint[]
  const fetchPoints = dataPoints.filter((elem: IPoint) => elem.cityId)

  dispatch({
    type: LocationActionTypes.GET_POINTS,
    payload: { points: fetchPoints }
  })
}
