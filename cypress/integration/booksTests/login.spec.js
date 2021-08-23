import bookDetailsPage from '../../pages/bookDetailsPage'
import loginPage from '../../pages/loginPage.js';
import profilePage from '../../pages/profilePage.js';
import { urls } from '../../pages/urls';
import { testData } from '../testData';

describe('User login', () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it('Test if user can login with a valid username and password', () => {
    cy.visit(urls.login);
    loginPage.login(testData.user.username, testData.user.password);
    profilePage.getUsername().contains(testData.user.username);
  })

  it('Test if an error message gets displayed when the user enters an incorrect username and password', () => {
    cy.visit(urls.login);
    loginPage.login('invalidusername', 'invalidpassword');
    loginPage.getMessage().contains('Invalid username or password!');
  });

  it('Test that an unauthenticated user cannot add a book to a collection.', () => {
    cy.clearCookies();
    cy.visit(urls.bookDetails + testData.book1.isbn);
    bookDetailsPage.getIsbn().contains(testData.book1.isbn);
    bookDetailsPage.getAddtoYourCollection().should('not.exist');
  });
})
