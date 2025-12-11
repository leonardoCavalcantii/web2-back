
import express from "express";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import gameRoutes from "./routes/gameRoutes";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(express.json());

// Usar as rotas de usuário

app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", gameRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

