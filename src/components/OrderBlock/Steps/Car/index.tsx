import { FC, ReactNode, useCallback, useEffect, useMemo, useState } from "react"
import { useTypedSelector } from "store/selectors"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { setLoading } from "store/common/actions"
import { setLockOrderStep } from "store/order/actions"
import { getCars, getCategories, setCurrentCar } from "store/car/actions"
import Loading from "components/Loading"
import OrderRadio from "components/OrderBlock/OrderRadio"
import { LoadCarsType } from "./types"
import OrderCarCard from "../../OrderCarCard"

import "./styles.scss"

const Car: FC = () => {
  const { car, common, order } = useTypedSelector((state) => state)
  const [filterCars, setFilterCars] = useState<string>("Все модели")
  const params = useParams()
  const dispatch = useDispatch()

  const fetchCars = useCallback<LoadCarsType>(async () => {
    dispatch(setLoading(true))
    await Promise.all([dispatch(getCars()), dispatch(getCategories())])
    dispatch(setLoading(false))
  }, [dispatch])

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
    if (order.car && car.cars.all) {
      car.cars.all.map((elem) => {
        if (elem.id === order.car?.id) dispatch(setCurrentCar(elem))
      })
    }
  }, [order.car, car.cars.all, dispatch])

  const categoryRadios = useMemo<ReactNode>(
    () =>
      car.category.all &&
      car.category.all
        .reduce((prev, current) => prev.concat(current.name), ["Все модели"])
        .map((elem, index) => (
          <OrderRadio
            id={`radio_car_${index}`}
            value={elem}
            key={`radio_car_${index}`}
            name="cars"
            checked={!index}
            setState={setFilterCars}
          />
        )),
    [car.category.all]
  )

  const carList = useMemo<ReactNode>(() => {
    if (car.cars.all) {
      const carData =
        filterCars === "Все модели"
          ? car.cars.all
          : car.cars.all.filter((elem) => elem.categoryId.name === filterCars)

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
    }
    return null
  }, [car.cars.all, filterCars])

  const loading = useMemo<ReactNode>(() => common.loading && <Loading />, [common.loading])

  return (
    <div className="Car">
      <fieldset
        name="cars"
        className="Car__radios"
        defaultValue="all"
      >
        {categoryRadios}
      </fieldset>

      <div className="Car__cars">
        {carList}
        {loading}
      </div>
    </div>
  )
}

export default Car
