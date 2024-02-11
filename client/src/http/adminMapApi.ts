import { $host } from "."

export const getMapAndNadesByMapName = async (name: string) => {
  const { data } = await $host.get(`api/admin-map/${name}`)
  return data
}