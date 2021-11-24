var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

var moment = require("moment");

const ddbClient = new AWS.DynamoDB.DocumentClient();

var params = {
  TableName: "Invoices",
  KeyConditionExpression: "id = :id",
  ExpressionAttributeValues: {
    ":id": "3",
  },
};

ddbClient.query(params, function (err, data) {
  if (err) {
    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
  } else {
    console.log(data);
  }
});
