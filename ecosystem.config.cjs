module.exports = {
  apps: [
    {
      name: "avancepr",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "/home/site/wwwroot",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
