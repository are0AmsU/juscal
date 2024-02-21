import { $host } from "."
import { IMap, INade } from "../ui/types"

export const getMapAndNadesByMapName = async (name: string) => {
  const { data } = await $host.get(`api/admin-map/${name}`)
  return data as { map: IMap, nades: INade[] }
}