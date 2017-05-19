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



vm.deleteItem = function (id, name){
  if(confirm("Are you sure you wanna delete this item?")) {
    $http({
      method: 'DELETE',
      url: '/shelf/'+ id + '/' + name,
      // url: '/shelf?thing=123&name=bob' // querystring example
    }).then(
      function(response){
        // if(response.status)
        console.log("Item deleted:", response);
        vm.getItems();
      },
      function(response) {
        // if(response.status == 403) {
        //
        // }
        console.log('response ', response);
        alert(response.data.message);
      });

  }
  };


}]);//end shelfController
