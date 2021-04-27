module.exports = {
  preset: "ts-jest",
  verbose: true,
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  testURL: "http://localhost",
  setupFiles: ["./jest.init.js"],
  testMatch: ["**/tests/**/*.ts?(x)", "**/?(*.)(spec|test).ts?(x)"],
  modulePaths: ["<rootDir>/src", "<rootDir>/test", "<rootDir>/node_modules"],
  coverageDirectory: "./coverage/",
  collectCoverage: true,
  collectCoverageFrom: ["**/src/*.{js,jsx}"],
};
