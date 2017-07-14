import { Model, hasMany, belongsTo } from 'ember-cli-mirage'

export default Model.extend({
  toys: hasMany('toy', { inverse: 'cat' }),
  owner: belongsTo('owner', { inverse: 'cats' })
})
