import { $host } from ".";
import { CoordinatesType, ITarget, TargetTypes } from "../ui/types";

export const createTarget = async (mapId: string): Promise<ITarget> => {
  const { data } = await $host.post(`api/target/${mapId}`);
  return data;
};

export const getTargets = async (
  mapId: string,
  isOnlyTyped: boolean = false,
  toTargetId: number | null = null
): Promise<ITarget[]> => {
  const { data } = await $host.get(
    `api/target/${mapId}?${isOnlyTyped && "isOnlyTyped=" + isOnlyTyped}${
      toTargetId !== null && "&toTargetId=" + toTargetId
    }`
  );
  return data;
};

export const deleteTarget = async (id: number): Promise<void> => {
  const { data } = await $host.delete(`api/target/${id}`);
  return data;
};

export const updateTargetType = async (
  id: number,
  type: TargetTypes | null
): Promise<ITarget> => {
  const { data } = await $host.put(`api/target/${id}/type`, { type });
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
