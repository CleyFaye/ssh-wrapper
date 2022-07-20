const loadGruntTasks = require("load-grunt-tasks");
const {readFileSync} = require("fs");

const getLicenseJS = () => [
  "/**",
  " * @preserve",
  " * @license",
  ...readFileSync("./LICENSE", "utf8")
    .split("\n")
    .map(c => ` * ${c}`),
  " */",
].join("\n");

module.exports = grunt => {
  loadGruntTasks(grunt);
  grunt.initConfig({
    clean: {
      cache: [
        "**/*.cache",
        ".nyc_output",
        ".tsbuildinfo",
        ".tscache"
      ],
      lib: [
        "lib",
      ],
    },
    run: {
      ts_lib: {
        cmd: "npx",
        args: ["tsc"],
      },
    },
    usebanner: {
      options: {banner: getLicenseJS()},
      lib: {
        files: [{
          cwd: "lib",
          expand: true,
          src: ["**/*.js"],
        }],
      },
    },
  });

  grunt.registerTask(
    "build",
    "Build the JavaScript code from TypeScript",
    [
      "run:ts_lib",
      "usebanner:lib",
    ],
  );

  grunt.registerTask("default", ["build"]);
}
