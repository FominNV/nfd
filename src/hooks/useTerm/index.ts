import { formatDistance } from "date-fns"
import ru from "date-fns/locale/ru/index"
import { UseTermType } from "./types"

const useTerm: UseTermType = (dateFrom, dateTo) => {
  return formatDistance(new Date(dateFrom), new Date(dateTo), {
    locale: ru
  })
}

export default useTerm
