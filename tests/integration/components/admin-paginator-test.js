import { expect } from 'chai'
import { describe, it } from 'mocha'
import { setupComponentTest } from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describe('Integration | Component | admin paginator', () => {
  setupComponentTest('admin-paginator', {
    integration: true
  })
  it('renders', function() {
    this.render(hbs`{{admin-paginator}}`)
    expect(this.$()).to.have.length(1)
  })
})
