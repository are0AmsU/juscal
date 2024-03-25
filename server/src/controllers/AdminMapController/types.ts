import { IMulterFile, INadeClient, ITargetClient } from "../../types/index.js"

export interface IAdminMapCreateNadeAndTargetRequest {
  params: {
    mapId: number
  },
  body: {
    nade: string | INadeClient
    targets: string | ITargetClient[]
  },
  files: {
    screenshots: IMulterFile[]
  }
}

export interface IAdminMapGetNadeAndTargetRequestByMapId {
  params: {
    mapId: number
  }
}