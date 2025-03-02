(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController).
service('MenuSearchService', MenuSearchService).
directive('foundItems', FoundItemsDirective).
constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"); 

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
  var list = this;

  list.isEmpty = function () {
    return list.items.length === 0;
  };
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.found = [];
  menu.error = false;

  menu.getMatchedMenuItems = function () {
    if (menu.searchTerm === "") {
      menu.found = [];
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    promise.then(function (response) {
      menu.found = response;
      menu.error = menu.found.length === 0;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  menu.onRemove = function (itemIndex) {
    menu.found.splice(itemIndex, 1);

    if (menu.found.length === 0) {
      menu.error = true;
    }
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ApiBasePath
    }).then(function (result) {
      var allCategories = result.data;
      var allItems = Object.values(allCategories);
      var foundItems = [];

      allItems.forEach(function (category) {
        var items = category.menu_items;
        items.forEach(function (item) {
          if (item.description.toLowerCase().indexOf(searchTerm) !== -1) {
            foundItems.push(item);
          }
        });
      });
      
      return foundItems;
    });
  };

  service.onRemove = function (itemIndex) {
    service.found.splice(itemIndex, 1);
  };
}

})();
