var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

const dynamodb = new AWS.DynamoDB();

var params = {
  TableName: 'Vehicles',
  KeySchema: [
    { AttributeName: 'id', KeyType: 'HASH' }, //Partition key
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S',
    },
  ],
  BillingMode: 'PAY_PER_REQUEST',
};

dynamodb.createTable(params, function (err, data) {
  if (err) {
    console.error(
      'Unable to create table. Error JSON:',
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log(
      'Created table. Table description JSON:',
      JSON.stringify(data, null, 2)
    );
  }
});
