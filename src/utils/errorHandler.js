export class ApiError extends Error {
    constructor(message, status, data = null) {
        super(message);
        this.status = status;
        this.data = data;
        this.name = 'ApiError';
    }
}

export const errorHandler = {
    handleError(error) {
        if (error instanceof ApiError) {
            switch (error.status) {
                case 400:
                    return 'Invalid request. Please check your input.';
                case 401:
                    store.dispatch(logout());
                    return 'Session expired. Please login again.';
                case 403:
                    return 'You do not have permission to perform this action.';
                case 404:
                    return 'Requested resource not found.';
                case 500:
                    return 'Server error. Please try again later.';
                default:
                    return error.message;
            }
        }
        return 'An unexpected error occurred.';
    },

    async handleApiCall(apiFunction) {
        try {
            return await apiFunction();
        } catch (error) {
            const message = this.handleError(error);
            throw new ApiError(message, error.response?.status);
        }
    }
};