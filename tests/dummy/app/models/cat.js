import DS from 'ember-data'
import AdminModelMixin from 'ember-admin/mixins/admin-model-mixin'

const {
  attr,
  hasMany,
  belongsTo,
  Model
} = DS

export default Model.extend(AdminModelMixin, {
  name: attr('string'),
  age: attr('number'),
  fleas: attr('boolean', { default: false }),
  bar: attr('string'),
  baz: attr('string'),

  toys: hasMany('toy', { inverse: 'cat' }),
  owner: belongsTo('owner', { inverse: 'cats' })
})
