import React from 'react';
import { Route, Link, Routes, Navigate } from 'react-router-dom';
import { HistoryRouterProps } from 'react-router-dom';

const PrivateRouter: React.FC<HistoryRouterProps> = (
  props: HistoryRouterProps
) => {
  return (
    <Routes>
      <Route
        {...props}
        path={props.history.location.pathname}
        element={<Navigate to="/login" replace />} //parei no minuto 24:35
      />
    </Routes>
  ); //repassa a chamada
};

export default PrivateRouter;
