module.exports = {
  skipFiles: ["test/TestAvatar.sol", "test/Button.sol", "test/TestToken.sol", "test/TestFactory.sol"],
  mocha: {
    grep: "@skip-on-coverage", // Find everything with this tag
    invert: true, // Run the grep's inverse set.
  },
};
