import React, { useEffect } from "react";
import { ErrorSnackBar } from "common/components/ErrorSnackBar/ErrorSnackBar";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectInitialized } from "features/app/model/appSelectors";
import { authActions } from "features/auth/model/authSlice";
import { useActions } from "common/hooks/useActions";
import { Content } from "application/Content/Content";
import { AppToolBar } from "application/AppToolBar/AppBar";

export const App = () => {

  const initialized = useAppSelector(selectInitialized);

  const { initializedApp } = useActions(authActions);

  useEffect(() => {
    initializedApp();
  }, []);

  if (!initialized) {
    // return <div style={{position: 'fixed', top: '0', textAlign: 'center', width: '100%'}}>
    //     <LinearProgress color="secondary"/>
    // </div>
  }

  return (
    <div>
      <ErrorSnackBar />
      <AppToolBar />
      <Content />
    </div>
  );
};





