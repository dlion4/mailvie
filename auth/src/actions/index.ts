type ResponseType = {
    access_token: string;
    refresh_token: string;
    email: string;
}

type RequestOptions = { method: string; headers: { [key: string]: string }; body: string };

export type RegisterUserType = {
    email: string, password: string, source?:string,
}

// Helper function to create POST request options
const createPostRequest = (body: object): RequestOptions => ({
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
});

// Generic fetch handler function
const fetchHandler = async (url: string, rq:object) => {
    try {
        const response = await fetch(url, rq);

        if (!response.ok) {
            const errorData = await response.json(); // Optional: Get error details
            throw new Error(errorData.message || 'Request failed');
        }

        return await response.json(); // Return the parsed JSON response
    } catch (error) {
        console.error("Fetch error:", error);
        throw error; // Rethrow the error for handling in the calling code
    }
};




// Login user function
export const LoginUser = async ({ email, password, source="login" }: RegisterUserType): Promise<ResponseType> => {
    const data = await fetchHandler("/api/auth/login", createPostRequest({ email, password, source }));
    const { access_token, refresh_token, email: userEmail } = data;
    return { access_token, refresh_token, email: userEmail };
};

// Register user function
export const RegisterUser = async ({ email, password, source="signup" }: RegisterUserType): Promise<any> => {
    const data = await fetchHandler("/api/users/", createPostRequest({ email, password, source }));
    const { email: userEmail } = data;
    return { email: userEmail };
};

// Request password reset link function
export const RequestPasswordResetLink = async (email: string): Promise<string | any> => {
    return await fetchHandler("/api/auth/password-reset-request", createPostRequest({ email }));
};

export const ResetPassword = async (
    {password, password2, token}: {password:string, password2:string, token?:string}): Promise<any>=>{
    return await fetchHandler(`/api/auth/password-reset/${token}`, createPostRequest({ password, password2 }));
};

