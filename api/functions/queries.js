const { getService, getTableRows } = require('./azurestorage');
const { getRun } = require('./firestore');
const { TABLE } = require('./consts');
const azure = require('azure-storage');

exports.getConfig = (api) =>
	new Promise((resolve, reject) => {
		getService().retrieveEntity(
			TABLE.Subscriptions,
			api,
			api,
			(error, result, response) => {
				if (!error) resolve(response.body);
				else reject(error);
			}
		);
	});

exports.getScanDetails = (runId) =>
	getRun(runId).then((doc) =>
		getTableRows(
			TABLE.ScanResults,
			new azure.TableQuery()
				.top(50)
				.where('PartitionKey eq ?', doc.apikey)
				.and('runId eq ?', doc.runId)
		)
	);

exports.getIgnoredUrls = (api) =>
	getTableRows(
		TABLE.IgnoredUrls,
		new azure.TableQuery().where('PartitionKey eq ?', api)
	);

exports.getSummary = (api) =>
	getTableRows(
		TABLE.Scans,
		new azure.TableQuery().where('PartitionKey eq ?', api)
	);

exports.getSummaryById = (runId) =>
	getRun(runId).then((doc) =>
		getTableRows(
			TABLE.Scans,
			new azure.TableQuery()
				.where('PartitionKey eq ?', doc.apikey)
				.and('runId eq ?', doc.runId)
		)
	);
