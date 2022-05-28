import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Mail from '@ioc:Adonis/Addons/Mail';
import User from 'App/Models/User';

import Task from 'App/Models/Task';

export default class TasksController {
    public async index({ params }: HttpContextContract) {
        const tasks = await Task.query()
            .where('project_id', params.project_id)
            .preload('user');

        return tasks;
    }

    public async store({ params, request }: HttpContextContract) {
        const data = request.only([
            'user_id',
            'title',
            'description',
            'due_date',
        ]);

        const task = await Task.create({
            ...data,
            project_id: params.project_id,
        });

        const user = await User.findByOrFail('id', data.user_id);

        await Mail.send((message) => {
            message
                .to(user.email)
                .from('test@test.com')
                .subject('New Task')
                .htmlView('emails/new_task', { username: user.username });
        });

        return task;
    }

    public async show({ params }: HttpContextContract) {
        const task = await Task.findOrFail(params.id);

        return task;
    }

    public async update({ params, request }: HttpContextContract) {
        const data = request.only([
            'user_id',
            'title',
            'description',
            'due_date',
        ]);
        const task = await Task.findOrFail(params.id);

        task.merge(data);

        await task.save();

        return task;
    }

    public async destroy({ params }: HttpContextContract) {
        const task = await Task.findOrFail(params.id);

        await task.delete();
    }
}
