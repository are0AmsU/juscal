import { $host } from ".";
import { INade } from "../ui/types";

export const createNade = async (mapId: string): Promise<INade> => {
  const { data } = await $host.post(`api/nade/${mapId}`);
  return data;
};

export const getNades = async (mapId: string): Promise<INade[]> => {
  const { data } = await $host.get(`api/nade/${mapId}`);
  return data;
};

export const getNadeTypes = async () => {
  const data = await $host.get("api/nade/types");
  return data;
};

export const updateNade = async (nade: INade): Promise<void> => {
  const { data } = await $host.put(`api/nade`, { nade });
  return data;
};

export const updateNadeName = async (
  nadeId: number,
  name: string
): Promise<INade> => {
  const { data } = await $host.put(`api/nade/${nadeId}/name`, { name });
  return data;
};

export const updateNadeDescription = async (
  nadeId: number,
  description: string
): Promise<INade> => {
  const { data } = await $host.put(`api/nade/${nadeId}/description`, {
    description,
  });
  return data;
};

export const deleteNadeById = async (nadeId: number) => {
  const { data } = await $host.delete(`api/nade/${nadeId}`);
  return data;
};
