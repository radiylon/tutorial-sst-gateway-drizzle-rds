/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "tutorial-sst-gateway-drizzle-rds",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: input?.stage === "production" ? "radiylon-production" : "radiylon-dev",
          region: "us-west-1",
        },
      },
    };
  },
  async run() {
    const vpc = new sst.aws.Vpc("MyVpc", { bastion: true, nat: "ec2" });
    const rds = new sst.aws.Postgres("MyPostgres", { vpc, proxy: true });

    new sst.x.DevCommand("Studio", {
      link: [rds],
      dev: {
        command: "npx drizzle-kit studio",
      },
    });

    const api = new sst.aws.ApiGatewayV2("MedApi", { 
      vpc, 
      link: [rds],
      cors: {
        allowHeaders: ["*"],
        allowMethods: ["*"],
        allowOrigins: ["*"]
      }
    });

    api.route("GET /todos", {
      handler: "src/get-todos.handler"
    });

    api.route("POST /todos", {
      handler: "src/post-todos.handler"
    });

    return { api: api.url, host: rds.host, port: rds.port, user: rds.username, password: rds.password, database: rds.database };
  },
});
