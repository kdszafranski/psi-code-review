myApp.controller('shelfController', ['$http', '$location', function($http, $location) {
  console.log('shelfController loaded');
    var vm = this;

  vm.getItems = function(){
    $http({
      method: 'GET',
      url: '/shelf'
    }).then(function(response){
      console.log('back from server GET request with:', response);
      console.log('response.data-->', response.data);
      vm.allItems = response.data;
    });
  };

  vm.getItems();

  vm.addShelfItem = function(userName){
       var objectToSend = {
         description: vm.descriptionIn,
         imgUrl: vm.imgUrlIn,
         userName: userName
       };
       console.log("in objectToSend-->", objectToSend);
       $http ({
         method: 'POST',
         url: '/shelf',
         data: objectToSend
       }).then(function(response){
         console.log('back from server after POST:', response);
         vm.getItems();
       });
  };//end addShelfItem func



vm.deleteItem = function (id){
  $http({
    method: 'DELETE',
    url: '/shelf/'+ id
  }).then(function(response){
    console.log("Item deleted:", response);
    vm.getItems();
  });
};


}]);//end shelfController
