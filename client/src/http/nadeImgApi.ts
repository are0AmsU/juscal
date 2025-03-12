import { $host } from ".";
import { IImage } from "../ui/types";

export const createNadeImg = async (
  nadeId: number,
  formData: FormData
): Promise<IImage> => {
  const { data } = await $host.post(`api/nade-img/${nadeId}`, formData);
  return data;
};

export const deleteNadeImg = async (id: number) => {
  const { data } = await $host.delete(`api/nade-img/${id}`);
  return data;
};

export const deleteNadeImgByNadeId = async (nadeId: number) => {
  const { data } = await $host.delete(`api/nade-img/nade/${nadeId}`);
  return data;
};

export const replaceNadeImgIndexes = async (
  firstNadeImgId: number,
  secondNadeImgId: number
) => {
  const { data } = await $host.put(`api/nade-img`, {
    firstNadeImgId,
    secondNadeImgId,
  });
  console.log(data);
  return data;
};
