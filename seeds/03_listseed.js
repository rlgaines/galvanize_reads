exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('book_lists').del(), 

    // Inserts seed entries
    knex('book_lists').insert(
    {
			author_id: 4,
      book_id: 1
    }),

    knex('book_lists').insert(
    {
      author_id: 3,
      book_id: 2
    }),
    
    knex('book_lists').insert(
    {
      author_id: 2,
      book_id: 3
    }),
        
    knex('book_lists').insert(
    {
      author_id: 1,
      book_id: 4
    }),
    
    knex('book_lists').insert(
    {
      author_id: 1,
      book_id: 5
    }),
        

    knex('book_lists').insert(
    {
      author_id: 1,
      book_id: 6
    })
        

   );
};	