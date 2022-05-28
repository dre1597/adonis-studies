import User from 'App/Models/User';
import Project from 'App/Models/Project';
import { DateTime } from 'luxon';
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';

export default class Task extends BaseModel {
    @column({ isPrimary: true })
    public id: number;

    @column()
    public project_id: number;

    @column()
    public user_id: number;

    @column()
    public title: string;

    @column()
    public description: string;

    @column.dateTime()
    public due_date: DateTime;

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime;

    @belongsTo(() => User, { foreignKey: 'user_id' })
    public user: BelongsTo<typeof User>;

    @belongsTo(() => Project, { foreignKey: 'project_id' })
    public project: BelongsTo<typeof Project>;
}
