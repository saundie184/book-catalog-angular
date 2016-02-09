app.controller('BookListController', ['$routeParams', '$location', 'catalogService', bookListController]);
app.controller('BookDetailsController', ['$routeParams', 'catalogService', bookDetailsController]);
app.controller('NewBookController', ['catalogService', newBookController]);
app.controller('UserController', ['$http', '$window', userController]);

function bookListController($routeParams, $location, catalogService) {
  var vm = this;
  vm.title = "Book Catalog";
  catalogService.getBooks.then(function(bookData) {
    vm.bookList = bookData.data;
  }, function(err) {
    console.log(err);
  });


  vm.deleteBook = function(id) {
    catalogService.deleteBook(id).then(function() {
      console.log('Deleted!');
    }, function(err) {
      console.log(err);
    });

  };
  // vm.editBookRoute = $location.path('/edit');
  vm.editBook = function(id) {
    var editObj = {
      bookName: 'Lord of the Rings'
    };
    catalogService.editBook(id, editObj).then(function(data) {
      console.log(data.data[0].id);
      console.log(editObj);
      var orgId = data.data[0].id;
    }, function(err) {
      console.log('ERROR: ' + err);
    });
  };
}

function bookDetailsController($routeParams, catalogService) {
  var vm = this;
  var id = parseInt($routeParams.bookId);
  catalogService.getBookDetails(id).then(function(data) {
    vm.details = data.data[0];
    // console.log(data);
  }, function(err) {
    console.log('ERROR: ' + err);
  });
}

function newBookController(catalogService) {
  var vm = this;
  vm.pageTitle = 'Add a new book';

  vm.submitBook = function () {
    var bookObj = {
      bookName: vm.titleInput,
      author: vm.authorInput,
      bookDescription: vm.descriptionInput,
      imageUrl: vm.imageInput
    };

    catalogService.postNewBook(bookObj).then(function(data) {
      console.log(data);
    }, function(err) {
      console.log('ERROR: ' + err);
    });
  };
}

function userController($http, $window) {
  var vm = this;
  // vm.user = {
  //   username: 'john.doe',
  //   password: 'foobar'
  // };
  vm.message = '';
  vm.submit = function() {
    console.log(vm.user);
    $http
      .post('http://localhost:3000/auth/', vm.user)
      .success(function(data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        vm.message = 'Welcome!';
      })
      .error(function(data, status, headers, config) {
        //Erase token if the user fails to login
        delete $window.sessionStorage.token;
        vm.message = 'Error: Invalid username or password';
      });
  };

  vm.restrictedList = function() {
    $http
      .get('http://localhost:3000/api/restricted/')
      .success(function(data, status, headers, config) {
        console.log(data.name);
      });
  };
}
