const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(express.json())

// Crée le modèle Task
const Task = mongoose.model('Task', {
    title: String,
    description: String,
    done: String,
    date: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
  })

//Fonctionnalités de base
// Créer une tâche
// Lister les tâches
// Lire une tâche
// Mettre à jour une tâche
// Supprimer une tâche

// Créer une tâche avec create au lieu de save
app.post('/tasks', async (req, res) => {
    await Task.create(req.body)
    res.send('Task ajouté')
})

// Lister les tâches
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find()
    res.json(tasks)
})

// Lire une tâche
app.get('/tasks/:id', async (req, res) => {
    const task
    = await Task.findById(req.params.id)
    res.json(task)
})

// Mettre à jour une tâche
app.put('/tasks/:id', async (req, res) => {
    const id = req.params.id
    await Task.findByIdAndUpdate(id, req.body)
    res.send('Task modifié')
})

// Supprimer une tâche
app.delete('/tasks/:id', async (req, res) => {
    const id = req.params.id
    await Task.findByIdAndDelete(id)
    res.send('Task supprimé')
})

// Fonctionnalités avancées
// Filtrer les tâches par statut (en cours, terminé, etc.)
// Filtrer les tâches par date de création
// Assigner une tâche à un utilisateur, ce qui implique:
// Créer un utilisateur
// Lister les utilisateurs
// Lire un utilisateur
// Mettre à jour un utilisateur
// Supprimer un utilisateur
// Voir les tâches assignées à un utilisateur

// Filtrer les tâches par statut ex:http://localhost:3000/tasks/status/Pas-commencé (done: Pas-commencé, En-cours, Terminé) 
app.get('/tasks/status/:done', async (req, res) => {
    const tasks = await Task.find({ done: req.params.done })
    res.send(tasks)
})

// Filtrer les tâches par date de création ex:http://localhost:3000/tasks/date/2021-10-01
app.get('/tasks/date/:date', async (req, res) => {
    const tasks = await Task.find({ date: req.params.date })
    res.send(tasks)
})

//Créer un utilisateur
const User = mongoose.model('User', {
    name: String,
    email: String,
    password: String,
  })

app.post('/users', async (req, res) => {
    await User.create(req.body)
    res.send('User ajouté')
})

// Lister les utilisateurs
app.get('/users', async (req, res) => {
    const users = await User.find()
    res.json(users)
})

// Lire un utilisateur
app.get('/users/:id', async (req, res) => {
    const user
    = await User.findById(req.params.id)
    res.json(user)
})

// Mettre à jour un utilisateur
app.put('/users/:id', async (req, res) => {
    const id = req.params.id
    await User.findByIdAndUpdate(id, req.body)
    res.send('User modifié')
})

// Supprimer un utilisateur
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    res.send('User supprimé')
})

// Assigner une tâche à un utilisateur ex:http://localhost:3000/tasks/taskid/assign/userid
app.put('/tasks/:id/assign/:userId', async (req, res) => {
    const id = req.params.id
    const userId = req.params.userId
    await Task .findByIdAndUpdate(id, { user: userId })
    res.send('Task assigné')
})

// Voir les tâches assignées à un utilisateur ex:http://localhost:3000/users/userid/tasks
app.get('/users/:userId/tasks', async (req, res) => {
    const userId = req.params.userId
    const tasks = await Task.find({ user: userId })
    res.send(tasks)
})

// Je start le serveur sur le port 3000
async function start() {
    try {
      await mongoose.connect('mongodb://localhost:27017/mon-projet')
      console.log('✅ Connected to MongoDB')
      console.log('Lien du serveur : http://localhost:3000')
  
      app.listen(3000, () => console.log('✅ Server started on port 3000'))
    } catch (error) {
      console.error(error)
      process.exit(1)
    }
  }
  
  start()