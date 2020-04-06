// storage controller
const StorageCtrl = (function() {
  return {
    storeItem: function(item) {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        items = JSON.parse(localStorage.getItem('items')); // v ls pouze string => převod na objekt
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
      }
    }, 
    getItemsFromStorage: function() {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
        } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateItemStorage: function(updateItem) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index) {
        if (updateItem.id === item.id) {
          items.splice(index, 1, updateItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteItemFromStorage: function(id) {
      let items = JSON.parse(localStorage.getItem('items'));
      items.forEach(function(item, index) {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearItemsFromStorage: function() {
      localStorage.removeItem('items');
    }
  }
}) ();

// item controller
const ItemCtrl = (function(){
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  }
  const data = {
    items: StorageCtrl.getItemsFromStorage(), 
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
      getItemById: function(id) {
        let found = null;
        data.items.forEach(function(item) {
          if (item.id === id) {
            found = item;
          }
        });
        return found;
      },
      updateItem: function(name, calories) {
        calories = parseInt(calories);
        let found = null;
        data.items.forEach(function(item){
          if (item.id === data.currentItem.id) {
            item.name = name;
            item.calories = calories;
            found = item;
          }
        });
        return found;
      },
      deleteItem: function(id) {
        const ids = data.items.map(function(item) { // get ids
          return item.id;
        });
        const index = ids.indexOf(id); // get index
        data.items.splice(index, 1); //remove item
      },
      clearAllItems: function() {
        data.items = [];
      },
      setCurrentItem: function(item) {
        data.currentItem = item;
      },
      getCurrentItem: function() {
        return data.currentItem;
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
    totalCalories: '.total-calories',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    listItems: '#item-list li', 
    clearBtn: '.clear-btn'
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
    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems); // turn node list to array
      listItems.forEach(function(listItem) {
        const itemID = listItem.getAttribute('id');
        if (itemID === `item-${item.id}`) {
          document.querySelector(`#${itemID}`).innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Kcal</em>
        <a href="#" class="secondary-content"><i class="edit-item fa fa-pencil"></i>
        </a>`;
        }
      })
    },
    deleteListItem: function(id) {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    removeItems: function() {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      listItems = Array.from(listItems); // turn to array
      listItems.forEach(function(item) {
        item.remove();
      })
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalCal: function(totalCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
      document.querySelector(UISelectors.addBtn).style.display = 'none';
    },
    getSelectors: function() {
      return UISelectors;
    }
  }
})();

// app controller
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl){
  // console.log(ItemCtrl.logData());
  const loadEventListeners = function() { // load event listeners
    const UISelectors = UICtrl.getSelectors(); // get ui selector
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    document.addEventListener('keypress', function(e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    }); // bloknutí enteru
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
  } 
  const itemAddSubmit = function(e) { //add item submit
    const input = UICtrl.getItemInput();
    if(input.name !== '' && input.calories !== '') {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UICtrl.addListItem(newItem); //add item to ui list
      const totalCalories = ItemCtrl.getTotalCal(); // get total calories
      UICtrl.showTotalCal(totalCalories);// add total cal to ui
      StorageCtrl.storeItem(newItem); // store in local storage
      UICtrl.clearInput(); //clear fields
    }
    e.preventDefault();
  }

  const itemEditClick = function(e) {
    if (e.target.classList.contains('edit-item')) { // only clicking on edit icon
      const listId = e.target.parentNode.parentNode.id;// get list item id
      const listIdArr = listId.split('-'); // rozdělí item-0 na array
      const id = parseInt(listIdArr[1]);
      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit); // set current item
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  }
    const itemUpdateSubmit = function(e) {
      const input = UICtrl.getItemInput();
      const updateItem = ItemCtrl.updateItem(input.name, input.calories);
      UICtrl.updateListItem(updateItem);
      const totalCalories = ItemCtrl.getTotalCal(); // get total calories
      UICtrl.showTotalCal(totalCalories);
      StorageCtrl.updateItemStorage(updateItem)
      UICtrl.clearEditState();

      e.preventDefault();
    }

    const itemDeleteSubmit = function(e) {
      const currentItem = ItemCtrl.getCurrentItem(); // get current item
      ItemCtrl.deleteItem(currentItem.id); // delete from data structure
      UICtrl.deleteListItem(currentItem.id); //delete from UI
      const totalCalories = ItemCtrl.getTotalCal(); // get total calories
      UICtrl.showTotalCal(totalCalories);
      StorageCtrl.deleteItemFromStorage(currentItem.id);
      UICtrl.clearEditState();

      e.preventDefault();
    }
    
    const clearAllItemsClick = function(e) {
      ItemCtrl.clearAllItems();
      const totalCalories = ItemCtrl.getTotalCal(); // get total calories
      UICtrl.showTotalCal(totalCalories);
      UICtrl.removeItems();
      StorageCtrl.clearItemsFromStorage();
      UICtrl.clearEditState();
      UICtrl.hideList();
    }

  return {
    init: function() {
      UICtrl.clearEditState();
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
})(ItemCtrl, StorageCtrl, UICtrl);

// init app
AppCtrl.init();