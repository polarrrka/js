// storage controller

// item controller
const ItemCtrl = (function(){
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  const data = {
    items: [
    /*{id: 0, name: 'steak dinner', calories: 1200}, 
      {id: 1, name: 'cookie', calories: 400}, 
      {id: 2, name: 'muffiny', calories: 500} */
    ], 
    currentItem: null, 
    totalCalories: 0
  }
    return {
      getItems: function() {
        return data.items;
      },
      addItem: function(name, calories) {
        let ID; //create ID
        if (data.items.length > 0) {
          ID = data.items[data.items.length - 1].id + 1;
        } else {
          ID = 0;
        }
        calories = parseInt(calories); // kcal to number
        newItem = new Item(ID, name, calories); // create new item
        data.items.push(newItem); // add items to array
       
        return newItem;
      },
      getTotalCal: function() {
        let total = 0;
        data.items.forEach(function(item) {
          total += item.calories;
        });
        data.totalCalories = total;
        return data.totalCalories;
      },
      logData: function() {
        return data;
      }
    }
})();

// UI controller
const UICtrl = (function(){
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories'
  }

  return {
    populateItemList: function(items) {
      let html = '';
      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
       </li>`;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html; //insert list items to html
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item) {
      document.querySelector(UISelectors.itemList).style.display = 'block';
      const li = document.createElement('li'); // create li element
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Kcal</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i>
        </a>`;
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li); //insert item
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCal: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();

// app controller
const AppCtrl = (function(ItemCtrl, UICtrl){
  // console.log(ItemCtrl.logData());
  const loadEventListeners = function() { // load event listeners
    const UISelectors = UICtrl.getSelectors(); // get ui selector
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
  
  } 
  const itemAddSubmit = function(e) { //add item submit
    const input = UICtrl.getItemInput();
    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem); //add item to ui list
      const totalCalories = ItemCtrl.getTotalCal(); // get total calories
      UICtrl.showTotalCal(totalCalories);// add total cal to ui
      UICtrl.clearInput(); //clear fields
    }
    e.preventDefault();
  }

  return {
    init: function() {
      const items = ItemCtrl.getItems(); // get items from data structure
      if (items.length === 0) { // check if any items
        UICtrl.hideList();
      } else {
        UICtrl.populateItemList(items);
      }
      const totalCalories = ItemCtrl.getTotalCal(); // get total calories
      UICtrl.showTotalCal(totalCalories);// add total cal to ui
      loadEventListeners(); //load event listeners
    }
  }
})(ItemCtrl, UICtrl);

// init app
AppCtrl.init();