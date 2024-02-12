import { TargetNadeTypes } from "./ui/types"
import smokeIcon from './assets/nadesIcons/smokeIcon.svg'
import flashIcon from './assets/nadesIcons/flashIcon.svg'
import haeIcon from './assets/nadesIcons/haeIcon.svg'
import molotovIcon from './assets/nadesIcons/molotovIcon.svg'

export const LOCALSTORAGE_KEY = 'key'
export const REACT_APP_API_URL = 'http://localhost:5000/'

export const ADMIN_MAP_PAGE_PATH = '/admin/map/'

export const targetIcons = {
  [TargetNadeTypes.SMOKE]: smokeIcon,
  [TargetNadeTypes.FLASH]: flashIcon,
  [TargetNadeTypes.HAE]: haeIcon,
  [TargetNadeTypes.MOLOTOV]: molotovIcon
}