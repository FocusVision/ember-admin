import Ember from 'ember'

const {
  Mixin
} = Ember

export default Mixin.create({
  queryParams: ['filter', 'page', 'size'],
  filter: null,
  page: 1,
  size: 30
})
