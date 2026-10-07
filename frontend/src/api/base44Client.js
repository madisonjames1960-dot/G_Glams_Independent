import { api } from "./api";

function createEntity(path) {
  return {
    async list(sort, limit = 100) {
      const params = new URLSearchParams();

      if (sort) params.set("sort", sort);
      if (limit) params.set("limit", limit);

      const query = params.toString();
      return api.get(`${path}${query ? `?${query}` : ""}`);
    },

    async filter(filters = {}, sort, limit = 100) {
      const params = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.set(key, value);
        }
      });

      if (sort) params.set("sort", sort);
      if (limit) params.set("limit", limit);

      const query = params.toString();
      return api.get(`${path}${query ? `?${query}` : ""}`);
    },

    async create(data) {
      return api.post(path, data);
    },
  };
}

export const base44 = {
  api,

  entities: {
    Product: createEntity("/api/products"),
    Review: createEntity("/api/reviews"),
    Order: createEntity("/api/orders"),
  },

  auth: {
    async me() {
      return api.get("/api/auth/me");
    },

    async register(data) {
      const result = await api.post("/api/auth/register", {
        email: data.email,
        password: data.password,
        name: data.name || data.full_name || "",
      });

      if (result?.access_token) {
        localStorage.setItem("gg_auth_token", result.access_token);
      }

      if (result?.user) {
        localStorage.setItem("gg_user", JSON.stringify(result.user));
      }

      return result;
    },

    async loginViaEmailPassword(email, password) {
      const result = await api.post("/api/auth/login", {
        email,
        password,
      });

      if (result?.access_token) {
        localStorage.setItem("gg_auth_token", result.access_token);
      }

      if (result?.user) {
        localStorage.setItem("gg_user", JSON.stringify(result.user));
      }

      return result;
    },

    async logout() {
      localStorage.removeItem("gg_auth_token");
      localStorage.removeItem("gg_user");
    },

    setToken(token) {
      if (token) {
        localStorage.setItem("gg_auth_token", token);
      }
    },

    isAuthenticated() {
      return !!localStorage.getItem("gg_auth_token");
    },

    redirectToLogin() {
      window.location.href = "/login";
    },
  },
};
