angular.module('BlocksApp').controller('HomeController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });

    var URL = '/api/getBlockTxTps';

    $rootScope.isHome = true;

    $scope.reloadBlocks = function() {
      $scope.blockLoading = true;
      $http({
        method: 'POST',
        url: URL,
        data: {}
      }).success(function(data) {
        console.log("data:",data)
        $scope.blockLoading = false;
        $scope.latest_blocks = data.resp.blocks;

        //get latest data
        $scope.blockHeight = data.resp.blockHeight;
        $scope.blockTime = data.resp.blockTime;
        $scope.TPS = data.resp.TPS;
        $scope.meanDayRewards = data.resp.meanDayRewards;
      });

      todayRewards();
      totalNodes();
    }

    function todayRewards(){
      $http({
        method: 'POST',
        url: '/api/todayRewards',
        data: {}
      }).success(function(data) {
        console.log("todayRewards:",data.resp)
        $scope.todayRewards = data.resp;
      });
    }

    function totalNodes(){
      $http({
        method: 'POST',
        url: 'api/totalMasterNodes',
        data: {}
      }).success(function(data) {
        console.log("ddd--",data)
        $scope.totalNodes = data.resp;
      });
    }

    $scope.reloadTransactions = function() {
      $scope.txLoading = true;
      $http({
        method: 'POST',
        url: '/api/txList',
        data: {}
      }).success(function(data) {
        console.log("txList:",data)
        $scope.latest_txs = data.resp;
        $scope.txLoading = false;
      });  
    }

    $scope.reloadBlocks();
    $scope.reloadTransactions();
    $scope.txLoading = false;
    $scope.blockLoading = false;
})
.directive('summaryStats', function($http) {
  return {
    restrict: 'E',
    templateUrl: '/views/summary-stats.html',
    scope: true,
    link: function(scope, elem, attrs){
      scope.stats = {};

      var etcEthURL = "/stats";
      var etcPriceURL = "https://coinmarketcap-nexuist.rhcloud.com/api/etc";
      var ethPriceURL = "https://coinmarketcap-nexuist.rhcloud.com/api/eth"
      scope.stats.ethDiff = 1;
      scope.stats.ethHashrate = 1;
      scope.stats.usdEth = 1;


      
      $http.post(etcEthURL, {"action": "etceth"})
       .then(function(res){
          scope.stats.etcHashrate = res.data.etcHashrate;
          scope.stats.ethHashrate = res.data.ethHashrate;
          scope.stats.etcEthHash = res.data.etcEthHash;
          scope.stats.ethDiff = res.data.ethDiff;
          scope.stats.etcDiff = res.data.etcDiff;
          scope.stats.etcEthDiff = res.data.etcEthDiff;
        });
      $http.get(etcPriceURL)
       .then(function(res){
          scope.stats.usdEtc = res.data.price["usd"].toFixed(2);
          scope.stats.usdEtcEth = parseInt(100*scope.stats.usdEtc/scope.stats.usdEth);
        });
      $http.get(ethPriceURL)
       .then(function(res){
          scope.stats.usdEth = res.data.price["usd"].toFixed(2);
          scope.stats.usdEtcEth = parseInt(100*scope.stats.usdEtc/scope.stats.usdEth);
          scope.stats.ethChange = parseFloat(res.data.change);
        });

      }
  }
});

