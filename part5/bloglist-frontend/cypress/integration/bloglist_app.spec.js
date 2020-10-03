describe('Bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', {
      username: 'root', password: 'password', name: 'rootname'
    })
    cy.request('POST', 'http://localhost:3001/api/users/', {
      username: 'root2', password: 'password', name: 'rootname2'
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
      cy.request('POST', 'http://localhost:3001/api/login', { username: 'root', password: 'password' }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })
    it('a blog can be created', function () {

      cy.contains('Create new blog').click()
      cy.get('.titleInput').type('Example title')
      cy.get('.authorInput').type('Example author')
      cy.get('.urlInput').type('Example url')
      cy.get('.submit').click()
      cy.contains('Example title')
      cy.contains('Example author')
      cy.contains('Example url')
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
        cy.contains('Johny Cash')
        cy.contains('www.medium.com')
      })
      it('a user can like a blog', function () {
        cy.get('.btnView')
          .click()
        cy.get('.btnLike')
          .click()
        cy.get('.extraInfo')
          .contains('likes 1')
      })
      it('a user can delete a blog', function () {
        cy.get('.btnView')
          .click()
        cy.get('.btnDelete')
          .click()
        cy.on('window.confirm', () => true)
        cy.contains('Medium').should('not.exist')
        cy.contains('Johny Cash').should('not.exist')
        cy.contains('www.medium.com').should('not.exist')
      })
      it('a user cant delete another users blog', function () {
        cy.contains('Log out').click()
        cy.login({
          username: 'root2',
          password: 'password'
        })
        cy.get('.btnView').click()
        cy.get('.btnDelete').click()
        cy.contains('Operation failed')
        cy.contains('Medium')
        cy.contains('Johny Cash')
        cy.contains('www.medium.com')
      })
    })
  })
})