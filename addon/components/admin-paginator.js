import Ember from 'ember';
import layout from '../templates/components/admin-paginator'

const {
  Component,
  computed,
  computed: { gt }
} = Ember

export default Ember.Component.extend({
  layout,

  page: null, // passed in
  pageCount: null, // passed in

  hasNext: computed('page', 'pageCount', function() {
    return this.get('page') < this.get('pageCount')
  }),

  hasPrevious: gt('page', 1),

  actions: {
    next(page) {
      this.set('page', page + 1)
    },

    previous(page) {
      this.set('page', page - 1)
    },
    
    to(page) {
      this.set('page', page)
    }
  }
})
