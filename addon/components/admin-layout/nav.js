import Ember from 'ember'
import layout from '../../templates/components/admin-layout/nav'

const {
  Component
} = Ember

export default Component.extend({
  layout,
  tagName: 'nav',
  classNames: ['admin-layout-nav']
})
