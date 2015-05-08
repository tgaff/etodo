import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    editTodo: function() {
      this.set('isEditing', true);
      console.log("executed editTodo");
    },
    acceptChanges: function() {
      //Remove is editing property
      this.set('isEditing', false);

      // If the todo is empty, reset it
      // otherwise save it
      if(Ember.isEmpty(this.get('model.title'))) {
        // I tried using this value
        //origTitle = this.store.getById('todo',thisID).get('title');
        //this.set('title', origTitle);
        // but it seems our cache of the model
        // is instantly updated by ember.  Thanks, ember, I think.
        // rollback(); works though.
        this.get('model').rollback();
      } else {
        console.log('save[' + this.get('model.title') + ']');
        this.get('model').save();
      }
    },
    removeTodo: function() {
      var todo = this.get('model');
      todo.deleteRecord();
      todo.save();
    }
  }
});
