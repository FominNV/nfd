import { ReactNode } from "react"
import { ICar } from "store/car/types"

export type ShowCarsType = (data: ICar[]) => ReactNode
export type LoadCarsType = () => Promise<void>
export type CreateRadiosType = (data: string[]) => ReactNode
export type CreateRadioDataType = (data: ICar[]) => string[]
