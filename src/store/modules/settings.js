import localforage from "localforage"

const defaultSettings = {
  creator: "",
  creatorUrl: "",
  mappingBrowserAllSchemes: true,
  mappingBrowserOnlyLocal: false,
  mappingBrowserShowReverse: true,
  conceptDetailShowAllAncestors: false,
  conceptDetailDoNotTruncateNotes: false,
  mappingBrowserLocal: true,
  mappingBrowserProvider: {},
  mappingBrowserCatalog: true,
  mappingBrowserShowRegistry: {},
  minimized: {},
  flex: {},
  mappingBrowserShowAll: false,
  typesForSchemes: {},
  locale: "",
  autoInsertLabels: true,
  mappingEditorClearOnSave: true,
  favoriteSchemes: null,
}

// initial state
const state = {
  settings: defaultSettings,
  loaded: false,
}

// getters
const getters = {
  /**
   * Returns a creator object based on the local settings.
   */
  creator: (state) => {
    let language = state.settings.locale || "en"
    let creator = { prefLabel: { [language]: state.settings.creator || "" } }
    if (state.settings.creatorUrl) {
      creator.url = (state.settings.creatorUrl.startsWith("http") ? "" : "http://") + state.settings.creatorUrl
    }
    return creator
  }
}

// mutations
const mutations = {

  save(state, { settings }) {
    if (state.loaded) {
      state.settings = settings
      localforage.setItem("settings", settings)
    } else {
      console.warn("Tried to save settings before they were loaded.")
    }
  },

  set(state, { prop, value }) {
    if (state.loaded) {
      state.settings[prop] = value
      localforage.setItem("settings", state.settings)
    } else {
      console.warn("Tried to save settings before they were loaded.")
    }
  },

  loaded(state, { loaded = true }) {
    state.loaded = loaded
  }

}

// actions
const actions = {
  load({ commit }) {
    localforage.getItem("settings").then(settings => {
      let newSettings = Object.assign({}, defaultSettings, settings || {})
      commit({
        type: "loaded"
      })
      commit({
        type: "save",
        settings: newSettings
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
