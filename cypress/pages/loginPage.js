class LoginPage {
  getUsername() {
    return cy.get(`[id=userName]`);
  }
  getPassword() {
    return cy.get(`[id=password]`);
  }
  
  getLogin() {
    return cy.get(`[id=login]`);
  }

  getMessage() {
    return cy.get(`[id=output]`);
  }

  login(username, password) {
    this.getUsername().clear();
    this.getUsername().type(username);
    this.getPassword().clear();
    this.getPassword().type(password);
    this.getLogin().click();
  }
}

export default new LoginPage();