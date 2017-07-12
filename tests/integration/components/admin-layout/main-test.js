import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin layout/main', function() {
  setupComponentTest('admin-layout/main', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-layout/main}}
    //     template content
    //   {{/admin-layout/main}}
    // `);

    this.render(hbs`{{admin-layout/main}}`);
    expect(this.$()).to.have.length(1);
  });
});
