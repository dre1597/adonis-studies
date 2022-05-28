/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.where('id', {
  match: /^[0-9]+$/,
  cast: (id) => Number(id),
})

Route.get('/', async (ctx) => {
  ctx.test = 'testing'
  return ctx.view.render('welcome')
})

Route.group(() => {
  Route.get('/posts/:id', async ({ params }) => {
    return `get single post with an id of ${typeof params.id}`
  }).where('id', { match: /^[0-9]+$/, cast: (id) => Number(id) })

  Route.get('/posts/:id', async ({ params }) => {
    return `get single post with an id of ${typeof params.id}`
  }).where('id', Route.matchers.number())
})

Route.any('/test', () => {
  return 'test route with any method'
})

Route.get('/test2/:optional?', ({ params }) => {
  if (params.optional) {
    return `with param: ${params.optional}`
  }
  return `without params`
})

Route.get('/img/*', async ({ params }) => {
  return params['*']
})

Route.get('/img/:userId/*', async ({ params }) => {
  return params
})
