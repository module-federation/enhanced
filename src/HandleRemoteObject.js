const defaultOnError = () => {
  const module = {
    get: () => () => {},
    init: () => () => {},
  };
  resolve(module);
};

const dynamicRemote = (remote) => {
  return `(resolve) => {
        const script = document.createElement("script");
        script.src = "${remote.url}";
        script.onload = () => {
          const module = {
            get: (request) => window["${remote.name}"].get(request),
            init: (arg) => {
              try {
                return window["${remote.name}"].init(arg);
              } catch (e) {
                console.log("Problem loading remote ${remote.name}", e);
              }
            },
          };
          resolve(module);
        };
        script.onerror = ${
          remote.onError ? remote.onError.toString() : defaultOnError.toString()
        }
        document.head.appendChild(script);
      }`;
};

const handleAsyncRemote = (remote) => {
  return `promise new Promise(${dynamicRemote(remote).toString()})`;
};

const mountFinalRemoteValue = (remote) => {
  if (remote.async) {
    return handleAsyncRemote(remote);
  } else {
    //Any other implementation of remote as an object goes here
  }

  return remote.name + "@" + remote.url;
};

const HandleRemoteObject = (remotes) => {
  const _newRemotes = {};
  Object.keys(remotes)?.forEach((remoteName) => {
    const remote = remotes[remoteName];
    _newRemotes[remoteName] =
      typeof remote === "string" ? remote : mountFinalRemoteValue(remote);
  });

  return _newRemotes;
};

module.exports = HandleRemoteObject;
