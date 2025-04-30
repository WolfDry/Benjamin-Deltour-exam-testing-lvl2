# Questionnaire 

### Objectif des tests unitaires
Quel est l'objectif principal des tests unitaires ?
   - A) Tester l'intégration entre plusieurs composants
   - **B) Vérifier le comportement d'une unité de code isolée**
   - C) Valider l'expérience utilisateur
   - D) Tester les performances du système

### Utilisation de Gherkin
Gherkin est principalement utilisé pour :
   - A) Écrire des tests unitaires
   - **B) Décrire le comportement attendu dans un format compréhensible par tous**
   - C) Documenter le code source
   - D) Analyser les performances des tests

### Principe d'isolation
Expliquez en quoi consiste le principe d'isolation dans les tests unitaires et pourquoi il est important.

Le principe d'isolation dans les testes unitaires signifie que chaque test concerne uniquement une seule partie du code sans dépendre d'éléments externes comme la base de données ou une autre fonction.

C'est important pour guarantire la fiabilité du test, la facilité de débogage et la vitesse du test

### Origine du BDD
Le BDD est une extension du :
   - A) Waterfall
   - **B) Test Driven Development**
   - C) Extreme Programming
   - D) Scrum

### Fonction des tests d'intégration
Les tests d'intégration vérifient principalement :
   - A) Le fonctionnement isolé de chaque composant
   - **B) L'interaction entre différents composants ou modules**
   - C) L'expérience utilisateur globale
   - D) La vitesse d'exécution du code

### Structure Gherkin
Expliquez la structure d'un scénario Gherkin et donnez un exemple concret.

La structure d'un scénario Gherkin permet d'écrire des scénarios de test lisible et compréhensible par tous.

Exemple : 

Feature: Connexion à l’espace utilisateur

  Scenario: Connexion réussie avec des identifiants valides

  Given l'utilisateur se trouve sur la page de connexion

  And il entre l'email "alice@example.com" et le mot de passe "motdepasse123"

  When il clique sur le bouton "Se connecter"

  Then il est redirigé vers son tableau de bord

  And un message "Bienvenue Alice !" s’affiche

### Mocks en tests unitaires
Dans le contexte des tests unitaires, que sont les "mocks" ?
   - A) Des erreurs volontairement introduites pour vérifier la robustesse du code
   - **B) Des objets qui simulent le comportement de dépendances réelles**
   - C) Des tests qui échouent intentionnellement
   - D) Des interfaces utilisateur simulées

### Objectif des tests end-to-end
Les tests end-to-end visent à :
   - A) Vérifier le fonctionnement d'un composant isolé
   - **B) Tester l'application de bout en bout du point de vue de l'utilisateur**
   - C) Mesurer uniquement les performances de l'application
   - D) Remplacer tous les autres types de tests

### Cycle TDD
Expliquez en détail le cycle Red-Green-Refactor du TDD et ce qui se passe à chaque étape.

1. Red - Ecrire un test qui échoue

Ecrire un test pour une fonctionnalité qui n'existe pas encore afin de définir les attentes

2. Green - Ecrire un test qui fonctionne 

Implémentation du minimum de code pour que le code passe sans chercher à optimiser

3. Refactor - Améliorer le code sans casser les tests

Amélioration du code pour améliorer la lisibilité, pour supprimer les dupliucations,...

### Caractéristiques d'un bon test unitaire
Quelle est la caractéristique idéale d'un bon test unitaire ?
    - A) Il doit être complexe pour couvrir tous les cas
    - **B) Il doit être rapide à exécuter, isolé et répétable**
    - C) Il doit tester plusieurs fonctionnalités à la fois
    - D) Il doit nécessiter une configuration manuelle avant chaque exécution

### Mots-clés de Gherkin
Quels sont les mots-clés principaux de Gherkin ?
    - A) Test, Code, Validate
    - B) Setup, Execute, Verify, Teardown
    - **C) Feature, Scenario, Given, When, Then**
    - D) Describe, It, Expect, Assert

### Tests unitaires vs tests d'intégration
Quelles sont les principales différences entre les tests unitaires et les tests d'intégration ?

Ils n'ont pas les mêmes objectifs. Les tests unitaire ont pour objectifs de tester un code isolé comme une fonction ou une méthode. Les tests fonctionnaires ont pour but de vérifier l'intéraction entre plusieurs composants ou modules du projet.

Ils n'ont pas la même vitesse d'exécution. Les tests unitaire sont plus rapide que des tests d'intégration.

Ils ne dépendent pas des même choses. Les test unitaires doivent être isolé de tout composant du projet, ils ne doivent pas appelé la bdd ou un composant. Les tests  d'intégration viennent tester les composants du système il sont donc pas isolé du projet.

### Nom du cycle TDD
Le cycle TDD classique est connu sous le nom de :
    - A) Plan-Do-Check-Act
    - B) **Red-Green-Refactor**
    - C) Build-Measure-Learn
    - D) Test-Code-Deploy

### Focus des tests fonctionnels
Les tests fonctionnels se concentrent sur :
    - A) Le code source interne
    - B) Les interactions entre composants
    - C) **Le comportement du système par rapport aux spécifications**
    - D) La performance du système sous charge

### BDD et communication d'équipe
Comment le BDD peut-il améliorer la communication entre les équipes techniques et les équipes métier ?

Le BDD améliore la communication entre les équipes techniques et les équipes métiers grâce à au langage commun Gherkin qui permet de décrire les comportements du système de manière lisible par tous y compris les non-développeurs. Cela passe aussi par une collaboration entre les deux équipes pour définir les comportements attendus du système dans un format compréhensible. 

### Avantage principal du TDD
Quel est l'avantage principal du TDD ?
    - A) Il réduit le temps de développement global
    - B) Il garantit l'absence totale de bugs
    - **C) Il favorise un design modulaire et des interfaces claires**
    - D) Il élimine le besoin de documentation

### Avantages et défis des tests end-to-end
Quels sont les avantages et les défis spécifiques liés aux tests end-to-end par rapport aux autres types de tests ?

Les tests end to end permettent de s'assurer que tous les composants du système fonctionne ensemble grâce à une simulation des actions réelles d'un utilisateur. Ces tests valident l'intégration complète du système allant du front-end jusqu'au back-end.

En validant les parcours utilisateurs complets, les tests end to end garantissent que les fonctionnalités clé de l'application sont intuitives et fonctionnelles pour l'utilisateur final.

Les tests end to end peuvent être long à exécuter puisqu'ils viennent couvrirent des scénarios complexcomplexes et viennent impliquer plusieurs composants.

Ils ont plus de chance d'échouer de manière aléatoire ou à cause de problèmes externe comme la lenteur du réseau ou des erreurs dans des services tiers.

### Format des scénarios BDD
Quel est le format typique d'un scénario BDD ?
    - A) Si-Alors
    - B) **Étant donné-Quand-Alors**
    - C) Qui-Quoi-Où-Quand
    - D) Pour-Pendant-Après

### Avantages et limites des tests unitaires
Décrivez les avantages et les limites des tests unitaires dans un projet de développement logiciel.

Les tests unitaires permettent de : 

- Détecter rapidement des bugs dans le code.
- Il augmente la qualité du code grâce à la réfléxion demandé lors de son écriture
- Il vient empécher les régressions dans le code

Les tests unitaires sont limités à cause de :

- Leur isolation par rapport au système. Ils ne permettent de vérifier qu'un bout de code à la fois
- Il peut parfois être long et coûteuse de maintenir les tests unitaires
- Il ne permettent pas de couvrir tout les cas possible comme ceux concernant les composants externe. 

### Fonctionnalité de réutilisation dans Gherkin
Quelle est la fonctionnalité de Gherkin qui permet de réutiliser des étapes communes à plusieurs scénarios ?
    - A) Hooks
    - **B) Background**
    - C) Scenario Outline
    - D) Tags

### Responsabilité des tests fonctionnels
Qui est généralement responsable de l'écriture et de l'exécution des tests fonctionnels ?
    - A) Les développeurs uniquement
    - B) Les testeurs QA uniquement
    - **C) Les développeurs et les testeurs QA**
    - D) Les utilisateurs finaux

### Moment d'écriture du code en TDD
Dans le TDD, à quel moment écrit-on le code de production ?
    - A) Avant d'écrire les tests
    - B) Après avoir écrit les tests mais avant de les exécuter
    - **C) Après avoir exécuté les tests et constaté leur échec**
    - D) Après que tous les tests aient réussi

### Outils pour tests end-to-end
Quel outil est couramment utilisé pour les tests end-to-end d'applications web ?
    - A) JUnit
    - B) Mockito
    - **C) Playwright**
    - D) NUnit

### Différences entre BDD et TDD
En quoi le BDD diffère-t-il du TDD en termes d'approche et d'objectifs ?

Ils n'ont pas le même objectif. Le TDD permet de garantir que le code fonctionne comme prévu grâce à des tests unitaire écrits avant le développement du code. Il se concentre sur la qualité du code et la réduction des bugs. Le BDD vient s'assurer que le comportement de l'application correspond au attentes des utilisateurs. Il se concentre sur le comportement du système.

### Défis des tests d'intégration
Quels défis sont fréquemment rencontrés lors de la mise en place de tests d'intégration ?
    - A) La difficulté à isoler les composants
    - B) La lenteur d'exécution des tests
    - C) La difficulté à simuler certaines dépendances
    - **D) Toutes les réponses ci-dessus**

### Caractéristiques d'un bon test end-to-end
Quelle est la caractéristique d'un bon test end-to-end ?
    - A) Il doit tester toutes les fonctionnalités en une seule fois
    - **B) Il doit simuler avec précision le comportement réel des utilisateurs**
    - C) Il doit être exécuté uniquement en production
    - D) Il doit être modifié fréquemment

### Défis de l'adoption du TDD
Quels sont les défis couramment rencontrés lors de l'adoption du TDD dans une équipe, et comment pourriez-vous les surmonter ?

Défi: Il peut être difficile de maintenir les tests de manière completes et cohérente. Solution : Réfacto régulier des tests afin de s'assurer qu'ils sont lisible et efficaces. Mettre en place des pratiques de code claires pour éviter que la base des tests soit trop chaotique.

Défi: Des tests qui ne couvrent pas entièrement les cas d'utilisation ou ne sont pas suffisamment robustes. Solution : impliquer des parties prenantes pour définir des scénarios de test qui couvrent les comportements attendus de l'application. Faire des revues de code sur les tests pour garantir leur qualité

### Frameworks de tests unitaires
Lequel de ces frameworks n'est PAS utilisé pour les tests unitaires ?
    - A) JUnit
    - B) NUnit
    - **C) Selenium**
    - D) Vitest

### Rôles dans le processus BDD
Quels rôles sont généralement impliqués dans le processus BDD ?
    - A) Uniquement les développeurs
    - B) Développeurs et testeurs
    - C) Développeurs, testeurs et product owners
    - **D) Développeurs, testeurs, product owners et parties prenantes métier**

### Maintenance des tests end-to-end
Comment géreriez-vous la maintenance des tests end-to-end pour une application qui évolue rapidement ?

En revoyant les tests après chaque changement majeur, en mettant en place un environnement de test et en automatisant son déploiement grâce a des outils d'intégration continue. En priorisant les scénarios critiques. En faisant des tests tôt dans le développement du projet et en les exécutant régulièrement. 

### Inconvénients des tests fonctionnels
Quel est le principal inconvénient des tests fonctionnels ?
    - A) Ils sont trop simples pour détecter des bugs complexes
    - **B) Ils sont généralement lents et coûteux à exécuter**
    - C) Ils ne peuvent pas être automatisés
    - D) Ils nécessitent peu de connaissances du domaine

### Intégration de Gherkin en agile
Comment intégreriez-vous Gherkin dans un processus de développement agile ? Quels seraient les avantages ?

Avant chaque sprint ou lors de la planification des user stories, les product owners, les développeurs et les testeurs collaborent pour rédiger des scénarios en Gherkin qui décrivent le comportement attendu d'une fonctionnalité dans un format clair.
Les scénarios étant lisibles par tous, les parties prenantes peuvent valider rapidement si une fonctionnalité correspond à leurs besoins.

Les avantages de l'intégration de Ghérkin : 

- Améliore la communication entre équipes techniques et métier grâce à un langage commun.
- Réduit les ambiguïtés fonctionnelles dès le début du développement.
- Favorise une documentation vivante et à jour.
- Automatise les tests d’acceptation, augmentant la qualité globale.
- Permet des retours rapides sur la conformité du produit aux exigences.

### Principes du TDD
Lequel des principes suivants n'est PAS associé au TDD ?
    - A) Écrire le test minimum qui échoue
    - B) Écrire le code minimum qui fait passer le test
    - C) Refactoriser le code après chaque test réussi
    - **D) Écrire tous les tests à la fin du développement**

### Différences entre tests fonctionnels et autres tests
En quoi les tests fonctionnels diffèrent-ils des tests unitaires et d'intégration en termes d'approche et d'objectifs ?

 Tests unitaires

Approche : Testent une unité de code isolée, généralement une fonction ou une méthode.

Objectif : Vérifier que chaque composant individuel fonctionne correctement de manière indépendante.

Tests d’intégration

Approche : Testent l’interaction entre plusieurs composants ou modules.

Objectif : Vérifier que les composants collaborent correctement entre eux.

Tests fonctionnels

Approche : Testent le comportement du système dans son ensemble, du point de vue de l'utilisateur.

Objectif : Valider que le système répond aux exigences fonctionnelles définies dans les spécifications.

### Approche combinant TDD, BDD et Gherkin
Quelle approche combine naturellement TDD, BDD et Gherkin ?
    - A) Extreme Programming
    - **B) Specification By Example**
    - C) Scrum
    - D) Kanban

### Organisation des tests fonctionnels
Décrivez comment vous organiseriez les tests fonctionnels pour une application web de e-commerce.

1. Identifier les fonctionnalités critiques à tester
2. Définir des scénarios fonctionnels par parcours utilisateur
3. Automatiser les tests clés
4. Organiser les tests en suites
5. Planifier l’exécution des tests

### Pyramide de tests
Quelle est la pyramide de tests classique, du bas vers le haut ?
    - A) Tests E2E, Tests fonctionnels, Tests d'intégration, Tests unitaires
    - **B) Tests unitaires, Tests d'intégration, Tests fonctionnels, Tests E2E**
    - C) Tests fonctionnels, Tests unitaires, Tests d'intégration, Tests E2E
    - D) Tests unitaires, Tests fonctionnels, Tests d'intégration, Tests E2E

### Stratégie de test optimale
Comment détermineriez-vous la stratégie de test optimale pour un projet, en considérant les différents types de tests abordés dans ce questionnaire ?

1. Analyser le contexte du projet
2. Choisir les bons outils pour chaque type de tests
3. Définir des critères de priorisation
4. Stratégies complémentaires (tests de performance, tests de sécurité)
5. Intégration dans l’environnement CI/CD
6. Réévaluation régulière de la stratégie

### Quelle est l'erreur récurente qui peut être faite lors de test end 2 end ? (Je l'ai répété pas mal de fois)
