import { jobs } from "./_data.js";
import { v4 as uuidv4 } from "uuid";
export function get(req, res, next) {
  res.end(JSON.stringify(jobs));
}

export function post(req, res, next) {
  const { title, salary, details } = req.body;
  const id = uuidv4();
  jobs.push({ id, title, salary, details });
  res.end(JSON.stringify(jobs));
}
