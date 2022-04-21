import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getRates, setCurrentRate } from "store/rate/actions"
import { setOrderDate, setLockOrderStep, setOrderExtra, setOrderPrice } from "store/order/actions"
import { format, hoursToMilliseconds } from "date-fns"
import OrderDate from "components/OrderBlock/OrderDate"
import OrderRadio from "components/OrderBlock/OrderRadio"
import OrderCheckbox from "components/OrderBlock/OrderCheckbox"
import classNames from "classnames"
import useTern from "hooks/useTerm"
import { dataAddService } from "./data"
import { CalcOrderPriceType, CheckDatesType, SetOrderDatesType } from "./types"

import "./styles.scss"

const Extra: FC = () => {
  const { order, car, rate } = useTypedSelector((state) => state)
  const [carColor, setCarColor] = useState<string>("")
  const [dateFrom, setDateFrom] = useState<Nullable<string>>(null)
  const [dateTo, setDateTo] = useState<Nullable<string>>(null)
  const [errorDate, setErrorDate] = useState<Nullable<string>>(null)
  const [tarrif, setTarrif] = useState<string>("")
  const [term, setTerm] = useState<Nullable<string>>(null)
  const [fullTank, setFullTank] = useState<boolean>(false)
  const [childChair, setChildChair] = useState<boolean>(false)
  const [rightHandDrive, setRightHandDrive] = useState<boolean>(false)

  const params = useParams()
  const dispatch = useDispatch()

  const checkDates = useCallback<CheckDatesType>((date1, date2) => {
    if (!date1 || !date2) return false

    const from = new Date(date1).getTime()
    const to = new Date(date2).getTime()
    if (from > to) {
      setErrorDate("Введены некорректные даты")
      return false
    }
    if (to - from < 3600000) {
      setErrorDate("Заказ должен быть не менее 1 часа")
      return false
    }

    setErrorDate(null)
    return true
  }, [])

  const setOrderDates = useCallback<SetOrderDatesType>(
    (currentRate, date1, date2) => {
      const days = Number(currentRate.rateTypeId.unit.replace(/\D+/g, "")) || 1
      const from = new Date(date1).getTime()
      const to = date2
        ? new Date(date2).getTime()
        : new Date(date1).getTime() + hoursToMilliseconds(24 * days)
      dispatch(setOrderDate({ from, to }))
    },
    [dispatch]
  )

  const calcOrderPrice = useCallback<CalcOrderPriceType>(
    (currentRate, date1 = null, date2 = null) => {
      let price = 0
      if (checkDates(date1, date2)) {
        const from = new Date(dateFrom as string).getTime()
        const to = new Date(dateTo as string).getTime()
        price = Math.ceil((to - from) / 60000) * Number(currentRate.price)
      } else {
        price = currentRate.price
      }

      if (fullTank) price += 500
      if (childChair) price += 200
      if (rightHandDrive) price += 1600

      return price
    },
    [fullTank, childChair, rightHandDrive, dateFrom, dateTo, checkDates]
  )

  useEffect(() => {
    if (params.id === "extra") {
      const extra = {
        color: carColor,
        term,
        tarrif: tarrif.split(",")[0],
        isFullTank: fullTank,
        isNeedChildChair: childChair,
        isRightWheel: rightHandDrive
      }
      dispatch(setOrderExtra(extra))
    }
  }, [
    params.id,
    carColor,
    term,
    tarrif,
    fullTank,
    childChair,
    rightHandDrive,
    dispatch
  ])

  useEffect(() => {
    if (order.extra?.tarrif && order.extra.term) {
      dispatch(setLockOrderStep("total", true))
    } else {
      dispatch(setLockOrderStep("total", false))
    }
  }, [order.extra, dispatch])

  useEffect(() => {
    if (params.id === "extra" && rate.current && rate.current?.rateTypeId.name !== "Поминутно") {
      dispatch(setOrderPrice(calcOrderPrice(rate.current)))
    } else if (rate.current?.rateTypeId.name === "Поминутно" && checkDates(dateFrom, dateTo)) {
      dispatch(setOrderPrice(calcOrderPrice(rate.current, dateFrom, dateTo)))
    } else if (rate.current?.rateTypeId.name === "Поминутно" && !checkDates(dateFrom, dateTo)) {
      dispatch(setOrderPrice(null))
    }
  }, [dateFrom, dateTo, params.id, rate, dispatch, checkDates, calcOrderPrice])

  useEffect(() => {
    if (rate.current && rate.current.rateTypeId.name !== "Поминутно" && dateFrom) {
      setOrderDates(rate.current, dateFrom)
    } else if (
      rate.current &&
      rate.current.rateTypeId.name === "Поминутно" &&
      checkDates(dateFrom, dateTo)
    ) {
      setOrderDates(rate.current, dateFrom as string, dateTo as string)
    } else {
      dispatch(setOrderDate(null))
    }
  }, [dateFrom, dateTo, rate, errorDate, setOrderDates, checkDates, dispatch])

  useEffect(() => {
    if (tarrif && rate.all) {
      rate.all.map((elem) => {
        if (tarrif.split(",")[0] === elem.rateTypeId.name) {
          dispatch(setCurrentRate(elem))
        }
      })
    }
  }, [tarrif, rate.all, dispatch])

  useEffect(() => {
    if (order.date) {
      setTerm(useTern(order.date.from, order.date.to))
    } else {
      setTerm(null)
    }
  }, [order.date])

  useEffect(() => {
    dispatch(getRates())
  }, [dispatch])

  const colorRadios = useMemo<ReactNode>(
    () =>
      car.cars.current &&
      car.cars.current.colors.map((elem, index) => (
        <OrderRadio
          id={`radio_color_${index}`}
          value={elem}
          key={`radio_color_${index}`}
          name="colors"
          checked={!index}
          setState={setCarColor}
        />
      )),
    [car.cars]
  )

  const tarrifRadios = useMemo<ReactNode>(
    () =>
      rate.all &&
      rate.all.map((elem, index) => {
        const radioValue = `${elem.rateTypeId.name}, ${elem.price}₽/${elem.rateTypeId.unit}`
        return (
          <OrderRadio
            id={elem.rateTypeId.id}
            value={radioValue}
            key={elem.rateTypeId.id}
            name="tarrif"
            checked={!index}
            setState={setTarrif}
          />
        )
      }),
    [rate.all]
  )

  const serviceCheckboxes = useMemo<ReactNode>(() => {
    const setStatesArray = [setFullTank, setChildChair, setRightHandDrive]
    return dataAddService.map((elem, index) => (
      <OrderCheckbox
        id={`checkbox_${elem.id}_${index}`}
        label={elem.label}
        key={`checkbox_service_${index}`}
        setState={setStatesArray[index]}
      />
    ))
  }, [])

  const errorDateClassName = classNames("Extra__date-error", {
    "Extra__date-error_active":
      errorDate && rate.current && rate.current.rateTypeId.name === "Поминутно"
  })
  const dateBlockClassName = classNames("Extra__date-block", {
    "Extra__date-block_error":
      errorDate && rate.current && rate.current.rateTypeId.name === "Поминутно"
  })

  const disableInputDate = Boolean(rate.current && rate.current.rateTypeId.name !== "Поминутно")
  const defaultDateFrom = format(Date.now(), "yyyy-MM-dd'T'kk:mm")

  return (
    <div className="Extra">
      <div className="Extra__block">
        <p className="Extra__title">Цвет</p>
        <fieldset
          name="colors"
          className="Extra__color-radios"
        >
          {colorRadios}
        </fieldset>
      </div>

      <div className="Extra__block">
        <p className="Extra__title">Дата аренды</p>
        <div className={dateBlockClassName}>
          <div className={errorDateClassName}>{errorDate}</div>
          <OrderDate
            id="dateFrom"
            label="С"
            setState={setDateFrom}
            defaultValue={defaultDateFrom}
          />
          <OrderDate
            id="dateTo"
            label="По"
            setState={setDateTo}
            disabled={disableInputDate}
          />
        </div>
      </div>

      <div className="Extra__block">
        <p className="Extra__title">Тариф</p>
        <fieldset
          name="tarrif"
          className="Extra__tarrif-radios"
        >
          {tarrifRadios}
        </fieldset>
      </div>

      <div className="Extra__block">
        <p className="Extra__title">Доп услуги</p>
        <div className="Extra__add-service">{serviceCheckboxes}</div>
      </div>
    </div>
  )
}

export default Extra
