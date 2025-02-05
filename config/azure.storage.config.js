const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');
const env = require('./index').config;

exports.createContainerAzureBlob = async containerName => {
  try {
    const accountName = env.AZURE_STORAGE_ACCOUNT_NAME;
    if (!accountName)
      throw new Error('AZURE_STORAGE_ACCOUNT_NAME is missing from .env file');

    const blobServiceClient = new BlobServiceClient(
      `https://${accountName}.blob.core.windows.net`,
      new DefaultAzureCredential()
    );
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const createContainerResponse = await containerClient.createIfNotExists();
    console.log(
      `Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
    );
    return containerClient;
  } catch (err) {
    console.log(err);
    return { error: err.message };
  }
}; 