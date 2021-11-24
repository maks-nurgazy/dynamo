var AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

var moment = require("moment");

const ddbClient = new AWS.DynamoDB.DocumentClient();

async function scanAll(params) {
  const items = [];
  let exclusiveStartKey;

  do {
    // `ExclusiveStartKey` allows to continue fetching more items starting from
    // the item after the last item in the previous response.
    exclusiveStartKey && (params.ExclusiveStartKey = exclusiveStartKey);

    const { Items, LastEvaluatedKey } = await ddbClient.scan(params).promise();
    const answer = await ddbClient.scan(params).promise();

    console.log("answer is:");
    console.log(answer);

    if (Items && Items.length) {
      items.push(...Items);
    }

    exclusiveStartKey = LastEvaluatedKey;
  } while (exclusiveStartKey);

  const data = {
    Count: items.length,
    Items: items,
  };

  console.log(data);

  return data;
}

const params = {
  TableName: "CustomTable",
  Select: "COUNT",
};

scanAll(params);
