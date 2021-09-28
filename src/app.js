require("dotenv").config({ path: require("find-config")(".env") });
const cors = require("cors");
const express = require("express");

const initDb = require("./config/db.config");

const PORT = 4000;
const API_VERSION = 1;

const app = express();

// Configurando o express para aceitar requisições com o body no formato JSON
app.use(express.json());
// Configurando o express para aceitar requisições deste domínio (nosso App React)
app.use(cors({ origin: "http://localhost:3000" }));

const projectRouter = require("./routes/project.routes");
// Redirecionando todas as requisições para os roteadores
app.use(`/api/v${API_VERSION}`, projectRouter);
const taskRouter = require("./routes/task.routes");
app.use(`/api/v${API_VERSION}`, taskRouter);
const userRouter = require("./routes/user.routes");
app.use(`/api/v${API_VERSION}`, userRouter);

// Rota de captura de erros para padronização dos erros internos
app.use((err, req, res, next) => {
  if (err) {
    console.error(err);
    return res.status(err.status || 500).json({
      msg: "Erro interno no servidor.",
      err: err,
    });
  }

  return next();
});

initDb
  .then(() => {
    // Só subimos o servidor do Express depois que a conexão com o banco foi bem-sucedida
    app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}`));
  })
  .catch((err) => {
    console.error("Erro de conexão com o MongoDB: ", err);
    // Encerrando o Node com erro fatal
    process.exit(5);
  });
