import React, { createContext } from 'react';
import { node } from 'prop-types';

export const HeaderContext = createContext();

export function HeaderContextProvider({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}

HeaderContextProvider.propTypes = {
  children: node,
}.isRequired;
// Para uso futuro
