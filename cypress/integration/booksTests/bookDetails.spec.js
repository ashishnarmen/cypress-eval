import bookStore from '../../backend/bookStore';
import bookDetailsPage from '../../pages/bookDetailsPage'
import profilePage from '../../pages/profilePage';
import { urls } from '../../pages/urls';
import { testData } from '../testData';

describe('Book Details', () => {
  beforeEach(() => {
    cy.clearCookies();
    bookStore.setUserLoginOnBrowser(testData.user.username, testData.user.password);
  });

  afterEach(()=> {
    bookStore.deleteBooks();
  });

  it('Test that an authenticated user can add a book a collection', ()=> {
    cy.visit(urls.bookDetails + testData.book1.isbn);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
    bookDetailsPage.getAddtoYourCollection().click();
  })

  it('Test if books added to a collection show up on the user profile.', () => {
    bookStore.addBook(testData.book1.isbn);
    bookStore.addBook(testData.book2.isbn);
    cy.visit(urls.profile);
    profilePage.search(testData.book1.title);
    profilePage.getBookRow(testData.book1.title).find('a').should('have.attr', 'href', `/profile?book=${testData.book1.isbn}`);
    profilePage.search(testData.book2.title);
    profilePage.getBookRow(testData.book2.title).find('a').should('have.attr', 'href', `/profile?book=${testData.book2.isbn}`);
  });

  it('Test if a user can delete a book from their collection.', () => {
    bookStore.addBook(testData.book1.isbn);
    bookStore.addBook(testData.book2.isbn);
    cy.visit(urls.profile);
    profilePage.deleteBook(testData.book1.title);
    cy.reload();
    profilePage.search(testData.book2.title);
    profilePage.getBookRow(testData.book2.title).find('a').should('have.attr', 'href', `/profile?book=${testData.book2.isbn}`);
    profilePage.search(testData.book1.title);
    profilePage.getNoRowsFound().should('be.visible');
  });

  it('Test if a user can delete all books from their collection. ', () => {
    bookStore.addBook(testData.book1.isbn);
    bookStore.addBook(testData.book2.isbn);
    cy.visit(urls.profile);
    profilePage.deleteAllBooks();
    cy.reload();
    profilePage.getNoRowsFound().should('be.visible');
  });

  it('Test if book details are correct', () => {
    cy.visit(urls.bookDetails + testData.book1.isbn);
    bookStore.bookDetails(testData.book1.isbn).then((expectedBookDetails) => {
      bookDetailsPage.getTitle().contains(expectedBookDetails.body.title);
      bookDetailsPage.getSubtitle().contains(expectedBookDetails.body.subTitle);
      bookDetailsPage.getAuthor().contains(expectedBookDetails.body.author);
      bookDetailsPage.getPublisher().contains(expectedBookDetails.body.publisher);
      bookDetailsPage.getDescription().contains(expectedBookDetails.body.description);      
    });
  });
})
