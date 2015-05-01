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
    }
  }//,
  // we only `needs` here if we want to give access to todo controller
  // from this context.  So now it's accessible like:
  // action "editTodo" target="controllers.todo"
  //needs: ["todo"]
});
