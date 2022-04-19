import useFetch from "hooks/useFetch"
import { FetchMethod, URLS } from "hooks/useFetch/types"
import { Dispatch } from "react"
import { IRate, RateAction, RateActionTypes, RateDispatch } from "./types"

export const getRates = () => async (dispatch: Dispatch<RateAction>) => {
  const fetchOptions = {
    method: FetchMethod.GET,
    headers: {
      "X-Api-Factory-Application-Id": process.env.REACT_APP_API_KEY as string
    }
  }

  const { data, error } = await useFetch(URLS.RATE_URL, fetchOptions)

  if (error) {
    throw new Error("Can't get rates...")
  }

  const fetchRates = data?.data as IRate[]
  const dataRates = fetchRates.filter((elem: IRate) => elem.rateTypeId)

  dispatch({
    type: RateActionTypes.GET_RATES,
    payload: { rates: dataRates }
  })
}

export const setCurrentRate: RateDispatch<IRate> = (rate) => {
  return {
    type: RateActionTypes.SET_CURRENT_RATE,
    payload: { rate }
  }
}
