import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-relationship-select'

const {
  Component,
  computed,
  computed: { notEmpty },
  run: { debounce },
  inject: { service },
  A
} = Ember

export default Component.extend({
  admin: service(),

  timeout: 500,
  termLengthThreshold: 3,

  term: '',
  results: A(),
  placeholder: computed(function() {
    return `Search by ${this.get('recordType')}`
  }),

  hasTerm: notEmpty('term'),

  onInput(term) {
    this.set('term', term)

    if (term.length >= this.termLengthThreshold) {
      this.get('admin.store').query(
        this.get('recordType'),
        { page: 1, size: 10, 'filter[keyword]': this.get('term') }
      ).then(results => this.set('results', results))
    }
  },

  actions: {
    searchTerm({ target: { value }}) {
      debounce(this, this.onInput, value, this.get('timeout'))
    }
  },

  layout
})
