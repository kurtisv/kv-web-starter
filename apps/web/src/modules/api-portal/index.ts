export const apiPortalModule = {
  key: "api-portal",
  routes: ["/developers", "/docs", "/dashboard/api-keys", "/api/v1"],
};

export {
  getApiKeyFromHeaders,
  hasRequiredScopes,
  parseApiCredentials,
  verifyApiAccess,
  type ApiAccessResult,
  type ApiCredential,
} from "./access";
