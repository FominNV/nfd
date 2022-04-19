import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import { useTypedSelector } from "store/selectors"
import { setLoading } from "store/common/actions"
import { getCars, setCurrentCar } from "store/car/actions"
import OrderRadio from "components/OrderBlock/OrderRadio"
import Loading from "components/Loading"

import { setLockOrderStep } from "store/order/actions"
import { getRates } from "store/rate/actions"
import { useParams } from "react-router-dom"
import { CreateRadioDataType, CreateRadiosType, LoadCarsType, ShowCarsType } from "./types"
import OrderCarCard from "../../OrderCarCard"

import "./styles.scss"

const Car: FC = () => {
  const { car, common, order } = useTypedSelector((state) => state)
  const [filterCars, setFilterCars] = useState<string>("Все модели")
  const params = useParams()
  const dispatch = useDispatch()

  const createRadioData = useCallback<CreateRadioDataType>((data) => {
    const result: string[] = []
    result.push("Все модели")
    data.map((elem) => {
      if (!result.includes(elem.categoryId.name)) {
        result.push(elem.categoryId.name)
      }
    })

    return result
  }, [])

  const createModelRadios = useCallback<CreateRadiosType>((data) =>
    data.map((elem, index) => (
      <OrderRadio
        id={`radio_car_${index}`}
        value={elem}
        key={`radio_car_${index}`}
        name="cars"
        checked={!index}
        setState={setFilterCars}
      />
    )), [])

  const modelRadios = useMemo<ReactNode>(
    () => car.cars.all && createModelRadios(createRadioData(car.cars.all)),
    [car.cars.all, createModelRadios, createRadioData]
  )

  const fetchCars = useCallback<LoadCarsType>(async () => {
    dispatch(setLoading(true))
    await dispatch(getCars())
    dispatch(setLoading(false))
  }, [dispatch])

  const showCars = useCallback<ShowCarsType>(
    (data) => {
      let carData = data
      if (filterCars !== "Все модели") {
        carData = data.filter((elem) => elem.categoryId.name === filterCars)
      }

      return carData.map((elem, index) => (
        <OrderCarCard
          id={elem.id}
          key={`carCard_${index}`}
          name={elem.name}
          priceMin={elem.priceMin}
          priceMax={elem.priceMax}
          img={elem.thumbnail.path}
        />
      ))
    },
    [filterCars]
  )

  const carList = useMemo<ReactNode | null>(
    () => car.cars.all && showCars(car.cars.all),
    [car.cars.all, showCars]
  )

  useEffect(() => {
    if (!car.cars.all && params.id === "car") {
      fetchCars()
    }
  }, [fetchCars, car.cars.all, params.id])

  useEffect(() => {
    if (order.car) {
      dispatch(setLockOrderStep("extra", true))
    }
  }, [dispatch, order.car])

  useEffect(() => {
    dispatch(getRates())
  }, [dispatch])

  useEffect(() => {
    if (order.car && car.cars.all) {
      car.cars.all.map((elem) => {
        if (elem.id === order.car?.id) {
          dispatch(setCurrentCar(elem))
        }
      })
    }
  }, [order.car, car.cars.all, dispatch])

  const loading = useMemo(
    () =>
      common.loading && <Loading />,
    [common.loading]
  )

  return (
    <div className="Car">
      <fieldset
        name="cars"
        className="Car__radios"
        defaultValue="all"
      >
        {modelRadios}
      </fieldset>

      <div className="Car__cars">
        {carList}
        {loading}
      </div>
    </div>
  )
}

export default Car
