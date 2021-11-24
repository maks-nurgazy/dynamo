var AWS = require('aws-sdk');
AWS.config.update({ region: 'us-west-2' });

const ddbClient = new AWS.DynamoDB.DocumentClient();

const car = {
  id: '2',
  type: 'Manual',
  name: 'Volkswagen Golf',
  manufacturer: 'Volkswagen',
  fuel_type: 'Petrol',
  description: 'Good Value',
};

const params = {
  TableName: 'cars',
  Key: {
    id: '2',
  },
  ExpressionAttributeValues: {
    ':hoho': 'fjsdfjksjdf',
  },
  UpdateExpression: 'set hoho = :hoho',
  ReturnValues: 'ALL_NEW',
};

ddbClient.update(params, function (err, data) {
  if (err) {
    console.log(JSON.stringify(err));
  } else {
    console.log('Update succeeded: \n');
    console.log(JSON.stringify(data));
  }
});
