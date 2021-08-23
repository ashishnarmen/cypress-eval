class ProfilePage {
  getUsername() {
    return cy.get(`[id=userName-value]`);
  }

  getSearchBox() {
    return cy.get(`[id=searchBox]`);
  }

  getBooksTable() {
    return cy.get(`.rt-table`);
  }

  getBookRow(bookName) {
    return this.getBooksTable().contains('div', bookName).then (row => row);
  }

  getModal() {
    return cy.get(`.modal-content`);
  }

  getNoRowsFound() {
    return cy.get(`.rt-noData`);
  }

  getDeleteAll() {
    return cy.get(`.text-right.button > button`);

  }


  search(bookName) {
    this.getSearchBox().clear();
    this.getSearchBox().type(bookName);
  }

  deleteBook(bookName) {
    this.getBooksTable().contains('.rt-tr-group', bookName).then(row => {
      row.find(`[id=delete-record-undefined]`).click();
      this.getModal().get(`[id=closeSmallModal-ok]`).click();
    });
    
  }

  deleteAllBooks() {
    this.getDeleteAll().click();
    this.getModal().get(`[id=closeSmallModal-ok]`).click();
  }
}

export default new ProfilePage();