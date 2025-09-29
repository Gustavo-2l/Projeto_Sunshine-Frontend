// Importação de rotas do React Router
import { Routes, Route, Navigate } from 'react-router-dom';

// Importa contexto de autenticação
import { useAuth } from '../context/AuthContext';

// Componentes reutilizáveis
import { Sidebar } from '../components/Sidebar';
import { PublicNavbar } from '../components/PublicNavbar';
import { LoadingSpinner } from '../components/LoadingSpinner';

// Páginas públicas
import Home from '../pages/Home';
import About from '../pages/About';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Notfound } from '../pages/Notfound';
import { Agendamento } from '../pages/Agendamento';

// Páginas protegidas
import { DashboardPsicologo } from '../pages/DashboardPsicologo';
import { DashboardPaciente } from '../pages/DashboardPaciente';
import { ChatIA} from '../pages/ChatIa';
import { Relatorios } from '../pages/Relatorio';
import { Paciente } from '../pages/Pacientes';
import { PacienteDetalhes } from '../pages/Pacientedetalhe';
import { SessaoDetalhes } from '../pages/SessaoDetalhes';
import { Solicitacoes } from '../pages/Solicitacoes';
/* ==============================
   Componente de rota protegida
   ============================== */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="flex-1 lg:ml-64 p-8">{children}</main>
    </div>
  );
};

/* ==============================
   Componente de rota pública
   ============================== */
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner size="lg" />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
};

/* ==============================
   Dashboard condicional
   ============================== */
const Dashboard = () => {
  const { user } = useAuth();
  return user?.type === 'psicologo' ? <DashboardPsicologo /> : <DashboardPaciente />;
};

/* ==============================
   Configuração de rotas
   ============================== */


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Públicas */}
      <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
      <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Protegidas */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/agendamento" element={<ProtectedRoute><Agendamento /></ProtectedRoute>} />
      <Route path="/chat-ia" element={<ProtectedRoute><ChatIA /></ProtectedRoute>} />
      <Route path="/relatorios" element={<ProtectedRoute><Relatorios /></ProtectedRoute>} />
      <Route path="/pacientes" element={<ProtectedRoute><Paciente /></ProtectedRoute>} />
      <Route path="pacientes/:id"element={
          <ProtectedRoute>
            <PacienteDetalhes />
          </ProtectedRoute>
        }
      />

<Route path="/sessao/:sessionId" element={<ProtectedRoute><SessaoDetalhes /></ProtectedRoute>} />
<Route path="/solicitacoes" element={<ProtectedRoute><Solicitacoes /></ProtectedRoute>} />



      {/* Página 404 */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
