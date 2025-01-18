(() => {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    const buy = this;
    buy.items = ShoppingListCheckOffService.getToBuyItems();
    buy.buyItem = (index) => {
      ShoppingListCheckOffService.buyItem(index);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    const bought = this;
    bought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    const service = this;
    const toBuyItems = [
      { name: "Carne", quantity: 10 },
      { name: "Cerveja", quantity: 5 },
      { name: "Linguiça", quantity: 3 },
      { name: "Pão", quantity: 15 },
      { name: "Refrigerante", quantity: 2 },
    ];
    const boughtItems = [];

    service.buyItem = (index) => {
      boughtItems.push(toBuyItems[index]);
      toBuyItems.splice(index, 1);
    };

    service.getToBuyItems = () => {
      return toBuyItems;
    };

    service.getBoughtItems = () => {
      return boughtItems;
    };
  }
})();
