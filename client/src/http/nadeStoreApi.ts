import { $host } from ".";
import { INadeStore } from "../ui/types";

export const getNadeStore = async (): Promise<INadeStore> => {
  const { data } = await $host.get('api/nade-store')
  return data as INadeStore
}