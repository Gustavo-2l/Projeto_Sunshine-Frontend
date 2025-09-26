import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
 
import { Card } from "../components/Card";
import { Button } from "../components/Button"
import { LoadingSpinner } from "../components/LoadingSpinner";
 
import {
    ArrowLeft, Users, Mail, Phone, Calendar, ActivitySquareIcon, CheckCircle, Clock,
    Eye, Plus, Activity
} from 'lucide-react';
import toast from 'react-hot-toast';
 
const PatientInfo = ({ patient }) => {
    const fields = [
        { icon: Calendar, label: 'Idade', value: `${patient.age} Anos` },
 
        { icon: Calendar, label: 'Data de Nascimento', value: new Date(patient.birthDate).toLocaleDateString('pt-BR') },
 
        { icon: Phone, label: 'Telefone', value: patient.phone, href: `tel:${patient.phone}` },
 
        { icon: Mail, label: 'Email', value: patient.email, href: `mailto:${patient.email}` },
 
        { icon: Activity, label: 'Total de sessões', value: patient.totalSessions },
 
        { icon: CheckCircle, label: 'Status do tratamento', value: patient.status, isStatus: true }
    ]
    return (
        <Card>
            <div className="space-x-6">
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-light to-accent rounded-full flex items-center justify-center">
                        <Users className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-dark">{patient.name}</h2>
                        <p className="text-dark/60">Paciente:{patient.id}</p>
                    </div>
                </div>
 
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fields.map(({ icon: IconComponent, label, value, href, isStatus }) => (
                        <div key={label} className="flex items-center gap-3">
                            <IconComponent className="w-5 h-5 text-dark/60" />
                            <div>
                                <p className="text-sm text-dark/60">{label}
                                </p>
 
                                {href ? (<a href={href} className="font-semibold text-dark/60 hover:text-light transition-colors">{value}</a>) :
                                    isStatus ? (
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${value === 'ativo' || value === 'em tratamento' ? 'bg-green-400 text-dark/70' : 'bg-red-400 text-dark/70'}`}>
                                            {value}
                                        </span>
                                    ) : (
                                        <p>{value}</p>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
 
const SessionForm = ({ data, onChange, onSubmit, onCancel, loading }) => {
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
    const durations = [30, 40, 50, 60];
    const today = new Date().toISOString.splite('t')[0];
 
    return (
        <Card className="bg-white">
            <h4 className="font-semibold text-dark mb-4">Agendar Nova Sessão</h4>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                    <Input
                        label="Data *"
                        type="date"
                        value={data.date}
                        onChange={(e) => onChange({ ...data, date: e.target.value })}
                        min={today}
                        required
                    />
                    <div>
                        <label className="block text-sm font-medium text-dark mb-2"> Horário *</label>
                        <select
                            value={data.time}
                            onChange={(e) => onChange({ ...data, time: e.target.value })}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-dark/50 focus:outline-none focus:ring-2 focus:ring-light"
                            required
                        >
                            <option value="">Selecione um horário</option>
                            {timeSlots.map(time => <option key={time} value={time}>{value}</option>)}
                        </select>
                    </div>
                </div>
                <Input
                    label="Descrição"
                    value={data.description}
                    onChange={(e) => onChange({ ...data, description: e.target.value })}
                    placeholder="Ex: Sessão de acompanhamento, Avaliação inicial ..."
                    required
                />
                <div>
                    <label className="block text-sm font-medium text-dark mb-2"> Duração(minutos)</label>
                    <select
                        value={data.duration}
                        onChange={(e) => onChange({ ...data, duration: ParseInt(e.target.value) })}
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-dark/50 focus:outline-none focus:ring-2 focus:ring-light"
                        required
                    >
                        <option value="">Selecione a duração da sessão</option>
                        {durations.map(duration => <option key={duration} value={duration}>{duration} Minutos</option>)}
                    </select>
                </div>
                <div className="flex gap-4">
                    <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancelar</Button>
                    <Button type="submit"loading={loading} className="flex-1" disable={!data.date || data.time}>Agendar Sessão</Button>
                </div>
            </form>
        </Card>
 
    )
}
 
const Header = ({ onBack, title }) => (
    <div className="flex items-center gap-4">
      <Button
        variant="secondary"
        onClick={onBack}
        className="flex items-center gap-2 bg-white text-light hover:bg-gray-50 border border-gray-200"
      >
        <ArrowLeft size={20} />
        Voltar
      </Button>
      <h1 className="text-3xl font-bold text-white">{title}</h1>
    </div>
  );
 
  const SessionsCard = ({ sessions, showForm, formData, onFormChange, onFormSubmit, onFormCancel, onShowForm, onStatusUpdate, updatingSessions, creatingSession, navigate }) => (
    <Card>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-dark flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Histórico de Sessões
          </h3>
          <Button onClick={onShowForm} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nova Sessão
          </Button>
        </div>
        {showForm && (
          <SessionForm
            data={formData}
            onChange={onFormChange}
            onSubmit={onFormSubmit}
            onCancel={onFormCancel}
            loading={creatingSession}
          />
        )}
        <SessionList sessions={sessions} onStatusUpdate={onStatusUpdate} updatingSessions={updatingSessions} navigate={navigate} />
      </div>
    </Card>
  );
 
  const SessionList = ({ sessions, onStatusUpdate, updatingSessions, navigate }) => {
    if (sessions.length === 0) {
      return (
        <div className="text-center py-8">
          <Clock className="w-16 h-16 text-dark/30 mx-auto mb-4" />
          <p className="text-dark/70">Nenhuma sessão encontrada para este paciente.</p>
        </div>
      );
    }
 
    return (
      <div className="space-y-4">
        {sessions.map(session => (
          <div key={session.id} className="bg-white/50 rounded-lg border border-white/20 p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-semibold text-dark">Sessão #{session.id}</p>
                  <select
                    value={session.status}
                    onChange={(e) => onStatusUpdate(session.id, e.target.value)}
                    disabled={updatingSessions.has(session.id)}
                    className="px-2 py-1 text-xs font-medium border-0 rounded-full focus:ring-2 focus:ring-light bg-blue-100 text-blue-800"
                  >
                    <option value="agendado">Agendado</option>
                    <option value="iniciado">Iniciado</option>
                    <option value="concluido">Concluído</option>
                    <option value="cancelado">Cancelado</option>
                  </select>
                </div>
                <p className="text-sm text-dark/70 mb-2">
                  {new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}
                </p>
                <p className="text-dark font-medium">{session.description}</p>
              </div>
              <button
                onClick={() => navigate(`/sessao/${session.id}`)}
                className="p-2 text-dark/60 hover:text-dark transition-colors"
                title="Ver detalhes completos"
              >
                <Eye size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
 
  export const PacienteDetalhes = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [patient, setPatient] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingSessions, setUpdatingSessions] = useState(new Set());
    const [showNewSessionForm, setShowNewSessionForm] = useState(false);
    const [newSessionData, setNewSessionData] = useState({
      date: '',
      time: '',
      description: 'Sessão de acompanhamento',
      duration: 50
    });
    const [creatingSession, setCreatingSession] = useState(false);
 
    const updateSessionStatus = async (sessionId, newStatus) => {
      setUpdatingSessions(prev => new Set([...prev, sessionId]));
      try {
        await mockApi.updateSessionStatus(sessionId, newStatus);
        setSessions(prev => prev.map(session =>
          session.id === sessionId ? { ...session, status: newStatus } : session
        ));
      } catch (error) {
        console.error('Erro ao atualizar status:', error);
      } finally {
        setUpdatingSessions(prev => {
          const newSet = new Set(prev);
          newSet.delete(sessionId);
          return newSet;
        });
      }
    };
 
    const handleCreateSession = async (e) => {
      e.preventDefault();
      if (!newSessionData.date || !newSessionData.time) return;
 
      setCreatingSession(true);
      try {
        const newSession = await mockApi.createAppointment({
          patientId: parseInt(id),
          psychologistId: user.id,
          ...newSessionData,
          notes: '',
          fullReport: ''
        });
       
        setSessions(prev => [newSession, ...prev]);
        setShowNewSessionForm(false);
        setNewSessionData({ date: '', time: '', description: 'Sessão de acompanhamento', duration: 50 });
        setPatient(prev => ({ ...prev, totalSessions: (prev.totalSessions || 0) + 1 }));
        toast.success('Sessão agendada com sucesso!');
      } catch (error) {
        console.error('Erro ao criar sessão:', error);
        toast.error('Erro ao agendar sessão. Tente novamente.');
      } finally {
        setCreatingSession(false);
      }
    };
 
    useEffect(() => {
      const loadPatientData = async () => {
        try {
          const patients = await mockApi.getPatients(user.id);
          const patientData = patients.find(p => p.id === parseInt(id));
         
          if (!patientData) {
            navigate('/pacientes');
            return;
          }
 
          setPatient(patientData);
         
          const appointments = await mockApi.getAppointments(user.id, 'psicologo');
          const patientSessions = appointments
            .filter(apt => apt.patientId === parseInt(id))
            .sort((a, b) => new Date(b.date) - new Date(a.date));
         
          setSessions(patientSessions);
        } catch (error) {
          console.error('Erro ao carregar dados do paciente:', error);
        } finally {
          setLoading(false);
        }
      };
 
      loadPatientData();
    }, [id, user.id, navigate]);
 
    if (loading) return <LoadingSpinner size="lg" />;
    if (!patient) return null;
 
    return (
      <div className="space-y-6">
        <Header onBack={() => navigate('/pacientes')} title="Detalhes do Paciente" />
        <PatientInfo patient={patient} />
        <SessionsCard
          sessions={sessions}
          showForm={showNewSessionForm}
          formData={newSessionData}
          onFormChange={setNewSessionData}
          onFormSubmit={handleCreateSession}
          onFormCancel={() => setShowNewSessionForm(false)}
          onShowForm={() => setShowNewSessionForm(true)}
          onStatusUpdate={updateSessionStatus}
          updatingSessions={updatingSessions}
          creatingSession={creatingSession}
          navigate={navigate}
        />
      </div>
    );
  };
 