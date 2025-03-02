import {LoginErrorResponse, User} from '../types';
import {createXHR} from '../utils/xhr';

interface LoginResult {
  user: User;
  token: string;
}

/**
 * Authenticates user with email and password
 * @param email User's email address
 * @param password User's password
 * @returns LoginResult object containing user data and token
 * @throws Error if authentication fails or network issues occur
 */
export function login(email: string, password: string): LoginResult {
  // Check if email or password is undefined or empty
  if (!email || email.trim() === '') {
    throw new Error("Email is required");
  }

  if (!password || password.trim() === '') {
    throw new Error("Password is required");
  }

  try {
    // Create XMLHttpRequest object
    const xhr = createXHR();

    // Configure request - using synchronous mode (third parameter is false)
    xhr.open('POST', 'https://courseapi.ulearning.cn/users/login', false);
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Send the request with body data
    xhr.send(JSON.stringify({
      loginName: email,
      password: password
    }));

    // Parse response
    const data = JSON.parse(xhr.responseText) as User | LoginErrorResponse;

    // Check if login was successful by looking for userId
    if ('userId' in data) {
      // Extract token from the response if it exists
      const token = data.authorization || "";

      // Create a user object without the token property
      const user: User = {...data};

      // Return object with user data and token
      return {
        user: user,
        token: token
      };
    } else {
      // Login failed, extract error message
      const errorMessage = (data as LoginErrorResponse).message || 'Login failed with unknown error';
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('Login error:', error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}