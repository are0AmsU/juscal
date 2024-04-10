import React from "react";
import { NotSavedEntitiesIdsType } from "../../../ui/types";

export interface IAdminMapNadeFormProps {
  setNotSavedEntitiesIds: React.Dispatch<React.SetStateAction<NotSavedEntitiesIdsType>>
}

export interface INadePhoto {
  url: string;
  file: File;
}