app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/bookList.html',
    controller: 'BookListController as BC'
  })
  .when('/book/:bookId', {
    templateUrl: 'views/bookDetails.html',
    controller: 'BookDetailsController as DC'
  })
  .when('/new', {
    templateUrl: 'views/addBook.html',
    controller: 'NewBookController as NC'
  })
  .when('/edit', {
    templateUrl: 'views/editBook.html',
    controller: 'EditBookController as EC'
  });
});
