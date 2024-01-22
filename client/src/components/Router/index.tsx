import React from 'react'
import { routes } from '../../routes'
import { Route, Routes } from 'react-router-dom'

const Router: React.FC = () => {
  return (
    <Routes>
      {routes.map(route =>
        <Route
          key={route.path}
          path={route.path}
          Component={route.page}
        />
      )}
    </Routes>
  )
}

export default Router