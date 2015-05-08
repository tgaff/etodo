import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    // we have to tell the store which model (todo) and then we
    // write a filter that operates on the isCompleted property
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },
  renderTemplate: function(controller) {
    this.render('todos.index', {controller: controller});
  }
});
