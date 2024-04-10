import { $host } from ".";
import { ITarget } from "../ui/types";

export const createTarget = async (
  mapId: string,
  target: ITarget
): Promise<ITarget> => {
  const { data } = await $host.post(`api/target/${mapId}`, target);
  return data;
};

export const deleteTargetById = async (targetId: number) => {
  const { data } = await $host.delete(`api/target/${targetId}`);
  return data;
};
