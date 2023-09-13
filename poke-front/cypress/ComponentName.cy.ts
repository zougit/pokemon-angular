import { AppComponent } from "src/app/app.component";
import { TeamViewComponent } from "src/app/views/team-view/team-view.component";

describe('Tests Cypress pour la page Pokemon', () => {
  beforeEach(() => {
    cy.mount(TeamViewComponent)
  });

  it('Vérifie la présence d\'informations de Pokémon', () => {
    cy.get('.box').first().should('be.visible');
    cy.get('.box').first().find('p').should('have.length', 3); // Vérifie les 3 paragraphes de données
    cy.get('.box').first().find('img').should('be.visible');
  });

  it('Vérifie la présence d\'équipe de Pokémon', () => {
    cy.get('.box').last().should('be.visible');
    cy.get('.poke').should('have.length', 6); // Vérifie le nombre de blocs de Pokémon
  });

  it('Ajoute et supprime un Pokémon de l\'équipe', () => {
    cy.get('.poke').eq(0).click(); // Clique sur le premier Pokémon dans l'équipe
    cy.get('.btnadd').should('be.visible');
    cy.get('.btnadd').click(); // Ajoute un Pokémon dans l'équipe
    cy.get('.poke').should('have.length', 6); // Vérifie que l'équipe a maintenant 6 membres
    cy.get('.btnadd').last().click(); // Supprime le dernier Pokémon de l'équipe
    cy.get('.poke').should('have.length', 5); // Vérifie que l'équipe a maintenant 5 membres
  });

  // Ajoutez plus de tests selon vos besoins...
});

