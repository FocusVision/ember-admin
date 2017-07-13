import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describe('Integration | Component | admin layout/relationship header', function() {
  setupComponentTest('admin-layout/relationship-header', {
    integration: true
  });
  it('renders', function() {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });
    // Template block usage:
    // this.render(hbs`
    //   {{#admin-layout/relationship-header}}
    //     template content
    //   {{/admin-layout/relationship-header}}
    // `);

    this.render(hbs`{{admin-layout/relationship-header}}`);
    expect(this.$()).to.have.length(1);
  });
});
