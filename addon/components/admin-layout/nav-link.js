import Ember from 'ember'
import layout from '../../templates/components/admin-layout/nav-link'

const {
  Component,
  computed,
  String: { pluralize, capitalize }
} = Ember

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['admin-layout-nav-link'],
  dataTest: computed(function() {
    return `models-list-item-${this.get('name')}`
  }),
  formattedName: computed('name', function() {
    return capitalize(pluralize(this.get('name')))
  })
})
