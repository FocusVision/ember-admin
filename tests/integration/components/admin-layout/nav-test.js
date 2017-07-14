import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin layout/nav', () => {
  setupComponentTest('admin-layout/nav', {
    integration: true
  })

  it('renders', function() {
    this.render(hbs`{{admin-layout/nav}}`)
    expect(this.$()).to.have.length(1)
  })
})
