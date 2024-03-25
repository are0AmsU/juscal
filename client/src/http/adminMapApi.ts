import { $host } from "."
import { IMap, INade, ITarget } from "../ui/types"

export const getMapAndNadesAdnTargetsByMapId = async (mapId: string) => {
  const { data } = await $host.get(`api/admin-map/${mapId}`)
  return data as { map: IMap, nades: INade[], targets: ITarget[] }
}

export const createNadeAndTargetsByMapId = async (mapId: string) => {
  const { data } = await $host.post(`api/admin-map/target-nade/${mapId}`)
  return data
}