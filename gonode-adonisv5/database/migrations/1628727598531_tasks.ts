import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Tasks extends BaseSchema {
    protected tableName = 'tasks';

    public async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('user_id')
                .unsigned()
                .references('users.id')
                .onUpdate('CASCADE')
                .onDelete('SET NULL');
            table
                .integer('project_id')
                .unsigned()
                .notNullable()
                .references('projects.id')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
            table.string('title').notNullable();
            table.text('description');
            table.timestamp('due_date');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }

    public async down() {
        this.schema.dropTable(this.tableName);
    }
}
