function isNullOrWhiteSpace(str) {
  return (!str || str.length === 0 || /^\s*$/.test(str));
};

function isFullObject(obj){
  return Object.keys(obj).length > 0;
}

function isNullOrUndefined(obj){
  return obj === null || obj === undefined;
}

function isFullArray(arr){
  return !isNullOrUndefined(arr) && arr.length > 0;
}


async function streamToBuffer(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });
    readableStream.on('end', () => {
      resolve(Buffer.concat(chunks));
    });
    readableStream.on('error', reject);
  });
}

module.exports = {
  isNullOrWhiteSpace,
  isFullObject,
  isNullOrUndefined,
  isFullArray, 
  streamToBuffer
}