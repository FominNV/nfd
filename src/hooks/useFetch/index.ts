import { IFetchState, UseFetchType } from "./types"

const useFetch: UseFetchType = async (url, option) => {
  const state: IFetchState = {
    data: null,
    error: null
  }

  try {
    const response = await fetch(url, option)

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    state.data = await response.json()
  } catch (error) {
    state.error = error as Error
  }

  return state
}

export default useFetch
