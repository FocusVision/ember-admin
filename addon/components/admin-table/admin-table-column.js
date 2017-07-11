import Ember from 'ember'

const {
  Component
} = Ember

export default Component.extend({
  tagName: '',

  component: null,
  formatter: null,
  key: null,

  table: null,

  init(...args) {
    this._super(...args)

    this.get('table').registerColumn(this)
  },

  willDestroyElement(...args) {
    this._super(...args)

    this.get('table').unregisterColumn(this)
  }
})
