import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class PostsController {
  private perPage = 10
  public async index({ view }: HttpContextContract) {
    const page = await Post.query().paginate(1, this.perPage)

    return view.render('posts/index', { page })
  }

  public async paginate({ response, params, view }: HttpContextContract) {
    const page = await Post.query().paginate(params.page, this.perPage)
    const html = await view.render('components/post_list', { posts: page })

    return response.json({ html, page })
  }
}
