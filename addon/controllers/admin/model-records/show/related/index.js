import Ember from 'ember'
import IndexControllerMixin
  from 'ember-admin/mixins/model-records/index-controller-mixin'

const {
  Controller,
  computed,
  computed: { alias },
  String: { singularize }
} = Ember

export default Controller.extend(IndexControllerMixin)
