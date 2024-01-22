import { $host } from "."
import { IAddMapFormInfo, IMap } from "../ui/types"

export const createMap = async (map: FormData) => {
  const { data } = await $host.post('api/map', map)
  console.log(data)
}

export const getMaps = async () => {
  const { data } = await $host.get('api/map')
  return data
}

export const getMapById = async (id: number) => {
  const { data } = await $host.get(`api/map/${id}`)
  return data
}