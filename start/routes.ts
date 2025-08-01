/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { 
    message: '🚀 Pagmus API - Backend funcionando!',
    version: '1.0.0',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  }
})

// Health check
Route.get('/health', async () => {
  return { 
    status: 'ok',
    timestamp: new Date().toISOString()
  }
})

// API Routes
Route.group(() => {
  
  // Auth routes
  Route.group(() => {
    Route.post('/login', 'AuthController.login')
    Route.post('/register', 'AuthController.register')
    Route.post('/logout', 'AuthController.logout').middleware('auth')
    Route.get('/me', 'AuthController.me').middleware('auth')
  }).prefix('/auth')

  // Users routes
  Route.group(() => {
    Route.get('/', 'UsersController.index')
    Route.get('/:id', 'UsersController.show')
    Route.put('/:id', 'UsersController.update')
  }).prefix('/users').middleware('auth')

  // Products routes
  Route.group(() => {
    Route.get('/', 'ProductsController.index')
    Route.post('/', 'ProductsController.store')
    Route.get('/:id', 'ProductsController.show')
    Route.put('/:id', 'ProductsController.update')
    Route.delete('/:id', 'ProductsController.destroy')
  }).prefix('/products').middleware('auth')

  // Sales routes
  Route.group(() => {
    Route.get('/', 'SalesController.index')
    Route.get('/stats', 'SalesController.stats')
    Route.get('/afterpay', 'SalesController.afterpay')
  }).prefix('/sales').middleware('auth')

  // Affiliates routes
  Route.group(() => {
    Route.get('/', 'AffiliatesController.index')
    Route.post('/approve/:id', 'AffiliatesController.approve')
    Route.post('/reject/:id', 'AffiliatesController.reject')
  }).prefix('/affiliates').middleware('auth')

}).prefix('/api/v1')