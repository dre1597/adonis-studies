import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignupValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string({ trim: true }, [
      rules.required(),
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    firstName: schema.string({ trim: true }, [rules.alpha(), rules.required()]),
    lastName: schema.string({ trim: true }, [rules.alpha(), rules.required()]),
    password: schema.string({}, [rules.required()]),
  })

  public messages = {}
}
