var app = angular.module("redditApp", ['angularMoment']);
  app.run(function(amMoment) {
    amMoment.changeLocale('de');
});

app.controller("RedditInfoController", function($scope){

  $scope.list = JSON.parse(localStorage.getItem('list')) || []
  $scope.votes = 0
  $scope.upVote = function(id) {
    $scope.list[id].votes ++
    var listArr = JSON.parse(localStorage.getItem('list')) || []
    listArr[id].votes ++
    localStorage.setItem('list', JSON.stringify(listArr));
  }
  $scope.downVote = function(id) {
    $scope.list[id].votes --
    var listArr = JSON.parse(localStorage.getItem('list')) || []
    listArr[id].votes --
    localStorage.setItem('list', JSON.stringify(listArr));
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
    $scope.list.push(obj)
    var listObj = JSON.parse(localStorage.getItem('list')) || []
    listObj.push(obj)
    localStorage.setItem('list', JSON.stringify(listObj));
  }
  $scope.commentSubmit = function(author, text, id, post) {
    var obj = {}
    post.addComment = ! post.addComment
    obj['author'] = author
    obj['text'] = text
    $scope.list[id].comments.push(obj)
    var listObj = JSON.parse(localStorage.getItem('list')) || []
    listObj[id].comments.push(obj)
    localStorage.setItem('list', JSON.stringify(listObj));
  }
  $scope.display = function() {
    angular.element('#addPost').toggleClass('hi')
  }
})
