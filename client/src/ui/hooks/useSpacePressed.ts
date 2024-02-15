import React from 'react'

export interface IUseSpacePressed {
  current: boolean;
}

export const useSpacePressed = (onSpaceDown?: () => void, onSpaceUp?: () => void): IUseSpacePressed => {

  const isSpacePressedRef = React.useRef<boolean>(false)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        isSpacePressedRef.current = true
        if (onSpaceDown) {
          onSpaceDown()
        }
      }
    };
  
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        isSpacePressedRef.current = false
        if (onSpaceUp) {
          onSpaceUp()
        }
      }
    };
  
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
  
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [onSpaceDown, onSpaceUp]);

  return isSpacePressedRef
}