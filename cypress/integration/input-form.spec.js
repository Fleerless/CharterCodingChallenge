const { getByAltText } = require("@testing-library/react");
const { describe } = require("mocha");

describe('Search Page', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    context('Page load', () => {
        it('Populates dropdowns on load', () => {
            cy.get('#state-list').children()
                .should('have.length', 60)
    
            cy.get('#genre-list').children()
                .should('have.length', 23)
            
        })

        it('Populates table with 10 results', () => {
            cy.get('tbody').children()
                .should('have.length', 10)
        })

        it('Allows user to type a search', () => {
            const itemText = 'Steak';
            cy.get('#search-input')
                .type(itemText)
                .should('have.value', itemText)
        })
    })

    context('Functionality', () => {

    })
})