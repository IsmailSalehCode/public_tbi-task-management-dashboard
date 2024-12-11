function determineErrMessageInAlert(err) {
  console.error(err);
  const errResponse = err.response;
  if (errResponse) {
    const statusCode = errResponse.status;
    // Why '||'? On the BE some JS files return err responses with message field in data obj.
    const errResponseData = errResponse.data.message || errResponse.data;
    const statusText = errResponse.statusText;
    const errMsg = errResponseData ? errResponseData : statusText;
    // const status = err.response.status;
    // console.log(errResponse.statusText);
    return `Error ${statusCode}: ${errMsg}`;
  }
  const errMessage = err.message;
  if (errMessage === "Network Error") {
    return "Network Error. Check Internet connection or contact sys admin regarding server availability.";
  }
  return "An unknown error occured. Contact sys admin.";
  //   const errResponse = err.response;
  //   if (errResponse) {
  //     console.log(errResponse);
  //   }
  //   let UI_MSG;
  //   if (err.message === "Network Error") {
  //     UI_MSG =
  //       "Network Error. Check Internet connection or contact sys admin regarding server availability.";
  //   } else {
  //     UI_MSG = "An unknown error occured. Contact sys admin.";
  //   }
  //   return UI_MSG;
}

export { determineErrMessageInAlert };
