import { belongsTo, hasMany, Model } from 'ember-cli-mirage'

export default Model.extend({
  owner: belongsTo('owner'),
  toys: hasMany('toy')
})
