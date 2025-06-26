import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RouteWrapper from "@/components/route/wrapper";
import { sharedRoutes } from "./shared-route";
import UnauthorizedPage from "@/components/pages/unauthorized";
import NotFoundPage from "@/components/pages/not-found";
import { ROUTES } from "@/config/route";
import { authRoutes } from "./auth-route";
import { developerRoutes } from "./developer-route";
import { managerRoutes } from "./manager-route";
import RoleBasedRoute from "./rolebase-route";

const AppRoutes = () => {
  // const userType = UserType.SUPERADMIN;

  return (
    <Router>
      <Routes>
       
        {authRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper
                element={route.element}
                layout={route.layout}
                layoutProps={route.layoutProps}
              />
            }
          />
        ))}

        {/* Director routes */}
        {developerRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper
                element={route.element}
                layout={route.layout}
                layoutProps={route.layoutProps}
              />
            }
          />
        ))}

        {managerRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper
                element={route.element}
                layout={route.layout}
                layoutProps={route.layoutProps}
              />
            }
          />
        ))}

        {/* sharedRoutes */}
        {sharedRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper
                element={route.element}
                layout={route.layout}
                layoutProps={route.layoutProps}
              />
            }
          />
        ))}

        {/* Unauthorized Route */}
        <Route path={ROUTES.UNAUTHORIZED} element={<UnauthorizedPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
