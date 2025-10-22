export async function fetchFromUrl(url) {
  const jsonFile = await fetch(url);
  return await jsonFile.json();
}