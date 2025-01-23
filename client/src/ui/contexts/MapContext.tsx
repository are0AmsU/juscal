import React from "react";
import { INade, ITarget } from "../types";

interface IMapContextProps {
  children: React.ReactNode;
}

export interface IMapContext {
  targets: Map<number, ITarget>;
  setTargets: React.Dispatch<React.SetStateAction<Map<number, ITarget>>>;
  nades: Map<number, INade>;
  setNades: React.Dispatch<React.SetStateAction<Map<number, INade>>>;
  currentTargetId: number | null;
  setCurrentTargetId: React.Dispatch<React.SetStateAction<number | null>>;
  currentNadeId: number | null;
  setCurrentNadeId: React.Dispatch<React.SetStateAction<number | null>>;
  currentTarget: ITarget | null;
  currentNade: INade | null;
}

const MapContext = React.createContext<IMapContext | null>(null);

export const useMapContext = (): IMapContext => {
  return React.useContext(MapContext) as IMapContext;
};

export const MapContextProvider: React.FC<IMapContextProps> = ({
  children,
}) => {
  const [targets, setTargets] = React.useState<Map<number, ITarget>>(new Map());
  const [nades, setNades] = React.useState<Map<number, INade>>(new Map());
  const [currentTargetId, setCurrentTargetId] = React.useState<number | null>(
    null
  );
  const [currentNadeId, setCurrentNadeId] = React.useState<number | null>(null);
  const currentTarget =
    currentTargetId !== null ? targets.get(currentTargetId) || null : null;
  const currentNade =
    currentNadeId !== null ? nades.get(currentNadeId) || null : null;

  return (
    <MapContext.Provider
      value={{
        targets,
        setTargets,
        nades,
        setNades,
        currentTargetId,
        setCurrentTargetId,
        currentNadeId,
        setCurrentNadeId,
        currentTarget,
        currentNade,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
