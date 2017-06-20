import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | column actions relationship', function() {
  setupComponentTest('column-actions-relationship', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#column-actions-relationship}}
    //     template content
    //   {{/column-actions-relationship}}
    // `);

    this.render(hbs`{{column-actions-relationship}}`);
    expect(this.$()).to.have.length(1);
  });
});
