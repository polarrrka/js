// storage controller

// item controller
const ItemCtrl = (function(){
  const Item = function(id, name, calories) {
    this.id = id;
    this.name= name;
    this.calories = calories;
  }
  const data = {
    items: [
      {id: 0, name: 'steak dinner', calories: 1200}, 
      {id: 1, name: 'cookie', calories: 400}, 
      {id: 2, name: 'muffiny', calories: 500}
    ],
    currentItem: null, 
    totalCalories: 0
  }
    return {
      logData: function() {
        return data;
      }
    }
})();

// UI controller
const UICtrl = (function(){

  return {
    
  }

})();

// app controller
const AppCtrl = (function(ItemCtrl, UICtrl){
  // console.log(ItemCtrl.logData());

  return {
    init: function() {
      console.log('initializing app...')
    }
  }

})(ItemCtrl, UICtrl);

// init app
AppCtrl.init();