import { $host } from '.';

export const createNade = (nade: FormData) => {
  const data = $host.post('api/nade', nade)
  return data
}

export const getNadeTypes = () => {
  const data = $host.get('api/nade/types')
  return data
}