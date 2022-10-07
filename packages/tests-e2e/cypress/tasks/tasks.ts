import { interceptSSRTask } from "./interceptSSR/task";
import { setMockDataTask } from "./setMockData/task";

export const tasks = {
  interceptSSR: interceptSSRTask,
  setMockData: setMockDataTask,
};
