import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Calendar, Bell, Clock } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export const DashboardPaciente = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [requests, setRequests] = useState([]);
  const [psychologists, setPsychologists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [requestData, psychologistsData] = await Promise.all([
          mockApi.getRequests(),
          mockApi.getPsychologists(),
        ]);

        const userRequests = requestData.filter(
          (req) => req.patient.email === user.email
        );
        setRequests(userRequests);
        setPsychologists(psychologistsData);

        const allAppointments = await mockApi.getAppointmentsByEmail(user.email);
        setAppointments(allAppointments);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user.email]);

  if (loading) return <LoadingSpinner size="lg" />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate >= today && apt.status === 'agendado';
  });

  const pastAppointments = appointments.filter((apt) => {
    const aptDate = new Date(apt.date);
    aptDate.setHours(0, 0, 0, 0);
    return aptDate < today || apt.status === 'concluido';
  });

  const hasHistory = pastAppointments.length > 0;

  return (
    <div className="space-y-8">
      {/* Título animado */}
      <motion.h1
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-light drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Meu Dashboard
      </motion.h1>

      {/* Minhas Solicitações */}
      {requests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-gradient-to-br from-blue-50 to-white shadow-md hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="w-6 h-6 text-blue-600 animate-pulse" />
              <h2 className="text-xl font-semibold text-dark">Minhas Solicitações</h2>
            </div>

            <div className="space-y-4">
              {requests.map((request, i) => {
                const getStatusInfo = (status) => {
                  switch (status) {
                    case 'pendente':
                      return {
                        color: 'bg-blue-100 text-blue-800',
                        text: 'Aguardando Avaliação',
                        icon: Clock,
                      };
                    case 'aceito':
                      return {
                        color: 'bg-green-100 text-green-800',
                        text: 'Aceito como Paciente',
                        icon: Bell,
                      };
                    case 'rejeitado':
                      return {
                        color: 'bg-red-100 text-red-800',
                        text: 'Solicitação Rejeitada',
                        icon: Bell,
                      };
                    default:
                      return {
                        color: 'bg-gray-100 text-gray-800',
                        text: 'Status Desconhecido',
                        icon: Bell,
                      };
                  }
                };

                const statusInfo = getStatusInfo(request.status);
                const StatusIcon = statusInfo.icon;

                return (
                  <motion.div
                    key={request.id}
                    className="p-4 bg-white/60 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <p className="font-medium text-dark">Solicitação para ser Paciente</p>
                        <p className="text-sm text-dark/70">
                          Enviada em {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <StatusIcon className="w-4 h-4" />
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}
                        >
                          {statusInfo.text}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-dark/60 mb-3">{request.description}</p>

                    {request.status === 'aceito' && (
                      <div className="p-3 bg-green-100 rounded-lg animate-fadeIn">
                        <p className="text-sm text-green-800">
                          <strong>Parabéns!</strong> Você foi aceito como paciente.
                        </p>
                      </div>
                    )}
                    {request.status === 'pendente' && (
                      <div className="p-3 bg-blue-100 rounded-lg animate-pulse">
                        <p className="text-sm text-blue-800">
                          <strong>Status:</strong> Em análise pelo psicólogo.
                        </p>
                      </div>
                    )}
                    {request.status === 'rejeitado' && (
                      <div className="p-3 bg-red-100 rounded-lg">
                        <p className="text-sm text-red-800">
                          <strong>Solicitação não aceita.</strong> Tente outro psicólogo.
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      )}

      {/* Próximas Sessões */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-6 h-6 text-accent" />
            <h2 className="text-xl font-semibold text-dark">Próximas Sessões</h2>
          </div>

          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-dark/70 mb-4">Você não tem sessões agendadas.</p>
              <Link to="/agendamento">
                <Button className="bg-accent text-white hover:scale-105 transition-transform">
                  {hasHistory ? 'Solicitar novo psicólogo' : 'Solicitar ser paciente'}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map((appointment, i) => (
                <motion.div
                  key={appointment.id}
                  className="flex justify-between items-center p-4 bg-gradient-to-r from-white/20 to-accent/10 rounded-xl"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div>
                    <p className="font-medium text-dark">{appointment.description}</p>
                    <p className="text-sm text-dark/70">
                      {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                    </p>
                    <p className="text-xs text-dark/60">Duração: {appointment.duration} minutos</p>
                  </div>
                  <span className="px-3 py-1 bg-accent/30 text-accent rounded-full text-sm font-medium">
                    Agendado
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>

      {/* Histórico */}
      {pastAppointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-dark mb-4">Histórico Recente</h2>
            <div className="space-y-3">
              {pastAppointments.slice(0, 3).map((appointment, i) => (
                <motion.div
                  key={appointment.id}
                  className="flex justify-between items-center p-3 bg-white/5 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div>
                    <p className="font-medium text-dark">{appointment.description}</p>
                    <p className="text-sm text-dark/70">
                      {new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-green-500/20 text-green-700 rounded-full text-xs font-medium">
                    Concluída
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Link to="/historico" className="text-light hover:text-accent font-medium">
                Ver histórico completo
              </Link>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
};
