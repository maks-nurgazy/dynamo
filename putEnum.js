var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const ddbClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "cars",
  Item: cars[1],
};

ddbClient.put(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to add Car",
      cars[0].name,
      ". Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("PutItem succeeded:", cars[0].name);
  }
});
