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
      this.set('column', { key: 'name', type: 'string', disabled: false })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(this.$('input').val()).to.be.equal('Mr. T')
    })

    it('disabled columns disable the input', async function() {
      this.set('column', { key: 'name', type: 'string', disabled: true })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(this.$('input').attr('disabled')).to.be.ok
    })

    it('updates model attr on update', async function() {
      this.set('column', { key: 'name', type: 'string', disabled: false })

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
    it('is unchecked if unset', function() {
      this.set('column', { key: 'hasBling', type: 'boolean', disabled: false })
      this.set('model.hasBling', null)

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(
        this.$('input[type=checkbox]:checked').length
      ).to.not.be.ok
    })

    it('is checked if true', function() {
      this.set('column', { key: 'hasBling', type: 'boolean', disabled: false })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(
        this.$('input[type=checkbox]:checked').length
      ).to.be.ok
    })

    it('is unchecked value if false', function() {
      this.set('column', { key: 'hasBling', type: 'boolean', disabled: false })
      this.set('model.hasBling', false)

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(
        this.$('input[type=checkbox]:checked').length
      ).to.not.be.ok
    })

    it('updates model attr on select', async function() {
      this.set('column', { key: 'hasBling', type: 'boolean', disabled: false })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      await this.$('input[type=checkbox]').trigger('click')

      expect(this.get('model.hasBling')).to.equal(false)
    })

    it('disabled columns disable checkbox', function() {
      this.set('column', { key: 'hasBling', type: 'boolean', disabled: true })

      this.render(hbs`
        {{admin-fields/admin-field-base
          column=column
          model=model
          onUpdate=(action onFieldUpdate)
        }}
      `)

      expect(
        this.$('input[type=checkbox]:disabled').length
      ).to.be.ok
    })
  })
})
