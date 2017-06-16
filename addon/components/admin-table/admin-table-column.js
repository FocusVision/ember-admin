import Ember from 'ember'

const {
  Component
} = Ember

export default Component.extend({
  tagName: '',

  component: null,
  formatter: null,
  key: null,

  registrar: null,

  init(...args) {
    this._super(...args)

    this.get('registrar').registerColumn(this)
  },

  willDestroyElement(...args) {
    this._super(...args)

    this.get('registrar').unregisterColumn(this)
  }
})
