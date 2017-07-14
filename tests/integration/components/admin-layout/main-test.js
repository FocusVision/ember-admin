import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin layout/main', () => {
  setupComponentTest('admin-layout/main', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{admin-layout/main}}`)
    expect(this.$()).to.have.length(1)
  })
})
