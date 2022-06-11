import "express-async-errors";

import express, { json } from "express";

import cors from "cors";
import { errorMiddleware } from "@infra/http/middlewares/errorMiddleware";
import { appRoutes } from "@infra/http/routes";

const app = express();

app.use(cors());
app.use(json());

app.use(appRoutes);

app.use(errorMiddleware);

export { app };
