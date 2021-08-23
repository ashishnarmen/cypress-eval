class BookStore {
  setUserLoginOnBrowser(username, password) {
    cy.request({
      url: '/Account/v1/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { userName: username, password: password },
    })
    .then( (data) => {
      cy.setCookie('token', data.body.token);
      cy.setCookie('expires', data.body.expires);
      cy.setCookie('userID', data.body.userId);
      cy.setCookie('userName', data.body.username);
    });
  }

  deleteBooks() {
    cy.getCookies()
    .should('exist')
    .then((cookies) => {
      let userID = cookies.find(c => c.name == 'userID').value;
      let token = cookies.find(c => c.name == 'token').value;
      cy.request({
        url: `/BookStore/v1/Books?UserId=${userID}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    });
  }

  addBook(isbn) {
    cy.getCookies()
    .should('exist')
    .then((cookies) => {
      let userID = cookies.find(c => c.name == 'userID').value;
      let token = cookies.find(c => c.name == 'token').value;
      cy.request({
        url: `/BookStore/v1/Books`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: {
          userId: userID, 
          collectionOfIsbns: [{
            isbn: isbn
          }]
        }
      });
    });
  }

  userCollection() {
    return cy.getCookies()
    .should('exist')
    .then((cookies) => {
      let userID = cookies.find(c => c.name == 'userID').value;
      let token = cookies.find(c => c.name == 'token').value;
      cy.request({
        url: `/Account/v1/User/${userID}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    });
  }

  bookDetails(isbn) {
    return cy.request({
      url: `/BookStore/v1/Book?ISBN=${isbn}`,
      method: 'GET', 
      'Content-Type': 'application/json',
    });
  }
}

export default new BookStore();