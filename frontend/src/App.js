import React, { useEffect } from "react";
import Home from "./routes/Home";
import { checkAuth } from "./core/features/userSclice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch, checkAuth]);
  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  );
}

export default App;
