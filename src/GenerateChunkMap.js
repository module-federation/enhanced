const GenerateChunkMap = (compiler) => {
  const { webpack } = compiler;
  const { RawSource } = webpack.sources;
  compiler.hooks.emit.tapAsync(
    "ExtendedModuleFederationPlugin",
    (compilation, callback) => {
      console.log("Creating chunkMap\n");
      const chunkMap = Array.from(compilation.chunks)
        .map((chunk) => {
          return Array.from(chunk.files);
        })
        .flat();

      compilation.emitAsset(
        "./chunkMap.json",
        new RawSource(JSON.stringify(chunkMap))
      );

      callback();
    }
  );
};

module.exports = { GenerateChunkMap };
