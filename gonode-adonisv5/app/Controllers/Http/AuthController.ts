import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import { schema, validator, rules } from '@ioc:Adonis/Core/Validator';

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const email = request.input('email');
        const password = request.input('password');

        const token = await auth.use('api').attempt(email, password);

        return token.toJSON();
    }

    public async store({ request }: HttpContextContract) {
        const validatorSchema = schema.create({
            username: schema.string({}, [
                rules.required(),
                rules.unique({ table: 'users', column: 'username' }),
            ]),
            email: schema.string({}, [
                rules.required(),
                rules.email(),
                rules.unique({ table: 'users', column: 'email' }),
            ]),
            password: schema.string({}, [rules.required(), rules.minLength(5)]),
        });
        const data = request.only(['username', 'email', 'password']);

        await validator.validate({
            schema: validatorSchema,
            data,
        });

        const user = await User.create(data);

        return user;
    }
}
