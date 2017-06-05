import {
  create,
  collection,
  visitable,
  text,
  clickable,
  fillable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin'),
  visitCats: visitable('/admin/cat'),
  visitCatEdit: visitable('/admin/cat/:cat_id/edit'),

  modelLinks: text('a', {
    multiple: true
  }),

  cats: collection({
    itemScope: '.cat table tr',
    item: {
      id: text('td', { at: 0 }),
      name: text('td', { at: 1 }),
      age: text('td', { at: 2 })
    }
  }),

  filterBy: fillable('input[data-test=filter-input]'),
  fillInName: fillable('input[data-test=edit-input-name]'),
  fillInAge: fillable('input[data-test=edit-input-age]'),

  clickModelTypeCat: clickable('a[data-test=models-list-item-cat]'),
  clickFirstCatRecord: clickable('a[data-test=record-list-item]', {
    at: 0
  }),
  clickSave: clickable('button[data-test=button-save]'),
  clickDelete: clickable('button[data-test=button-delete]'),
  clickCreate: clickable('a[data-test=button-create]')
});
