import Ember from 'ember'
import layout from '../../templates/components/admin-layout/tabs-link'

const {
  Component
} = Ember

export default Component.extend({
  layout,
  tagName: 'li',
  classNames: ['admin-layout-tabs-link']
})
