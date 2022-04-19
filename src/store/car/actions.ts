import useFetch from "hooks/useFetch"
import { FetchMethod, URLS } from "hooks/useFetch/types"
import { Dispatch } from "react"
import { CarAction, CarActionTypes, CarDispatch, ICar } from "./types"

export const getCars = () => async (dispatch: Dispatch<CarAction>) => {
  const fetchOptions = {
    method: FetchMethod.GET,
    headers: {
      "X-Api-Factory-Application-Id": process.env.REACT_APP_API_KEY as string
    }
  }

  const { data, error } = await useFetch(URLS.CAR_URL, fetchOptions)

  if (error) {
    throw new Error("Can't get cars...")
  }

  dispatch({
    type: CarActionTypes.GET_CARS,
    payload: { cars: data?.data as ICar[] }
  })
}

export const setCurrentCar: CarDispatch<ICar> = (current) => {
  return {
    type: CarActionTypes.SET_CURRENT_CAR,
    payload: { current }
  }
}
