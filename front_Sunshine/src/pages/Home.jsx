/// Importações necessárias
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 
import { Shield, Zap, Users, Calendar, Activity, FileText } from 'lucide-react'; 
import { Button } from '../components/Button'; 
import logo from '../public/logo.png'; // ✅ import correto

// Página inicial (Home)
const Home = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Agenda Dinâmica',
      description: 'Visualização de horários disponíveis com marcação automática e lembretes por e-mail'
    },
    {
      icon: Shield,
      title: 'Privacidade Garantida',
      description: 'Autenticação segura via JWT e proteção total dos dados sensíveis dos pacientes'
    },
    {
      icon: Activity,
      title: 'Análise Inteligente',
      description: 'Machine Learning para identificar padrões emocionais e agrupar perfis de risco'
    },
    {
      icon: Users,
      title: 'Impacto Social',
      description: 'Voltado para projetos voluntários, universidades e ONGs que oferecem apoio psicológico'
    },
    {
      icon: FileText,
      title: 'Histórico Estruturado',
      description: 'Registro organizado de sessões com temas, recomendações e evolução do paciente'
    },
    {
      icon: Zap,
      title: 'Interface Acolhedora',
      description: 'Design responsivo e acessível, pensado para conforto emocional dos usuários'
    }
  ];

  return (
    <div className="relative overflow-hidden">
 
      {/* ================= HERO SECTION ================= */}
      <section className="min-h-screen flex items-center justify-center text-center py-20 relative z-40">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}   
            transition={{ duration: 0.8 }}
          >
            {/* Logo centralizada */}
            <div className="w-40 h-40 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl bg-white">
              <img 
                src={logo}   // ✅ usa o import
                alt="Sunshine" 
                className="w-full h-full object-contain" // ✅ ocupa certinho o espaço
              />
            </div>

            {/* Nome do sistema */}
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Sunshine
            </h1>

            {/* Subtítulo */}
            <h2 className="text-2xl md:text-3xl font-medium text-light mb-6">
              Sistema de Agendamento Psicológico
            </h2>

            {/* Descrição principal */}
            <p className="text-xl text-light mb-8 max-w-3xl font-medium flex-col mx-auto leading-relaxed">
              Um dia mais claro, uma mente mais limpa.
            </p>

            {/* Botões de ação (CTA) */}
            <div className="flex flex-row sm:flex-row text-4xl gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="max-w-lg sm:w-auto text-dark hover:text-light">
                  Participe Agora
                </Button>
              </Link>

              <a href="#features" onClick={(e) => {
                e.preventDefault();
                document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
              }}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-light hover:text-light">
                  Conhecer Recursos
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="min-h-screen flex-initial py-20 relative z-10">
        <div className="w-full">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tecnologia a Serviço do Cuidado
              </h2>
              <p className="text-xl text-light max-w-3xl mx-auto">
                Ferramentas inteligentes para organizar, acompanhar e potencializar atendimentos voluntários
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-light to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <feature.icon className="w-10 h-10 text-dark" />
                </div>
                <h3 className="text-xl font-bold text-light mb-4">{feature.title}</h3>
                <p className="text-light leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA (CALL TO ACTION) SECTION ================= */}
      <section className="min-h-screen flex items-center py-20 relative z-10">
        <div className="w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Faça Parte desta Transformação Social
            </h2>
            <p className="text-xl text-light mb-12 max-w-3xl mx-auto leading-relaxed">
              Una tecnologia e responsabilidade social. Ajude a democratizar o acesso 
              à saúde mental através de uma plataforma pensada para o bem-estar coletivo.
            </p>
            <Link to="/register">
              <Button size="lg" className="text-xl px-12 py-5 rounded-2xl font-nunito text-dark hover:text-light">
                Criar Conta Gratuita
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
