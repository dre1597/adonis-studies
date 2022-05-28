import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { DateTime } from 'luxon';
import User from 'App/models/User';
import Mail from '@ioc:Adonis/Addons/Mail';
// import Hash from '@ioc:Adonis/Core/Hash';
const crypto = require('crypto');
const moment = require('moment');

export default class ForgotPasswordsController {
    public async store({ request, response }: HttpContextContract) {
        try {
            const email = request.input('email');
            const user = await User.findByOrFail('email', email);

            user!.token = crypto.randomBytes(10).toString('hex');
            user!.token_created_at = DateTime.now();

            await user?.save();

            await Mail.send((message) => {
                message
                    .to(user.email)
                    .from('test@test.com')
                    .subject('Reset Password')
                    .htmlView('emails/forgot_password', {
                        email,
                        token: user.token,
                        link: `${request.input('redirect_url')}?token=${
                            user.token
                        }`,
                    });
            });
        } catch (error) {
            let errorMessage;
            if (error.message) {
                errorMessage = error.message;
            } else {
                errorMessage: 'Something went wrong, this email is valid?';
            }
            response.status(error.status || 500).send({
                error: {
                    errorMessage,
                },
            });
        }
    }

    public async update({ request, response }: HttpContextContract) {
        try {
            const { token, password } = request.all();

            const user = await User.findByOrFail('token', token);

            const tokenExpired = moment()
                .subtract('2', 'days')
                .isAfter(user.token_created_at);

            if (tokenExpired) {
                return response
                    .status(401)
                    .send({ error: { message: 'The token has expired' } });
            }

            user.token = '';
            user.token_created_at;
            user.password = password;

            await user.save();
        } catch (error) {
            let errorMessage;
            if (error.message) {
                errorMessage = error.message;
            } else {
                errorMessage: 'Something went wrong on the reset password';
            }
            response.status(error.status || 500).send({
                error: {
                    errorMessage,
                },
            });
        }
    }
}
