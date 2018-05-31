import Vue from "vue"
import App from "./App"

Vue.config.productionTip = false

// Import BootstrapVue and associated files
import BootstrapVue from "bootstrap-vue"
Vue.use(BootstrapVue)
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

// Add vue-scrollto
var VueScrollTo = require("vue-scrollto")
Vue.use(VueScrollTo)

// Add api, use with this.$api in components
import * as api from "./api"
Vue.prototype.$api = api

var _ = require("lodash")

new Vue({
  el: "#app",
  components: { App },
  data: {
    mapping: {
      // TODO: - Differenciate between AND (memberSet) and OR (memberChoice) in jskos.to
      add(concept, scheme, isLeft=true) {
        if (this.checkScheme(scheme, isLeft)) {
          this.jskos[this._fromToScheme(isLeft)] = scheme
        } else {
          return false
        }
        if (this.added(concept, isLeft)) {
          return false
        }
        let fromTo = this._fromTo(isLeft)
        if (fromTo == "from" && this.jskos.from.memberSet.length != 0) {
          this.jskos.from.memberSet = [concept]
          return true
        }
        this.jskos[fromTo].memberSet.push(concept)
        return true
      },
      remove(concept, isLeft=true) {
        let fromTo = this._fromTo(isLeft)
        let indexConcept = _.findIndex(this.jskos[fromTo].memberSet, function(c) {
          return c.uri == concept.uri
        })
        if (indexConcept == -1) {
          return false
        }
        this.jskos[fromTo].memberSet.splice(indexConcept, 1)
        if (this.jskos[fromTo].memberSet.length == 0) {
          this.jskos[this._fromToScheme(isLeft)] = null
        }
        return true
      },
      added(concept, isLeft=true) {
        let fromTo = this._fromTo(isLeft)
        let indexConcept = _.findIndex(this.jskos[fromTo].memberSet, function(c) {
          return c.uri == concept.uri
        })
        if (indexConcept == -1) {
          return false
        } else {
          return true
        }
      },
      checkScheme(scheme, isLeft=true) {
        let actualScheme = this.getScheme(isLeft)
        return actualScheme == null ? true : actualScheme.uri == scheme.uri
      },
      getConcepts(isLeft) {
        return this.jskos[this._fromTo(isLeft)].memberSet
      },
      getScheme(isLeft) {
        return this.jskos[this._fromToScheme(isLeft)]
      },
      reverse() {
        if (!this.reversible()) {
          return false
        }
        this.reversed = !this.reversed;
        [this.jskos.to, this.jskos.from] = [this.jskos.from, this.jskos.to];
        [this.jskos.toScheme, this.jskos.fromScheme] = [this.jskos.fromScheme, this.jskos.toScheme]
        return true
      },
      reversible() {
        return this.jskos.to.memberSet.length <= 1
      },
      _fromTo(isLeft=true) {
        if (isLeft ? !this.reversed : this.reversed) {
          return "from"
        } else {
          return "to"
        }
      },
      _fromToScheme(isLeft=true) {
        return this._fromTo(isLeft) + "Scheme"
      },
      jskos: {
        from: { "memberSet": [] },
        to: { "memberSet": [] },
        fromScheme: null,
        toScheme: null,
      },
      reversed: false
    }
  },
  template: "<App/>"
})
