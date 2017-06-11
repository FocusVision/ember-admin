import Ember from 'ember'
import IndexControllerMixin
from 'ember-admin/mixins/model-records/index-controller-mixin'

const {
  computed: { alias },
  Controller,
  inject: { controller }
} = Ember

export default Controller.extend(IndexControllerMixin)
