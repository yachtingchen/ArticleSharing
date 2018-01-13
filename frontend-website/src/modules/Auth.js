class Auth {

  /**
   * Authenticate a user. Save a token string in Local Storage
   *
   * @param {string} token
   * @param {object} userInfo, see initalState for userInfo schema
   */
  static authenticateUser(token, userInfo) {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  /**
   * @static
   * @returns userInfo (see initalState for userInfo schema). return null if no user logged in
   * 
   * @memberOf Auth
   */
  static getLoggedInUser() {    
    if (typeof localStorage === 'undefined') return null; //for unit test

    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      return JSON.parse(storedUser);
    } else {
      return null;
    }
  }

  static isAdminLoggedIn() {
    return this.isUserAuthenticated() && this.getLoggedInUser().isAdmin;
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deauthenticateUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getToken() {
    return localStorage.getItem('token');
  } 

}

export default Auth;
