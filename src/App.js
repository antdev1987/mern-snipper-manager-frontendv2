import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navigation from "./Components/Navigation";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import SnippetPage from "./pages/SnippetPage";
import Main from "./pages/Main";
import SnippetSnip from "./pages/SnippetSnip";

import PrivateRoute from "./pages/permissions/PrivateRoute";
import PublicRoute from "./pages/permissions/PublicRoute";

import { UserProvider } from "./context/userContext/UserProvider";
import { SnippetProvider } from "./context/snippetContext/SnippetProvider";
import SnippetHomePage from "./pages/SnippetHomePage";
import VerifyPage from "./pages/VerifyPage";

function App() {



  return (
    <BrowserRouter>
      <UserProvider>
        <SnippetProvider>

        <Navigation />

        <Routes>

          <Route element={<PublicRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/authenticateAccount/:token" element={<VerifyPage />} />
          </Route>
          

          <Route element={<PrivateRoute />}>
            <Route path='/snippet' element={<SnippetPage />}>
              <Route index element={<SnippetHomePage />}/>
              <Route path='/snippet/:id' element={<Main />}/>
              <Route path='/snippet/snip/:id' element={<SnippetSnip />}/>
            </Route>
          </Route>
        </Routes>

        </SnippetProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
