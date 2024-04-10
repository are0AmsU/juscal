import { ITargetClient } from "../../types/client.js";

export interface ITargetCreateRequest {
  params: {
    mapId: number;
  };
  body: {
    target: ITargetClient;
  };
}

export interface ITargetDeleteByIdRequest {
  params: {
    targetId: number;
  };
}
