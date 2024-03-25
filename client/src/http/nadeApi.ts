import { $host } from '.';
import { INade } from '../ui/types';

export const createNade = async (mapName: string, nade: FormData): Promise<INade> => {
  const data = await $host.post('api/nade/' + mapName, nade) as INade
  return data
}

export const getNadeTypes = () => {
  const data = $host.get('api/nade/types')
  return data
}