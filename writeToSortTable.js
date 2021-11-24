var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });
var moment = require("moment");

const ddbClient = new AWS.DynamoDB.DocumentClient();

const time = moment().utc().valueOf();

const data = {
  id: "3",
  serviceTime: time,
  type: "Automatic",
  name: "Honda Odisey",
  manufacturer: "Honda",
  fuel_type: "Soliyarka",
  description: "High wheel",
};

const params = {
  TableName: "Invoices",
  Item: data,
};

ddbClient.put(params, function (err, data) {
  if (err) {
    console.error(JSON.stringify(err, null, 2));
  } else {
    console.log("PutItem succeeded:", data);
  }
});
