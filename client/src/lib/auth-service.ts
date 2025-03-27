// JWT-based authentication service for Spring Boot

interface JwtResponse {
  token: string;
  type: string;
  id: number;
  username: string;
  email: string;
  name: string;
  roles: string[];
}

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

class AuthService {
  private tokenKey = 'jwt_token';
  private tokenTypeKey = 'jwt_token_type';
  private userKey = 'user_data';

  /**
   * Store JWT token and user data in localStorage
   */
  setAuth(jwtResponse: JwtResponse): void {
    localStorage.setItem(this.tokenKey, jwtResponse.token);
    localStorage.setItem(this.tokenTypeKey, jwtResponse.type);
    
    // Map Spring Boot response to our user model
    const userData: User = {
      id: jwtResponse.id,
      username: jwtResponse.username,
      email: jwtResponse.email,
      name: jwtResponse.name,
      role: jwtResponse.roles.includes('ROLE_ADMIN') ? 'admin' : 'user'
    };
    
    localStorage.setItem(this.userKey, JSON.stringify(userData));
  }

  /**
   * Retrieve JWT token
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Retrieve JWT token type (e.g., "Bearer")
   */
  getTokenType(): string {
    return localStorage.getItem(this.tokenTypeKey) || 'Bearer';
  }

  /**
   * Get the full authorization header value
   */
  getAuthHeader(): string | null {
    const token = this.getToken();
    if (!token) return null;
    return `${this.getTokenType()} ${token}`;
  }

  /**
   * Retrieve stored user data
   */
  getUser(): User | null {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  /**
   * Clear authentication data
   */
  clearAuth(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenTypeKey);
    localStorage.removeItem(this.userKey);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Check if the current user has admin role
   */
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin';
  }
}

export const authService = new AuthService();