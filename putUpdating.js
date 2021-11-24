var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const ddbClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "cars",
  Key: { id: "car-1" },
  ReturnValues: "ALL_NEW",
  UpdateExpression:
    "set #markedLocations = list_append(if_not_exists(#markedLocations.#type, :empty_list), :appendList)",
  ExpressionAttributeNames: {
    "#markedLocations": "markedLocations",
    "#type": "type",
  },
  ExpressionAttributeValues: {
    ":appendList": [{ type: "Archa-beshik" }],
    ":empty_list": [],
  },
};

ddbClient.update(params, function (err, data) {
  if (err) {
    console.log(JSON.stringify(err));
  } else {
    console.log("Update succeeded: \n");
    console.log(JSON.stringify(data));
  }
});
