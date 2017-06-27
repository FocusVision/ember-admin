import Ember from 'ember'
import layout from 'ember-admin/templates/components/admin-relationship-select'

const {
  Component,
  computed,
  computed: { gt },
  run: { debounce },
  inject: { service },
  A
} = Ember

export default Component.extend({
  admin: service(),

  timeout: 500,
  termLengthThreshold: 3,

  term: '',
  results: computed(() => A()),
  placeholder: computed(function() {
    return `Search by ${this.get('recordType')}`
  }),

  hasResults: gt('results.length', 0),

  onInput(term) {
    this.set('term', term)

    if (term.length >= this.termLengthThreshold) {
      this.get('admin.store').query(
        this.get('recordType'),
        { 'filter[keyword]': this.get('term') }
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
