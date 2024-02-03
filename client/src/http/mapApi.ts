import { AxiosRequestConfig, AxiosResponse } from "axios"
import { $host } from "."
import { IMap } from "../ui/types"

export const createMap = async (map: FormData) => {
  const { data } = await $host.post('api/map', map)
  return data
}

export const getMaps = async () => {
  const { data } = await $host.get('api/map')
  return data
}

export const getMapById = async (id: number) => {
  const { data } = await $host.get(`api/map/${id}`)
  return data
}

export const updateMapById = async (id: number, newData: FormData) => {
  const { data } = await $host.put(`api/map/${id}`, newData)
  return data
}

export const deleteMapById = async (id: number) => {
  const { data } = await $host.delete(`api/map/${id}`)
  return data
}