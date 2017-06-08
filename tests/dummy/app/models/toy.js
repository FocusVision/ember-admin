import DS from 'ember-data'
import HasManyQuery from 'ember-data-has-many-query'

const {
  attr,
  belongsTo,
  Model
} = DS
const { ModelMixin } = HasManyQuery

export default Model.extend(ModelMixin, {
  name: attr('string'),
  cat: belongsTo('cat', { async: true })
})
