import { $host } from ".";
import { TargetTypes } from "../ui/types";

export const getTargetTypeNames = async (): Promise<TargetTypes[]> => {
  const { data } = await $host.get(`api/target-type/names`);
  return data;
};
