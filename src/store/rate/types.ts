export interface IRateState {
  all: Nullable<IRate[]>
  current: Nullable<IRate>
}

export interface IRate {
  price: number
  rateTypeId: {
    unit: string
    name: string
    id: string
  }
}

export type RateDispatch<T> = (value: T) => RateAction

export enum RateActionTypes {
  GET_RATES = "GET_RATES",
  SET_CURRENT_RATE = "SET_CURRENT_RATE"
}

type GetRatesAction = {
  type: RateActionTypes.GET_RATES
  payload: { rates: Nullable<IRate[]> }
}

type SetCurrentRateAction = {
  type: RateActionTypes.SET_CURRENT_RATE
  payload: { rate: IRate }
}

export type RateAction = GetRatesAction | SetCurrentRateAction
