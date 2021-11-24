var AWS = require('aws-sdk');
var credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
AWS.config.credentials = credentials;
AWS.config.update({ region: 'us-east-1' });

const ddbClient = new AWS.DynamoDB.DocumentClient();

async function scanAll(params) {
  try {
    const { Items, LastEvaluatedKey } = await ddbClient.scan(params).promise();
    // console.log(credentials.);
    console.log('answer is:');
    console.log(Items);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
}

const params = {
  TableName: 'Products',
};

scanAll(params);
