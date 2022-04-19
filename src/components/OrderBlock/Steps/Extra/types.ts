import { IRate } from "store/rate/types"

type CheckDatesItem = string | number | Date | null
export type CheckDatesType = (from: CheckDatesItem, to: CheckDatesItem) => boolean
export type CalcOrderPriceType = (rate: IRate) => number
