export async function fetchQuote() {
  const key = `X2mIJBRrG3ox10w0upFtxg==L1cvfFk7iwbE9fMl`;
  const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { "Content-Type": "application/json", "X-Api-Key": key },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch quote");
  }
  const data = await response.json();
  return loadSentence(data[0]);
}

// selection of the longer quote
function loadSentence(data) {
  let lengthOfQuote = data.quote.split(" ").length;
  if (lengthOfQuote < 25 || lengthOfQuote > 50 || data.quote.endsWith("'")) {
    return fetchQuote();
  } else {
    return data;
  }
}
