const localhost = "http://localhost:3000";
export async function fetchSlowData({
  timeout = 3000,
  response = "This data was loaded async.  Refresh the page to try again!",
} = {}) {
  const search = new URLSearchParams({ timeout: String(timeout), response }).toString();
  const res = await fetch(`${localhost}/api/testing/SLOW-NETWORK-CALL?${search}`, { cache: "no-cache" });
  const data = await res.json();
  return data.response;
}
