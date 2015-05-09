import Ember from 'ember';

// from http://thetechcofounder.com/getting-started-with-ember-js-using-ember-cli/
//
// note that it may not actually be necessary to use ArrayController
// the original 'Controller' seemed to work fine
// TODO: figure out why
export default Ember.ArrayController.extend({
  actions: {
    createTodo: function(newTitle) {
      //Create the new Todo model
      var todo = this.store.createRecord('todo', {
        title: newTitle,
        isCompleted: false
      });

      // Clear the "New Todo" text field
      this.set('newTitle', '');

      // Save the new model
      todo.save();
    },
    clearCompleted: function() {
      //var completedCount = this.get('remaining');
      var allCompleted = this.filterBy('isCompleted', true);
      allCompleted.invoke('deleteRecord');
      allCompleted.invoke('save');
    }
  },
  remaining: function() {
    var allCompleted = this.filterBy('isCompleted', false);
    return allCompleted.get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    if (this.get('remaining') === 1) {
      return 'item';
    } else {
      return 'items';
    };
  }.property('remaining'),

  completedCount: function() {
    return this.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  allAreDone: function(key, value) {
    console.log("key: " + key + " value: " + value);
    if ( value === undefined ) {
      // the checkbox was not touched, this was triggered by property update
      return this.get('remaining') === 0 ? true : false;
    } else {
      this.setEach('isCompleted', value);  // mark each true/false
      this.invoke('save');  // save each
      return value;
    }
  }.property('remaining')
  //,
  // we only `needs` here if we want to give access to todo controller
  // from this context.  So now it's accessible like:
  // action "editTodo" target="controllers.todo"
  //needs: ["todo"]
});
