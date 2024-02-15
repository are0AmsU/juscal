import { $host } from '.';

export const createNade = (nade: FormData) => {
  const data = $host.post('api/nade', nade)
  return data
}