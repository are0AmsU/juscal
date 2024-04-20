import { INadeClient, ITargetClient } from "../../types/index.js";

export interface INadeCreateRequest {
  params: {
    mapId: number;
  };
  body: {
    nade: INadeClient;
  };
}

export interface INadeDeleteByIdRequest {
  params: {
    nadeId: number;
  };
}

export interface IClientNadeAndTargets {
  nade: INadeClient;
  fromNadeTarget: ITargetClient;
  toNadeTarget: ITargetClient;
}
