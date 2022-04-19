export interface IGeoCoordinate {
  name: string
  coord: number[]
}

export type showOnMapType = (place: string, data: IGeoCoordinate[]) => void
