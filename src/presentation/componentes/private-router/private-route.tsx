import React, { useContext } from 'react';
import { Route, Link, Routes, Navigate } from 'react-router-dom';
import { HistoryRouterProps } from 'react-router-dom';
import { ApiContext } from '@/presentation/contexts';

const PrivateRouter: React.FC<HistoryRouterProps> = (
  props: HistoryRouterProps
) => {
  const { getCurrentAccount } = useContext(ApiContext);
  return getCurrentAccount()?.accessToken ? (
    <Routes>
      <Route {...props} path={props.history.location.pathname} />
    </Routes>
  ) : (
    <Routes>
      <Route
        {...props}
        path={props.history.location.pathname}
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
};

export default PrivateRouter;
