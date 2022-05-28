import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SignupValidator from 'App/Validators/SignupValidator'
import User from 'App/Models/User'

export default class SignupController {
  public async index({ view }: HttpContextContract) {
    return view.render('signup')
  }

  public async store({ request, response }: HttpContextContract) {
    const data = await request.validate(SignupValidator)

    try {
      const user = await User.create(data)
      if (!user.$isPersisted) {
        return 'Error!'
      }
    } catch (error) {
      return 'Error!'
    }
    return response.redirect('login')
  }
}
