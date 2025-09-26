import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Calendar, Users, Bell, CheckCheck } from 'lucide-react';
import { CardKpi } from '../components/CardKpi';
import { AppointmentCard } from '../components/AppointmentCard';

export const DashboardPsicologo = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 

  const loadData = useCallback(async () => {
    try {
      const [appointmentsData, patientsData, requestsData] = await Promise.all([
        mockApi.getAppointments(user.id, 'psicologo'),
        mockApi.getPatients(user.id),
        mockApi.getRequests(user.id)
      ]);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadData, 5000);

    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [loadData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-12 h-12 border-4 border-light border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }


  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    appointmentDate.setHours(0, 0, 0, 0);
    return appointmentDate.getTime() === today.getTime() &&
           apt.psychologistId === user.id &&
           apt.status === 'agendado';
  });

  const totalPatients = patients.length;
  const completedSessions = appointments.filter(
    apt => apt.status === 'concluido' && apt.psychologistId === user.id
  ).length;
  const pendingRequests = requests.filter(
    req => req.status === 'pendente' && req.preferredPsychologist === user.id
  ).length;

  const upcomingAppointments = appointments
    .filter(
      apt =>
        new Date(apt.date) >= new Date() &&
        apt.status === 'agendado' &&
        apt.psychologistId === user.id
    )
    .slice(0, 5);

  const isNewPsychologist =
    totalPatients === 0 && appointments.length === 0 && requests.length === 0;


  const filteredAppointments = upcomingAppointments.filter(apt => {
    const patient = patients.find(p => p.id === apt.patientId);
    if (!patient) return false;
    return patient.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
        <p className="text-white">Bem-vindo, {user.name}</p>
      </div>

      {/* Mensagem para psicólogos novos */}
      {isNewPsychologist && (
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-2 border-dashed border-light/30">
          <Users className="w-16 h-16 text-light/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark mb-2">
            Bem-vindo ao Sunshine!
          </h3>
          <p className="text-dark/70 mb-4">
            Você é novo por aqui. Seus pacientes e agendamentos aparecerão neste
            dashboard conforme você começar a receber solicitações e agendar
            sessões.
          </p>
          <p className="text-sm text-dark/50">
            Explore o menu lateral para conhecer todas as funcionalidades
            disponíveis.
          </p>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <CardKpi icon={Users} value={totalPatients} label="Pacientes Ativos" />
        <CardKpi
          icon={Calendar}
          value={todayAppointments.length}
          label="Sessões Hoje"
          color="text-accent"
        />
        <CardKpi
          icon={CheckCheck}
          value={completedSessions}
          label="Sessões Concluídas"
          color="text-medium"
        />
        <CardKpi
          icon={Bell}
          value={pendingRequests}
          label="Solicitações Pendentes"
        />
      </div>

     
      {!isNewPsychologist && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Buscar paciente..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full bg-light px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-light"
          />
        </div>
      )}

      {/* Próximos Agendamentos */}
      {!isNewPsychologist && (
        <div className="bg-white rounded-lg shadow-md p-6 mt-4">
          <h2 className="text-xl font-semibold text-dark mb-4">
            Próximos Agendamentos
          </h2>
          {filteredAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-dark/30 mx-auto mb-4" />
              <p className="text-dark/70 mb-2">
                Nenhum agendamento futuro encontrado.
              </p>
              <p className="text-sm text-dark/50">
                {totalPatients === 0
                  ? 'Você ainda não possui pacientes cadastrados.'
                  : 'Todos os agendamentos estão em dia!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map(appointment => {
                const patient = patients.find(p => p.id === appointment.patientId);
                return (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    patient={patient}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
