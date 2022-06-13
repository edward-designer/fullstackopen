describe('Bloglist app homepage', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page has login form', function() {
    cy.contains('Bloglist')
    cy.contains('Login')
  })

  describe('Login', function() {
    it('login with incorrect credentials will show the "Wrong credentials" error', function() {
      cy.contains('login').click()
      cy.contains('Wrong credentials')
      cy.get('html').should('not.contain', 'Hello')
    })

    it('user can login', function () {
      cy.get('input:first').type('mluukkai')
      cy.get('input:last').type('salainen')
      cy.contains('login').click()

      cy.contains('Hello')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' }) // api to login @ support/commands.js
    })

    it('create a new blog', function() {
      cy.contains('Add a new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('http://cypress.com')
      cy.get('#addBlog').click()
      cy.contains('a blog created by cypress')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog created by cypress',
          author: 'Cypress',
          url: 'http://cypress.com'
        })
      })

      it('can like the blog', function () {
        cy.get('[data-testid="toggle-visibility"]').click()
        cy.get('[data-testid="like-icon"]').click()
        cy.contains('1')
      })

      it('owner can delete the blog', function () {
        cy.get('[data-testid="toggle-visibility"]').click()
        cy.get('[data-testid="delete-icon"]').click()
        cy.get('html').should('not.contain', 'another blog created by cypress')
      })

      it('blogs can be ordered by number of likes', function () {
        cy.createBlog({
          title: 'most liked',
          author: 'Cypress',
          url: 'http://cypress.com',
          likes: 10000
        })
        cy.createBlog({
          title: 'second most liked',
          author: 'Cypress',
          url: 'http://cypress.com',
          likes: 1
        })
        cy.contains('Likes').click()
        cy.get('.blog').eq(0).should('contain', 'most liked')
        cy.get('.blog').eq(1).should('contain', 'second most liked')
      })
    })
  })
})

