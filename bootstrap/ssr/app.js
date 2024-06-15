import { jsx } from "react/jsx-runtime";
import axios from "axios";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
const appName = "Laravel";
createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Auth/ConfirmPassword.jsx": () => import("./assets/ConfirmPassword-Cog1aTfl.js"), "./Pages/Auth/ForgotPassword.jsx": () => import("./assets/ForgotPassword-BR3ZYUOk.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-BfRs1kM3.js"), "./Pages/Auth/Register.jsx": () => import("./assets/Register-DRD0RTGe.js"), "./Pages/Auth/ResetPassword.jsx": () => import("./assets/ResetPassword-DI7V6bsP.js"), "./Pages/Auth/VerifyEmail.jsx": () => import("./assets/VerifyEmail-B9lllJvf.js"), "./Pages/Dashboard.jsx": () => import("./assets/Dashboard-DBKp4uiV.js"), "./Pages/Profile/Edit.jsx": () => import("./assets/Edit-CQDzkxYG.js"), "./Pages/Profile/Partials/DeleteUserForm.jsx": () => import("./assets/DeleteUserForm-ChEnN-Yb.js"), "./Pages/Profile/Partials/UpdatePasswordForm.jsx": () => import("./assets/UpdatePasswordForm-DLYO_4lN.js"), "./Pages/Profile/Partials/UpdateProfileInformationForm.jsx": () => import("./assets/UpdateProfileInformationForm-DPCxI1p7.js"), "./Pages/Welcome.jsx": () => import("./assets/Welcome-BoZdW6pG.js") })),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(/* @__PURE__ */ jsx(App, { ...props }));
  },
  progress: {
    color: "#4B5563"
  }
});
