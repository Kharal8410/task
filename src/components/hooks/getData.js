export const Fetchdata = async (dataToSend) => {
  if (dataToSend.Type === "POST") {
    const response = await fetch(dataToSend.FetchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Signature: "p0m76",
      },
      body: JSON.stringify(dataToSend),
    });
    const cooptive = await response.json();
    return cooptive;
  } else {
    const response = await fetch(dataToSend.FetchURL);
    const cooptive = await response.json();
    return cooptive;
  }
};
