import Route from '@ioc:Adonis/Core/Route';

Route.post('login', 'AuthController.login');
Route.post('user', 'AuthController.store');

Route.post('forgot-password', 'ForgotPasswordsController.store');
Route.put('forgot-password', 'ForgotPasswordsController.update');

Route.group(() => {
    Route.resource('projects', 'ProjectsController').apiOnly();
    Route.resource('projects.tasks', 'TasksController').apiOnly();
}).middleware(['auth']);
