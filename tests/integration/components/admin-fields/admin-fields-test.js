import Ember from 'ember'
import { expect } from 'chai'
import { context, describe, it, beforeEach } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { fillIn } from 'ember-native-dom-helpers'

describe('Integration | Component | admin fields/admin fields', () => {
  setupComponentTest('admin-fields/admin-fields', {
    integration: true
  })

  beforeEach(function() {
    this.set('model', Ember.Object.create({
      name: 'Mr. T',
      hasBling: true
    }))
    this.set('onFieldUpdate', () => {})
  })

  context('if type is `string`', () => {
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

  context('if type is `boolean`', () => {
    it('has initial value if unset', function() {
      this.set('column', { key: 'hasBling', type: 'boolean' })
      this.set('model.hasBling', null)

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(
        this.$('select option:selected'
      ).text().trim()).to.be.equal('Select')
    })

    it('has initial value if true', function() {
      this.set('column', { key: 'hasBling', type: 'boolean' })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(this.$('select').val()).to.be.equal('true')
      expect(this.$('select option:selected').text().trim()).to.be.equal('true')
    })

    it('has initial value if false', function() {
      this.set('column', { key: 'hasBling', type: 'boolean' })
      this.set('model.hasBling', false)

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(this.$('select').val()).to.be.equal('false')
      expect(
        this.$('select option:selected'
      ).text().trim()).to.be.equal('false')
    })

    it('updates model attr on select', async function() {
      this.set('column', { key: 'hasBling', type: 'boolean' })
      this.set('onFieldUpdate', (key, val) => {
        expect(key).to.equal('hasBling')
        expect(val).to.equal(false)
      })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      await this.$('select[data-test=admin-field-boolean]')
        .val('false').trigger('change')
    })
  })
})
