const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

const GenerateChunkMap = require("./src/GenerateChunkMap");
const GenerateModuleMap = require("./src/GenerateModuleMap");
const GenerateRemoteMap = require("./src/GenerateRemoteMap");
const GenerateRemoteUrlMap = require("./src/GenerateRemoteUrlMap");

class ExtendedModuleFederationPlugin extends ModuleFederationPlugin {
  constructor(options) {
    if (!options.exposes) {
      options.exposes = {};
    }

    options.exposes = {
      ...options.exposes,
      ...GenerateModuleMap(options),
      ...GenerateRemoteMap(options),
      ...GenerateRemoteUrlMap(options),
    };

    super(options);
    this.options = options;
  }
  apply(compiler) {
    super.apply(compiler);
    GenerateChunkMap(compiler);
  }
}
module.exports = ExtendedModuleFederationPlugin;
