import Ember from 'ember'

const {
  Mixin
} = Ember

export default Mixin.create({
  queryParams: {
    filter: { refreshModel: true },
    page: { refreshModel: true },
    size: { refreshModel: true }
  }
})
