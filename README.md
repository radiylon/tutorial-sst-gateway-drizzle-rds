# Drizzle with Amazon RDS and SST Tutorial

This project is a tutorial implementation from the SST documentation: [Drizzle with Amazon RDS and SST](https://sst.dev/docs/start/aws/drizzle/)

## Overview

This example demonstrates how to:
- Deploy an Amazon Postgres RDS database using SST
- Set up Drizzle ORM and Drizzle Kit to manage the database
- Create a serverless API with Lambda functions
- Use RDS Proxy for reliable serverless database connections

## Project Structure

- `src/api.ts` - Lambda function handler for the API endpoints
- `src/drizzle.ts` - Drizzle ORM configuration
- `src/todo.sql.ts` - Database schema definition
- `drizzle.config.ts` - Drizzle Kit configuration
- `sst.config.ts` - SST infrastructure configuration
- `migrations/` - Database migration files

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development mode:
   ```bash
   npx sst dev
   ```

3. Generate and run migrations:
   ```bash
   npm run db generate
   npm run db migrate
   ```

4. When deploying to production, migrations run automatically via a lambda invocator:
  ```bash
   npx sst deploy --stage production
   ```
   
   ```typescript
    if (!$dev){
      new aws.lambda.Invocation("DatabaseMigratorInvocation", {
        input: Date.now().toString(),
        functionName: migrator.name,
      });
    }
   ```

## Features

- **Postgres Database**: Amazon RDS with RDS Proxy for serverless compatibility
- **VPC Setup**: Includes bastion host and NAT gateway for secure database access
- **Drizzle Studio**: Built-in database browser accessible during development
- **Live Functions**: Hot reloading for Lambda functions during development
- **Tunnel Support**: Secure connection to VPC-hosted database from local machine

For detailed instructions, visit the [original tutorial](https://sst.dev/docs/start/aws/drizzle/).
