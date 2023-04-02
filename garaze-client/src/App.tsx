import {
  AuthBindings,
  Authenticated,
  GitHubBanner,
  Refine, useNavigation,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  notificationProvider,
} from "@refinedev/mui";

import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
import { Login } from "pages/login";
import { Home } from "pages/home";
import  AllParkingSpaces  from "./pages/all-parking-spaces";
import CreateParkingSpace from "./pages/create-parking-space";
import ParkingSpaceDetails from "./pages/parkingSpace-details";
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "pages/products";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Sider, Header, Layout } from "./components/layout";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { MuiInferencer } from "@refinedev/inferencer/mui";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GarageOutlinedIcon from '@mui/icons-material/GarageOutlined';
import EditParkingSpace from "pages/edit-parking-space";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const authProvider: AuthBindings = {
    // @ts-ignore
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch(
            "http://localhost:8080/api/v1/users",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: profileObj.name,
                email: profileObj.email,
                avatar: profileObj.picture,
              }),
            },
        );

        const data = await response.json();

        if (response.status === 200) {
          localStorage.setItem(
              "user",
              JSON.stringify({
                ...profileObj,
                avatar: profileObj.picture,
                userid: data._id,
              }),
          );
        } else {
          return Promise.reject();
        }
      }
      localStorage.setItem("token", `${credential}`);
      /*return Promise.resolve();*/
      return {
        success: true,
        redirectTo: "/home",
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: new Error("Not authenticated"),
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:8080/api/v1")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              resources={[
                {
                  name: "home",
                  list: MuiInferencer,
                  options: { label: "Panel" },
                  icon: <DashboardOutlinedIcon />,
                },
                {
                  name: "parking-spaces",
                  list: AllParkingSpaces,
                  create: CreateParkingSpace,
                  show: ParkingSpaceDetails,
                  edit: EditParkingSpace,
                  options: { label: "Miejsca" },
                  icon: <GarageOutlinedIcon />,
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <Layout Header={Header} Sider={Sider}>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="home" />}
                  />
                  <Route path="/home">
                    <Route index element={<Home />} />
                  </Route>
                  <Route path="/parking-spaces">
                    <Route index element={<AllParkingSpaces />} />
                    <Route path="create" element={<CreateParkingSpace />} />
                    <Route path="edit/:id" element={<EditParkingSpace />} />
                    <Route path="show/:id" element={<ParkingSpaceDetails />} />
                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route
                  element={
                    <Authenticated>
                      <Layout Header={Header} Sider={Sider}>
                        <Outlet />
                      </Layout>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
