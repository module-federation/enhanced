class AddRuntimeRequiremetToPromiseExternal {
  apply(compiler) {
    compiler.hooks.compilation.tap(
      "AddRuntimeRequiremetToPromiseExternal",
      (compilation) => {
        const RuntimeGlobals = compiler.webpack.RuntimeGlobals;
        if (compilation.outputOptions.trustedTypes) {
          compilation.hooks.additionalModuleRuntimeRequirements.tap(
            "AddRuntimeRequiremetToPromiseExternal",
            (module, set, context) => {
              if (module.externalType === "promise") {
                set.add(RuntimeGlobals.loadScript);
              }
            }
          );
        }
      }
    );
  }
}

module.exports = AddRuntimeRequiremetToPromiseExternal