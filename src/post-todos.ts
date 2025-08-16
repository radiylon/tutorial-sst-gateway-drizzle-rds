import { db } from "./drizzle";
import { todo } from "./todo.sql";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export const handler = async (evt: APIGatewayProxyEventV2) => {
  const result = await db
      .insert(todo)
      .values({ title: "Todo", description: crypto.randomUUID() })
      .returning()
      .execute();

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
}
