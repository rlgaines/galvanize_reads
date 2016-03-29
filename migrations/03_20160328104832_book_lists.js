
exports.up = function(knex, Promise) {
   return knex.schema.createTable('book_lists', function(table){
  	table.integer('author_id').unsigned();
  	table.foreign('author_id').references('id').inTable('authors');
  	table.integer('book_id').unsigned();
  	table.foreign('book_id').references('id').inTable('books');

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('book_lists');

};
