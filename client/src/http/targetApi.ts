import { $host } from ".";
import { CoordinatesType, ITarget, TargetTypes } from "../ui/types";

export const createTarget = async (mapId: string): Promise<ITarget> => {
  const { data } = await $host.post(`api/target/${mapId}`);
  return data;
};

export const getTargets = async (mapId: string): Promise<ITarget[]> => {
  const { data } = await $host.get(`api/target/${mapId}`);
  return data;
};

export const getToTargets = async (mapId: string): Promise<ITarget[]> => {
  const { data } = await $host.get(`api/target/${mapId}/to`);
  return data;
};

export const getFromTargets = async (
  toTargetId: number
): Promise<ITarget[]> => {
  const { data } = await $host.get(`api/target/${toTargetId}/from`);
  return data;
};

export const deleteTarget = async (id: number): Promise<void> => {
  const { data } = await $host.delete(`api/target/${id}`);
  return data;
};

export const updateTargetType = async (
  id: number,
  type: TargetTypes | null,
  nadeId: number | null
): Promise<ITarget> => {
  const { data } = await $host.put(`api/target/${id}/type`, { type, nadeId });
  return data;
};

export const updateTargetCoordinates = async (
  id: number,
  coordinates: CoordinatesType
): Promise<void> => {
  const { data } = await $host.put(`api/target/${id}/coordinates`, {
    coordinate_x: coordinates[0],
    coordinate_y: coordinates[1],
  });
  return data;
};
