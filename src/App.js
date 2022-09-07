import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PostListPage from "./pages/PostListPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="posts" element={<PostListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
