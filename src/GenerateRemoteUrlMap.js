const GenerateRemoteUrlMap = (options) => {
  if (options.remotes) {
    return {
      "./remoteUrlMap": `data:application/json,${JSON.stringify(
        Object.keys(options.remotes).map((remoteName) => {
          return { [remoteName]: options.remotes[remoteName].split("@")[1] };
        })
      )}`,
    };
  } else return {};
};

module.exports = GenerateRemoteUrlMap;
