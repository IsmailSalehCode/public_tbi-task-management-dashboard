export function createErrMsg(err) {
  // TODO: remove console log in prod
  console.error(err);

  const errResponse = err.response;
  if (errResponse) {
    const statusCode = errResponse.status;
    const statusText = errResponse.statusText;
    // Why '||'? On the BE some JS files return err responses with message field in data obj.
    const errResponseData = errResponse.data.message || errResponse.data;
    const errMsg = errResponseData ? errResponseData : statusText;
    // const status = err.response.status;
    // console.log(errResponse.statusText);
    return `Error ${statusCode}: ${errMsg}`;
  }

  return `Error: ${err.message}`;
}
