app.service('catalogService', ['$http', CatalogService]);

function CatalogService($http) {
  return {
    getBooks: $http.get('http://localhost:3000/api/books/'),

    getBookDetails: function(id) {
      // console.log(id);
      return $http.get('http://localhost:3000/api/books/' + id);
    },
    postNewBook: function(bookObj) {
      return $http.post('http://localhost:3000/api/books/', bookObj);
    },
    deleteBook: function(id) {
      return $http.delete('http://localhost:3000/api/books/' + id);
    },
    editBook: function(id, editObj) {
      return $http.put('http://localhost:3000/api/books/' + id, editObj);
    }
  };
}
