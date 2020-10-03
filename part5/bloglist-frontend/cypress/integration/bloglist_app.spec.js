describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', {
      username: 'root', password: 'password', name: 'rootname'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#password')
    cy.get('#username')
    cy.get('#login-button')
  })
  describe('user can login', function () {
    it('user manages to login', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('rootname')
    })
    it('user with wrong credentials fails to login', function () {
      cy.get('#password').type('wrongpassword')
      cy.get('#username').type('root')
      cy.get('#login-button').click()
      cy.contains('Wrong credentials')
      cy.get('app').should('not.contain', 'logout')
    })
  })
  describe.only('when logged in', function () {
    beforeEach(function () {
      console.log('ola')
      cy.request('POST', 'http://localhost:3001/api/login', { username: 'root', password: 'password' }).then(response => {
        console.log('storage', response.body)
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })
    it('a blog can be created', function () {
      console.log('adeus', localStorage.getItem('loggedUser'))

      cy.contains('Create new blog').click()
      cy.get('.titleInput').type('alohfghfghfgh')
      cy.get('.authorInput').type('author')
      cy.get('.urlInput').type('urfgl')
      cy.get('.submit').click()
      cy.contains('alo')
      console.log('a blog can be created')
    })
    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Medium',
          author: 'Johny Cash',
          url: 'www.medium.com'
        })
      })
      it('a note shows', function () {
        cy.contains('Medium')
      })
    })
  })
})