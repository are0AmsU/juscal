import { IMulterFile, ITargetRequest } from "../../types/index.js"

export interface INadeCreateRequest {
  params: {
    mapId: number
  },
  body: {
    name: string
    description: string
    targets: string | ITargetRequest[]
  },
  files: {
    screenshots: IMulterFile[]
  }
}