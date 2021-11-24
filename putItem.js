var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const ddbClient = new AWS.DynamoDB.DocumentClient();

const cars = [
  {
    id: "1",
    type: "Automatic",
    name: "Toyota Yaris",
    manufacturer: "Toyota",
    fuel_type: "Petrol",
    description: "A smooth ride",
  },
  {
    id: "2",
    type: "Manual",
    name: "Volkswagen Golf",
    manufacturer: "Volkswagen",
    fuel_type: "Petrol",
    description: "Good Value",
  },
];

const params = {
  TableName: "CustomTable",
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
