import { $host } from ".";
import { IMap, INade, ITarget } from "../ui/types";

export const getMapAndNadesAdnTargetsByMapId = async (
  mapId: string
): Promise<{ map: IMap; nades: INade[]; targets: ITarget[] }> => {
  const { data } = await $host.get(`api/admin-map/${mapId}`);
  return data;
};

export const createNadeAndTargetsByMapId = async (mapId: string) => {
  const { data } = await $host.post(`api/admin-map/target-nade/${mapId}`);
  return data;
};

export const updateNadeAndTargets = async (formData: FormData) => {
  const { data } = await $host.put(
    `api/admin-map/target-nade/update-targets-nades`,
    formData
  );
  return data;
};
