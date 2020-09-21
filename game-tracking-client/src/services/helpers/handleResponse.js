import { authenticationService } from '../authenticationService';

export function handleResponse(response) {
    if (!response.ok) {
        if ([401, 403].indexOf(response.status) !== -1) {
            // Auto logout if 401 Unauthorized or 403 Forbidden response returned from web api
            authenticationService.logout();
        }
    }
}