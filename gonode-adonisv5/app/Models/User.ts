import { DateTime } from 'luxon';
import Hash from '@ioc:Adonis/Core/Hash';
import {
    column,
    beforeSave,
    BaseModel,
    HasMany,
    hasMany,
} from '@ioc:Adonis/Lucid/Orm';
import Project from './Project';
import Task from './Task';

export default class User extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public username: string;

    @column()
    public email: string;

    @column({ serializeAs: null })
    public password: string;

    @column()
    public rememberMeToken?: string;

    @column()
    public token: string;

    @column()
    public token_created_at: DateTime;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @hasMany(() => Project, { foreignKey: 'project_id' })
    public projects: HasMany<typeof Project>;

    @hasMany(() => Task, { foreignKey: 'user_id' })
    public tasks: HasMany<typeof Task>;

    @beforeSave()
    public static async hashPassword(user: User) {
        if (user.$dirty.password) {
            user.password = await Hash.make(user.password);
        }
    }
}
