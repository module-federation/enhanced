const validateRemoteType = (remoteName, options) => {
  const remote = options.remotes[remoteName];
  return typeof remote === "string"
    ? { [remoteName]: remote.split("@")[1] }
    : { [remote.name]: remote.url };
};

const GenerateRemoteUrlMap = (options) => {
  if (options.remotes) {
    return {
      "./remoteUrlMap": `data:application/json,${JSON.stringify(
        Object.keys(options.remotes).map((remoteName) => {
          return validateRemoteType(remoteName, options);
        })
      )}`,
    };
  } else return {};
};

module.exports = GenerateRemoteUrlMap;
