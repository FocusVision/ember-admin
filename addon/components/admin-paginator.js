import Ember from 'ember'
import layout from '../templates/components/admin-paginator'

const {
  Component,
  computed,
  computed: { equal }
} = Ember

export default Component.extend({
  layout,
  classNames: ['admin-paginator'],

  page: null,
  _page: computed('page', function() {
    return this.get('page') || 1
  }),
  pageCount: null,
  _pageCount: computed('pageCount', function() {
    return this.get('pageCount') || 1
  }),

  updatePage() {},

  disableNext: computed('_page', '_pageCount', function() {
    return this.get('_page') >= this.get('_pageCount')
  }),

  disablePrevious: equal('_page', 1),

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
