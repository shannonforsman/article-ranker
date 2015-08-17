var app = angular.module("redditApp", ['angularMoment']);
  app.run(function(amMoment) {
    amMoment.changeLocale('de');
});

app.controller("RedditInfoController", function($scope, $http){

  $http.get('http://localhost:3000/articles').
  then(function(response) {
    $scope.list = response.data
  }, function(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
  // $scope.list = JSON.parse(localStorage.getItem('list')) || []
  $scope.votes = 0
  $scope.upVote = function(id) {
    // $scope.list[id].votes ++

    $http.put('http://localhost:3000/articles', {'id': id, 'upvote': true}).
    then(function(response) {
      console.log(response.data)
      $scope.list[id] = response.data
    })
    // var listArr = JSON.parse(localStorage.getItem('list')) || []
    // listArr[id].votes ++
    // localStorage.setItem('list', JSON.stringify(listArr));
  }
  $scope.downVote = function(id) {

    $http.put('http://localhost:3000/articles', {'id': id, 'upvote': false}).
    then(function(response) {
      $scope.list[id] = response.data
    })
    // $scope.list[id].votes --
    // var listArr = JSON.parse(localStorage.getItem('list')) || []
    // listArr[id].votes --
    // localStorage.setItem('list', JSON.stringify(listArr));
  }
  $scope.submit = function(title, author, imgUrl, description) {
    var obj = {}
    $scope.showDetails = ! $scope.showDetails
    obj['title'] = title
    obj['author'] = author
    obj['imgUrl'] = imgUrl
    obj['description'] = description
    obj['date'] = new Date()
    obj['votes'] = 0
    obj['id'] = $scope.list.length
    obj['comments'] = []

    $http.post('http://localhost:3000/articles', obj).
    then(function(response) {
      $scope.list = response.data
    }, function(response) {

    });
    // $scope.list.push(obj)
    // var listObj = JSON.parse(localStorage.getItem('list')) || []
    // listObj.push(obj)
    // localStorage.setItem('list', JSON.stringify(listObj));
  }
  $scope.commentSubmit = function(author, text, id, post) {
    var obj = {}
    post.addComment = ! post.addComment
    obj['author'] = author
    obj['text'] = text

    // $scope.list[id].comments.push(obj)

    $http.put('http://localhost:3000/comments', {'id': id, 'comments': obj}).
    then(function(response) {
      console.log(response)
      $scope.list[id] = response.data// $scope.list[id] = response.data
    })
    // var listObj = JSON.parse(localStorage.getItem('list')) || []
    // listObj[id].comments.push(obj)
    // localStorage.setItem('list', JSON.stringify(listObj));
  }
  // $scope.display = function() {
  //   angular.element('#addPost').toggleClass('hi')
  // }

})
