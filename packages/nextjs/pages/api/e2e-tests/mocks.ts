import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") {
    res.status(404).send("Error: mocks not enabled");
    return;
  }
  const { getMockData, setMockData } = require("mocks/msw/db/mock-data");

  if (req.method === "GET") {
    const mockData = getMockData();
    res.status(200).json(mockData);
    console.log("[api/e2e-data/mocks] Mock data retrieved");
  } else if (req.method === "PUT" || req.method === "POST") {
    const mockData = req.body;
    setMockData(mockData);
    res.status(200).send("Mock data updated");
    console.log("[api/e2e-data/mocks] Mock data updated");
  } else {
    res.status(400).send(`Unexpected method "${req.method}"`);
  }
}
