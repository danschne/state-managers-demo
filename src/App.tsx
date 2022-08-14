import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout/AppLayout";
import { MENU_ENTRIES } from "./layout/NavigationBar/NavigationBar";
import { Placeholder } from "./layout/Placeholder/Placeholder";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route
          index
          element={<Navigate to={MENU_ENTRIES[0].path} replace={true} />}
        />
        {MENU_ENTRIES.map(({ path, content }) => (
          <Route key={path} path={path} element={content} />
        ))}
        <Route path="*" element={<Placeholder text="404" />} />
      </Route>
    </Routes>
  );
}
