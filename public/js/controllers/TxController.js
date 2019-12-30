angular.module('BlocksApp').controller('TxController', function($stateParams, $rootScope, $scope, $http, $location) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });

    $rootScope.$state.current.data["pageSubTitle"] = $stateParams.hash;
    $scope.hash = $stateParams.hash;
    $scope.tx = {"hash": $scope.hash};

    //fetch web3 stuff
    var isTransfer = false;
    if($location.$$search && $location.$$search.isTransfer)
      isTransfer = true;
    $http({
      method: 'POST',
      url: '/api/txByHash',
      data: {"hash": $scope.hash}
    }).success(function(data) {
      console.log("data--",data)
      $scope.tx = data.resp;
      // $scope.isTransfer = false;
      // if (data.timestamp)
      //   $scope.tx.datetime = new Date(data.timestamp*1000); 
      // if (data.isTrace) // Get internal txs
      //   //fetchInternalTxs();
      //   $scope.logs=[];
      //   $scope.getLogs();
    });

   

    $scope.getLogs = function() {
      if($scope.logs){
        return;
      }
      $http({
        method: 'POST',
        url: '/eventLog',
        data: {"txHash": $scope.hash}
      }).success(function(data) {
        $scope.logs = data;
        // for(var i=0; i<$scope.logs.length; i++){
        //   $scope.logs[i].params = splitParam($scope.logs[i].to);
        // }
        
      });      
    }

    
})
