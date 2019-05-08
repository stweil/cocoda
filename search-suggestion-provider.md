


Provider for search suggestions.

The registry entry requires the `searchUris` property which has to be an object with registry URIs (e.g. DANTE) as keys and search URLs as values. Right now, the /search endpoint in DANTE/jskos-server is supported (taking `query` and `voc` as URL parameters and returning an array of JSKOS concepts).



⇒ [source](https://github.com/gbv/cocoda/tree/dev/src/providers/search-suggestion-provider.js)