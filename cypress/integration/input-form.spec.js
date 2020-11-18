const { describe } = require("mocha");

describe('Search Page', () => {
    // Run this command before each it statement
    beforeEach(() => {
        // Visit the root of the base URL defined in cypress.json
        cy.visit('/')
    })
    // Define a context to group similar tests
    context('Page load', () => {
        it('Populates dropdowns on load', () => {
            cy.get('#state-list').children()
                .should('have.length', 60)

            cy.get('#genre-list').children()
                .should('have.length', 23)
        })

        it('Populates table with only 10 results', () => {
            cy.get('tbody').children()
                .should('have.length', 10)
                .and('be.visible')
        })

        it('Allows user to type a search', () => {
            const searchText = 'Steak';
            cy.get('#search-input')
                .type(searchText)
                .should('have.value', searchText)
        })
    })

    context('Search functionality', () => {
        it('Filters table on Search button click', () => {
            const searchText = 'eclectic'
            cy.get('#search-input')
                .type(searchText)
            cy.get('#search-button')
                .click()

            cy.get('tbody').children()
                .should('have.length', 1)
            cy.get('#button2')
                .should('not.be.visible')
        })

        it('Resets the table when input field is cleared', () => {
            cy.get('#search-input')
                .clear()
            
            cy.get('tbody').children()
                .should('have.length', 10)
        })

        it('Filters table by search on Enter key press', () => {
            const searchText = 'steak'
            cy.get('#search-input')
                .type(searchText).focus().type('{enter}')

            cy.get('tbody').children()
                .should('have.length', 10)
            cy.get('#button2')
                .should('not.be.visible')
        })
    })

    context('Filter functionality', () => {
        it('Filters table on state select', () => {
            cy.get('#state-list')
                .select('TX')
                
            cy.get('tbody').children()
                .should('have.length', 4)
            cy.get('#button2')
                .should('not.be.visible')
        })

        it('Filters table on genre select', () => {
            cy.get('#state-list')
                .select('TX')
            cy.get('#genre-list')
                .select('French')

            cy.get('tbody').children()
                .should('have.length', 1)
            cy.get('#button2')
                .should('not.be.visible')
        })

        it('Resets the table results when input fields are reset', () => {
            cy.get('#state-list')
                .select('1')
            cy.get('#genre-list')
                .select('1')

            cy.get('tbody').children()
                .should('have.length', 10)
            cy.get('#button4')
                .should('be.visible')
        })
    })
})