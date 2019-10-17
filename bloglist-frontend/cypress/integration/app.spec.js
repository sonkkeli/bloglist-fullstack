describe('blogs app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Sonja Laurila',
      username: 'sonkkeli',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('sonkkeli')
      cy.get('#password').type('salainen')
      cy.contains('login').click()      
    })

    it('name of the user is shown', function() {
      cy.contains('Welcome Sonja Laurila') 
      cy.contains('Sonja Laurila logged in')
    })

    it('a new blog can be created', function() {
      cy.contains('create new').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('testi')
      cy.get('#url').type('www.testi.fi')
      cy.get('#createsubmit').click()
      cy.contains('a blog created by cypress')
    })

    it('a blog can be deleted', function() {
      cy.contains('create new').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('testi')
      cy.get('#url').type('www.testi.fi')
      cy.get('#createsubmit').click()
      cy.contains('delete').click()
      cy.contains('a blog created by cypress').should('not.exist')
      cy.contains('Removal successful')
    })

    it('a blog can be viewed and commented and liked', function() {
      cy.contains('create new').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('testi')
      cy.get('#url').type('www.testi.fi')
      cy.get('#createsubmit').click()
      cy.contains('a blog created by cypress').click()
      cy.contains('a blog created by cypress by testi')
      cy.contains('www.testi.fi')
      cy.contains('0 likes')
      cy.contains('added by Sonja Laurila')
      cy.contains('comments')
      cy.get('#commentinput').type('hyvä vinkki')
      cy.get('#addbutton').click()
      cy.reload()
      cy.contains('hyvä vinkki')
      cy.get('#likebtn').click()
      cy.reload()
      cy.contains('1 likes')
    })
  })

  it('front page can be opened', function() {    
    cy.contains('Login')
  })

  it('empty password and username wont work', function() {    
    cy.contains('login').click()
    cy.contains('Incorrect username or password')
  })
})