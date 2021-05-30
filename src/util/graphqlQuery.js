import { client, Query, Field } from "@tilework/opus";

//Defining graphQL endpoint
client.setEndpoint("http://localhost:4000");
//Query to fetch all categories data
export const categoryQuery = new Query("category", true)
  .addField(new Field("name", true))
  .addField(
    new Field("products", true)
      .addFieldList(["name", "inStock", "gallery", "description", "category"])
      .addField(
        new Field("attributes", true)
          .addFieldList(["id", "name", "type"])
          .addField(
            new Field("items", true).addFieldList([
              "displayValue",
              "value",
              "id",
            ])
          )
      )
      .addField(new Field("prices", true).addFieldList(["currency", "amount"]))
  );
