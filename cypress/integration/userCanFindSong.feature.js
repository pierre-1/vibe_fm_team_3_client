describe("user can search for song", () => {
  describe("happy path", () => {
    beforeEach(() => {
      cy.server()
      cy.route({
        method: 'GET', 
        url: "http://localhost:3000/api/v1/tracks**",
        response: "fixture:song_data.json"
      })
      cy.visit("/");
    });
  
    xit("retrieves song from API", () => {
      cy.get("input#search-field").type('Vertigo');
      cy.get("button#search").click();
      cy.get("#tracks").should(
        "contain",
        "Vertigo"
      );
    });
  })

  describe("SAD PARTH user can search for song", () => {
    beforeEach(() => {
     cy.server();
     cy.route({
      method: 'GET',
      url: "http://localhost:3000/api/v1/tracks**",
      status: "400",
      response: {
        error_message: "There is no matches for the song you are trying to search"
      }
    })
      cy.visit("/");
  });
  
      it("User invalid search", () => {
          cy.get("input#search-field").type('asdasdasdasd');
          cy.get("button#search").click();
         cy.get('#error_message').should('contain', 'no matches for the song')
      });
    });
})
