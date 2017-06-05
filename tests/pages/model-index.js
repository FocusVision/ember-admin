import {
  create,
  visitable,
  text,
  clickable,
  fillable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin'),
  visitCats: visitable('/admin/cat'),

  modelLinks: text('a', {
    multiple: true
  }),

  filterBy: fillable('input[data-test=filter-input]'),
  fillInName: fillable('input[data-test=edit-input-name]'),
  fillInAge: fillable('input[data-test=edit-input-age]'),

  clickModelTypeCat: clickable('a[data-test=models-list-item-cat]'),
  clickFirstCatRecord: clickable('a[data-test=record-list-item]', {
    at: 0
  }),
  clickSave: clickable('button[data-test=button-save]'),
  clickCreate: clickable('a[data-test=button-create]')
});
