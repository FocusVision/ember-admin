import Ember from 'ember'
import layout from '../../templates/components/admin-layout/tabs'

const {
  Component
} = Ember

export default Component.extend({
  layout,
  tagName: 'ul',
  classNames: ['admin-layout-tabs']
})
