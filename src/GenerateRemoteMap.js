const GenerateRemoteMap = (options) => {
  if (options.remotes) {
    return {
      "./remoteMap": `data:application/json,${JSON.stringify(
        Object.keys(options.remotes)
      )}`,
    };
  } else return {};
};

module.exports = GenerateRemoteMap;
