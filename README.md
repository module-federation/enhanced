# RFC for Enhanced Federation Plugin API

## Idea

Webpack Federation can do quite a lot, but orchestrating it can sometimes be a little messy or complex with its given api. The idea is to offer some additonal lifecycles directly on webpack interfaces to allow for pluggability and a more standardized ecosystem 



# Remotes

```js
new ModuleFederationPlugin({
  remotes: {
    app1: {
      middleware: [
        (importValue)=> {
        return getEnvVars() // async promise that injects env vars into document before webpack attempts to connect remote
        },
        (importValue) => {
         if(window.remoteOverrides['app1']) {
           // if an override exists, change the script that will be injected. 
           return window.remoteOverrides['app1'] // --> otherRemote@http://otherUrl
         } else {
           return importValue // do nothing
         }
        }
      ],
      onBeforeGet: [
        async (container)=>{
         await container.get('./sentry-hub-register'); // load an exposed module before responding to the desired get request in the codebase
        },
        async (container,request)=> {
          const allowed = await checkIfAllowed();
          if(allowed) {
            return request // import("app1/admin") would have a request of "./admin"
          } else {
            return './not-authorized'
          }
        }
      ]
      import: 'app1@http',
      remoteType: "var" // standard webpack feature
    }
  }
});
```

## Middleware
`promise new Promise` is handy, but it would be great if one could compose a series of middlewares into the promise chain in a standard manner.
This would be useful for
- controling versions/overrides at runtime
- injecting env variables before webpack connects the containers together
- doing some series of actions during the initial import() for a remote that only happens once - prior to a remote being injected
- additional security or auth gates without having to write wrapper code around your exposed modules. 

## onBeforeGet
The lifecycle of federation is as follows. 
1) inject remote (happens once)
2) init() remote (happens once)
3) get() exposed module (happens for every import)


After middleware has been run, and the remote container injected into the application, and has initialized. 

Sometimes i might want to do something before calling the underlaying get() of a container. perhaps re-route the module request, or set up distributed logging automatically before import() resolves and starts executing. 

onBeforeGet is basically middleware but for the module import itself instead of container injection



# Got ideas? Open a issue
