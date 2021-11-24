var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const ddbClient = new AWS.DynamoDB.DocumentClient();

async function updateTableDynamoDB(
  item,
  tableName,
  tableSingleName,
  removeItems = []
) {
  const attributes = Object.keys(item);

  if (attributes.length === 1) {
    // Nothing to update since only a item ID is provided.
    throw new Error(
      `One or more ${tableSingleName} attributes must be specified to perform this operation.`
    );
  }

  const params = {
    TableName: tableName,
    Key: {
      id: item.id,
    },
    ExpressionAttributeValues: {},
    ExpressionAttributeNames: {},
    UpdateExpression: "",
    ReturnValues: "ALL_NEW",
  };

  let prefix = "set";

  for (let i = 0; i < attributes.length; ++i) {
    const attribute = attributes[i];

    // Save only defined attributes.
    // Do not allow to change its own ID.
    if (attribute !== "id" && typeof item[attribute] !== "undefined") {
      params.UpdateExpression += `${prefix} #${attribute} = :${attribute}`;
      params.ExpressionAttributeNames[`#${attribute}`] = attribute;
      params.ExpressionAttributeValues[`:${attribute}`] = item[attribute];

      prefix = ",";
    }
  }

  let removePrefix = "remove";

  if (params.UpdateExpression && removeItems.length) {
    params.UpdateExpression += " ";
  }

  removeItems.forEach((item) => {
    if (item !== "id" && typeof item !== "undefined") {
      params.UpdateExpression += `${removePrefix} #${item}`;
      params.ExpressionAttributeNames[`#${item}`] = item;

      removePrefix = ",";
    }
  });

  console.log(params);

  return await ddbClient.update(params).promise();
}

const car = {
  id: "1",
  fuel_type: "Automat",
  //   name: "Volkswagen Golf",
  //   manufacturer: "Volkswagen",
  //   fuel_type: "Petrol",
  //   description: "Good Value",
};

updateTableDynamoDB(car, "cars", "cars").then((data) => {
  console.log(data.Attributes);
});
