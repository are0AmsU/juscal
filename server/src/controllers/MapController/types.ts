import { IMulterFile } from "../../types/index.js"

export interface IMapCreateRequest {
  files: {
    img: IMulterFile[],
    preview: IMulterFile[]
  },
  body: {
    name: string
  }
}

export interface IMapGetByIdRequest {
  params: {
    id: number
  }
}

export interface IMapUpdateByIdRequest {
  files: {
    img: IMulterFile[],
    preview: IMulterFile[]
  },
  body: {
    name: string
  },
  params: {
    id: number
  }
}

export interface IMapDeleteByIdRequest {
  params: {
    id: number
  }
}