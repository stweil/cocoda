


An empty provider as well as superclass for Cocoda Registry Providers.

The constructor sets the functionality object provider.has according to the provided registry object.

Extend this class like this:
```javascript
 class TestProvider extends BaseProvider {
   // override functions as needed
   // (usually it is recommended to only override the _ functions)
   // ...
 }
 TestProvider.providerName = "Test"
```
The providerName is necessary for the provider to be identified.



⇒ [source](https://github.com/gbv/cocoda/tree/dev/src/providers/base-provider.js)