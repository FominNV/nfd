export type useCoordinatesType = (address: string) => Promise<number[]>

export interface IGeoResponse {
  response: {
    GeoObjectCollection: {
      featureMember: IGeoObject[]
    }
  }
}

interface IGeoObject {
  GeoObject: {
    Point: {
      pos: string
    }
    name: string
  }
}
