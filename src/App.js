import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./Components/Navigation";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import SnippetPage from "./pages/SnippetPage";

import PrivateRoute from "./pages/permissions/PrivateRoute";
import PublicRoute from "./pages/permissions/PublicRoute";

import { UserProvider } from "./context/userContext/UserProvider";

function App() {



  return (
    <BrowserRouter>
      <UserProvider>
        <Navigation />

        <Routes>

          <Route element={<PublicRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path='/snippet' element={<SnippetPage />}/>
          </Route>
        </Routes>

      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
