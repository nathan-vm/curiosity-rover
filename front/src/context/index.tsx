import { createContext, useCallback, useContext, useEffect, useState, FC } from "react";

export type Position = { x: number; y: number; direction: 'N' | 'S' | 'W' | 'E' }

interface RoverContextData {
  position: Position,
  setPosition(position: Position): void
}

const defaultState: RoverContextData = {
  position: { x: 0, y: 0, direction: 'N' },
  setPosition: () => { },
};

const RoverContext = createContext<RoverContextData>(defaultState);

export function useRover(): RoverContextData {
  const context = useContext(RoverContext);

  return context;
}

export const RoverProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

  const [position, setPositionState] = useState<Position>(defaultState.position)

  useEffect(() => {
    const res = getPosition();
    setPositionState(res);
  }, []);

  const getPosition = useCallback(function():Position {
    const pos = localStorage.getItem("@rover")
    if (!pos) {
      return defaultState.position
    }
    const position = JSON.parse(pos)

    return position
  }, [])

  const setPosition = useCallback((data: Position) => {
    localStorage.setItem("@rover", JSON.stringify(data))
    setPositionState((data))
  }, [])

  const details: RoverContextData = {
    position,
    setPosition
  };

  return (
    <RoverContext.Provider value={details}>{children}</RoverContext.Provider>
  );
};