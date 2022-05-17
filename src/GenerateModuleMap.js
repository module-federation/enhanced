const GenerateModuleMap = (options) => {
  const exposedKeys = Object.keys(options.exposes);
  if (exposedKeys.length) {
    return {
      "./moduleMap": `data:application/json,${JSON.stringify(exposedKeys)}`,
    };
  }
  return {};
};

module.exports = GenerateModuleMap;
