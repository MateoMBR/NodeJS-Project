
---

# Gestion de Tâches et d'Utilisateurs

Une API REST développée en Node.js avec Express et MongoDB pour gérer des tâches et des utilisateurs. Cette API permet de créer, lire, mettre à jour et supprimer des tâches et des utilisateurs, ainsi que de gérer l'assignation des tâches.

## Installation

1. **Clonez le projet :**
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   ```

2. **Installez les dépendances :**
   ```bash
   npm install
   ```

3. **Lancez MongoDB** (en local sur le port par défaut `27017`) et assurez-vous que la connexion est disponible sur `mongodb://localhost:27017/mon-projet`.

4. **Démarrez le serveur :**
   ```bash
   node main.js
   ```
   Le serveur sera accessible à l’adresse `http://localhost:3000`.

## Modèles

- **Tâche (Task)** : possède un titre, une description, un statut (`done`), une date de création et un utilisateur assigné.
- **Utilisateur (User)** : possède un nom, un email et un mot de passe.

---

## Endpoints

### 1. Tâches (Tasks)

#### Créer une tâche
- **Méthode** : `POST`
- **URL** : `/tasks`
- **Body** (JSON) :
  ```json
  {
    "title": "Nom de la tâche",
    "description": "Description de la tâche",
    "done": "Statut de la tâche (Pas-commencé, En-cours, Terminé)",
    "date": "2024-10-25T00:00:00.000Z",
    "user": "User ID (optionnel)"
  }
  ```
- **Réponse** : `Task ajouté`

#### Lister toutes les tâches
- **Méthode** : `GET`
- **URL** : `/tasks`
- **Réponse** : Un tableau JSON contenant toutes les tâches.

#### Lire une tâche par ID
- **Méthode** : `GET`
- **URL** : `/tasks/:id`
- **Réponse** : La tâche correspondante sous format JSON.

#### Mettre à jour une tâche par ID
- **Méthode** : `PUT`
- **URL** : `/tasks/:id`
- **Body** (JSON) : Champs à mettre à jour.
- **Réponse** : `Task modifié`

#### Supprimer une tâche par ID
- **Méthode** : `DELETE`
- **URL** : `/tasks/:id`
- **Réponse** : `Task supprimé`

#### Filtrer les tâches par statut
- **Méthode** : `GET`
- **URL** : `/tasks/status/:done`
- **Exemple** : `/tasks/status/En-cours`
- **Réponse** : Un tableau des tâches ayant le statut spécifié.

#### Filtrer les tâches par date de création
- **Méthode** : `GET`
- **URL** : `/tasks/date/:date`
- **Exemple** : `/tasks/date/2024-10-01`
- **Réponse** : Un tableau des tâches créées à la date spécifiée.

#### Assigner une tâche à un utilisateur
- **Méthode** : `PUT`
- **URL** : `/tasks/:id/assign/:userId`
- **Réponse** : `Task assigné`

---

### 2. Utilisateurs (Users)

#### Créer un utilisateur
- **Méthode** : `POST`
- **URL** : `/users`
- **Body** (JSON) :
  ```json
  {
    "name": "Nom de l'utilisateur",
    "email": "email@example.com",
    "password": "motdepasse"
  }
  ```
- **Réponse** : `User ajouté`

#### Lister tous les utilisateurs
- **Méthode** : `GET`
- **URL** : `/users`
- **Réponse** : Un tableau JSON contenant tous les utilisateurs.

#### Lire un utilisateur par ID
- **Méthode** : `GET`
- **URL** : `/users/:id`
- **Réponse** : L’utilisateur correspondant sous format JSON.

#### Mettre à jour un utilisateur par ID
- **Méthode** : `PUT`
- **URL** : `/users/:id`
- **Body** (JSON) : Champs à mettre à jour.
- **Réponse** : `User modifié`

#### Supprimer un utilisateur par ID
- **Méthode** : `DELETE`
- **URL** : `/users/:id`
- **Réponse** : `User supprimé`

#### Voir les tâches assignées à un utilisateur
- **Méthode** : `GET`
- **URL** : `/users/:userId/tasks`
- **Exemple** : `/users/507f191e810c19729de860ea/tasks`
- **Réponse** : Un tableau des tâches assignées à l'utilisateur spécifié.

---

## Utilisation dans Postman

1. **POST** `/tasks` - Crée une nouvelle tâche.
2. **GET** `/tasks` - Liste toutes les tâches.
3. **PUT** `/tasks/:id` - Met à jour une tâche existante.
4. **DELETE** `/tasks/:id` - Supprime une tâche spécifique.
5. **GET** `/tasks/status/En-cours` - Filtre les tâches par statut.

---
