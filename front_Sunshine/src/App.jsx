// componente responsável por emitir notificações utilizando a biblioteca react-hot-toast

// importação do arquivo authProvider responsável pela autenticação dos usuários e controle de rotas privadas
import { AuthProvider } from "./context/AuthContext";

// importação do appRoutes componente de gerenciamento de rotas
import { AppRoutes } from "./routes/AppRoute";

// construção código principal
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;