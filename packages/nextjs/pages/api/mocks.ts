import type { NextApiRequest, NextApiResponse } from "next";
import { getMockData, setMockData } from "mocks/msw/db/mock-data";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") {
    res.status(404).send("Error: mocks not enabled");
    return;
  }

  if (req.method === "GET") {
    const mockData = getMockData();
    res.status(200).json(mockData);
  } else if (req.method === "PUT" || req.method === "POST") {
    const mockData = req.body;
    setMockData(mockData);
    res.status(200).send("Mock data updated");
  }
}
