class BookDetails {
  getIsbn() {
    return cy.get(`#ISBN-wrapper > div:nth-child(2) > label`);
  }

  getTitle() {
    return cy.get(`#title-wrapper > div:nth-child(2) > label`);
  }
  
  getSubtitle() {
    return cy.get(`#subtitle-wrapper > div:nth-child(2) > label`);
  }

  getAuthor() {
    return cy.get(`#author-wrapper > div:nth-child(2) > label`);
  }

  getPublisher() {
    return cy.get(`#publisher-wrapper > div:nth-child(2) > label`);
  }

  getTotalPages() {
    return cy.get(`#pages-wrapper > div:nth-child(2) > label`);
  }

  getDescription() {
    return cy.get(`#description-wrapper > div:nth-child(2) > label`);
  }

  getWebSite() {
    return cy.get(`#website-wrapper > div:nth-child(2) > label`);
  }

  getAddtoYourCollection() {
    return cy.get(`.text-right.fullButton > button`);
  }

  getBackToBookStore() {
    return cy.get(`.text-left.fullButton > button`);
  }

}

export default new BookDetails();