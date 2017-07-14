import Ember from 'ember';
import layout from '../templates/components/admin-paginator'

const {
  Component,
  computed,
  computed: { equal }
} = Ember

export default Ember.Component.extend({
  layout,
  classNames: ['admin-paginator'],

  page: null,
  pageCount: null,

  updatePage() {},

  disableNext: computed('page', 'pageCount', function() {
    return this.get('page') >= this.get('pageCount')
  }),

  disablePrevious: equal('page', 1),

  actions: {
    next(page) {
      this.updatePage(page + 1)
    },

    previous(page) {
      this.updatePage(page - 1)
    },

    to(page) {
      this.updatePage(page)
    }
  }
})
