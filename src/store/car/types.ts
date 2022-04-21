export interface ICarState {
  cars: {
    all: Nullable<ICar[]>
    current: Nullable<ICar>
  }
  category: {
    all: Nullable<ICategory[]>
    current: Nullable<ICategory>
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

export interface ICategory {
  name: string
  description: string
  id: string
}

export type CarDispatch<T> = (value: T) => CarAction

export enum CarActionTypes {
  GET_CARS = "GET_CARS",
  SET_CURRENT_CAR = "SET_CURRENT_CAR",
  GET_CATEGORIES = "GET_CATEGORIES",
  SET_CURRENT_CATEGORY = "SET_CURRENT_CATEGORY"
}

type GetCarsAction = {
  type: CarActionTypes.GET_CARS
  payload: { cars: ICar[] }
}

type SetCurrentCarAction = {
  type: CarActionTypes.SET_CURRENT_CAR
  payload: { current: ICar }
}

type GetCategoriesAction = {
  type: CarActionTypes.GET_CATEGORIES
  payload: { categories: ICategory[] }
}

type SetCurrentCategoryAction = {
  type: CarActionTypes.SET_CURRENT_CATEGORY
  payload: { current: ICategory }
}

export type CarAction =
  | GetCarsAction
  | SetCurrentCarAction
  | GetCategoriesAction
  | SetCurrentCategoryAction
