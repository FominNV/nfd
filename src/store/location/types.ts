export interface ILocationState {
  cities: Nullable<ICity[]>
  points: Nullable<IPoint[]>
}

export interface ICity {
  id: string
  name: string
}

export interface IPoint {
  name: string
  cityId: ICity
  address: string
  id: string
}

export enum LocationActionTypes {
  GET_POINTS = "GET_POINTS"
}

type GetPointsType = {
  type: LocationActionTypes.GET_POINTS
  payload: { points: IPoint[] }
}

export type LocationAction = GetPointsType
