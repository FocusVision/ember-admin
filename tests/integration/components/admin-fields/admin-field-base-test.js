import { expect } from 'chai'
import { context, describe, it, beforeEach } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { fillIn } from 'ember-native-dom-helpers'

describe('Integration | Component | admin fields/admin field base', function() {
  setupComponentTest('admin-fields/admin-field-base', {
    integration: true
  })

  beforeEach(function() {
    this.set('model', Ember.Object.create({
      name: 'Mr. T',
      hasBling: true
    }))
    this.set('onFieldUpdate', () => {})
  })

  context('if type is `string`', function() {
    it('has initial value', function() {
      this.set('column', { key: 'name', type: 'string' })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(this.$('input').val()).to.be.equal('Mr. T')
    })

    it('updates model attr on update', async function() {
      this.set('column', { key: 'name', type: 'string' })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)
      await fillIn('input', 'Mrs. T')

      expect(this.get('model.name')).to.equal('Mrs. T')
    })
  })

  context('if type is `boolean`', function() {
    it('has initial value', function() {
      this.set('column', { key: 'hasBling', type: 'boolean' })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(this.$('input').val()).to.be.equal(true)
    })

    it('updates model attr on update', async function() {
      this.set('column', { key: 'hasBling', type: 'boolean' })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)
      await fillIn('input', 'Mrs. T')

      expect(this.get('model.name')).to.equal('Mrs. T')
    })
  })
})
