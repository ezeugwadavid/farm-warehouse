import React, { Suspense, lazy } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";
import Loader from "./components/loader/loader.component";
//import 'bootstrap/dist/css/bootstrap.min.css';
const CreateAccount = lazy(() => import("./pages/create-account/create-account.component"));
const Verification = lazy(() => import("./pages/verification/verification.component"));



function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={"/"} exact={true} element={<CreateAccount />} />
            <Route path={"/verification"} exact={true} element={<Verification />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  </div>  );
}

export default App;