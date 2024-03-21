import {DynamoDBClient, ListTablesCommand} from '@aws-sdk/client-dynamodb';
import {DynamoDBStreamsClient, ListStreamsCommand} from '@aws-sdk/client-dynamodb-streams';

export async function listTables() {
	const tables = [];
	const client = new DynamoDBClient({region: 'ap-northeast-1'});

	const continuousAction = async nextKey => {
		const command = new ListTablesCommand({
			Limit: 100,
			ExclusiveStartTableName: nextKey,
		});
		const {TableNames = [], LastEvaluatedTableName} = await client.send(command);
		tables.push(...TableNames);
		if (LastEvaluatedTableName) {
			await continuousAction(LastEvaluatedTableName);
		}
	};

	await continuousAction();

	return tables;
}

export async function listStreams() {
	const streams = [];
	const client = new DynamoDBStreamsClient({region: 'ap-northeast-1'});

	const continuousAction = async nextKey => {
		const command = new ListStreamsCommand({
			Limit: 100,
			ExclusiveStartStreamArn: nextKey,
		});
		const result = await client.send(command);
		const {Streams = [], LastEvaluatedStreamArn} = result;
		streams.push(...Streams.map(({StreamArn}) => StreamArn));
		if (LastEvaluatedStreamArn) {
			await continuousAction(LastEvaluatedStreamArn);
		}
	};

	await continuousAction();

	return streams;
}
