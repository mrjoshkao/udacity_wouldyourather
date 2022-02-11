/**
 *  adapted from: https://ui.dev/react-router-protected-routes-authentication/
 */

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux'

function RequireAuth({ children }) {
  const authed = useSelector((state) => state.authedUser) ? true : false;
  const location = useLocation();

  console.log(authed)
  return authed === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth