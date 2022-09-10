import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignInForm from "./components/Form/SignInForm";
import SignUpForm from "./components/Form/SignUpForm";
import Layout from "./components/Layout/Layout";
import AuthPage from "./pages/AuthPage";
import PostListPage from "./pages/PostListPage";
import AuthContext from "./store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostListPage />} />
        <Route
          path="/auth"
          element={authCtx.isLoggedIn ? <Navigate to="/posts" /> : <AuthPage />}
        >
          <Route index element={<Navigate to="/auth/login" replcae />} />
          <Route path="login" element={<SignInForm />} />
          <Route path="signup" element={<SignUpForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
