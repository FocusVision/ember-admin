import { Factory, faker } from 'ember-cli-mirage'

const {
  random: { arrayElement }
} = faker

export default Factory.extend({
  name: () => arrayElement(['ball', 'mouse', 'bell'])
})
