export interface ICarState {
  cars: {
    all: Nullable<ICar[]>
    current: Nullable<ICar>
  }
}

export interface ICar {
  updatedAt: Date
  createdAt: Date
  description: string
  priceMin: number
  priceMax: number
  name: string
  number: string
  categoryId: {
    name: string
    description: string
    id: string
  }
  thumbnail: {
    size: number
    path: string
    originalname: string
    mimetype: string
  }
  tank: number
  colors: string[]
  id: string
}

export type CarDispatch<T> = (value: T) => CarAction

export enum CarActionTypes {
  GET_CARS = "GET_CARS",
  SET_CURRENT_CAR = "SET_CURRENT_CAR"
}

type GetCarsAction = {
  type: CarActionTypes.GET_CARS
  payload: { cars: Nullable<ICar[]> }
}

type SetCurrentCarAction = {
  type: CarActionTypes.SET_CURRENT_CAR
  payload: { current: ICar }
}

export type CarAction = GetCarsAction | SetCurrentCarAction
