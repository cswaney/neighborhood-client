import { getInstance } from "./authWrapper";

export const authGuard = (to, from, next) => {
    const authService = getInstance();

    const fn = () => {
        // If the user is authenticated, continue to route
        if (authService.isAuthenticated) {
            return next();
        }

        // Else, login user
        authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
    };

    // If loading finished, check the auth state using `fn`
    if (!authService.loading) {
        return fn();
    }

    // Check auth state if loading property changes
    authService.$watch("loading", loading => {
        if (loading === false) {
            return fn();
        }
    });
};