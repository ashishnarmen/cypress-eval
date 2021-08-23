# QA Cypress Evaluation - Endowus
At Endowus, we use Cypress.io for UI E2E Automation Test Framework to replace some of
our manual regression testing efforts. 

Here is the Automation QA challenge part:
* Start with this Github repo https://github.com/SGSnowman/cypress-eval
* The README describes how to get started
* The exercise is to spend about 1 - 1.5 hours (no more than 2) writing automated tests against the https://demoqa.com/books website. The first sample scenario is already written.
* Expand your automated test to cover more scenarios. You are free to choose what you want to test and the scenarios you want to test within the https://demoqa.com/books page.

### How to run the tests 

* Clone the repo locally
* Navigate to the repository's directory
* Run `nvm use` command
* Run `npm i` command
* Run `npm run cypress` command

### Tests
* Test if a user can log in using a valid username and password. 
* Test if an error message gets displayed when the user enters an incorrect username and password. 
* Test that an unauthenticated user cannot add a book to a collection. 
* Test if an authenticated user can add a book to their collection.
* Test if books added to a collection show up on the user's profile.
* Test if a user can delete a book from their collection. 
* Test if a user can delete all books from their collection. 

### Test Strategy
The feature/component that is under test will be verified using the UI. However, dependent data and preconditions will get configured programmatically.

#### Login and Logout
Test will invoke the API endpoint POST /Account/v1/login to obtain the token and user id of the user. Additionally, the test will configure the cookies so that the user is logged in when the test browses to a specific URL. The test will clear all the cookies after each test ends. 
#### Add / Delete Books 
The test will invoke POST /BookStore/v1/Books to add books to a user's profile. 

The test will invoke DELETE /BookStore/v1/Books to delete all books added to the user's profile. This allows us to re-run the test multiple times. 

### Test Code Organisation 

#### Tests
Directory: cypress/integration/booksTests
This contains the test cases, which are organized as spec files. Each test is independent i.e. is not dependent on the execution of other tests and can also execute multiple times. 

#### Pages
Directory: cypress/pages
These classes abstract the pages in the application. The tests consume these classes to perform actions on the UI. 

#### API Client 
Directory: cypress/backend
This allows us to invoke REST API endpoints to set up data so that the UI test can perform only the action that needs verification, without having to set up dependent data using the UI. 






