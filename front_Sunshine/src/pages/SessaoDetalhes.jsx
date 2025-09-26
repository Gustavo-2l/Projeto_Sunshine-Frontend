import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, Clock, Calendar, User, FileText, Edit3, Save, X } from 'lucide-react';

export const SessaoDetalhes = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [session, setSession] = useState(null);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editNotes, setEditNotes] = useState('');
  const [editReport, setEditReport] = useState('');
  const [editStatus, setEditStatus] = useState('');

  useEffect(() => {
    const loadSessionData = async () => {
      try {
        const sessionData = await mockApi.getSessionDetails(parseInt(sessionId));
        setSession(sessionData);
        setEditNotes(sessionData.notes || '');
        setEditReport(sessionData.fullReport || '');
        setEditStatus(sessionData.status || '');

        const patients = await mockApi.getPatients(user.id);
        const patientData = patients.find(p => p.id === sessionData.patientId);
        setPatient(patientData);
      } catch (error) {
        console.error('Erro ao carregar dados da sessão', error);
      } finally {
        setLoading(false);
      }
    };
    loadSessionData();
  }, [sessionId, user.id, navigate]);

  const handleSave = async () => {
    try {
      await mockApi.updateSessionStatus(session.id, editStatus);
      await mockApi.updateSessionNotes(session.id, editNotes, editReport);
      setSession({
        ...session,
        status: editStatus,
        notes: editNotes,
        fullReport: editReport
      });
      setEditing(false);
    } catch (error) {
      console.error('Erro ao salvar alterações', error);
    }
  };

  const handleCancel = () => {
    setEditNotes(session.notes || '');
    setEditReport(session.fullReport || '');
    setEditStatus(session.status);
    setEditing(false);
  };

  if (loading) return <LoadingSpinner size='lg' />;
  if (!session || !patient) return null;

  const statusOptions = [
    { value: 'agendado', label: 'Agendado', color: 'bg-blue-100 text-dark' },
    { value: 'iniciado', label: 'Iniciado', color: 'bg-yellow-100 text-dark' },
    { value: 'concluído', label: 'Concluído', color: 'bg-green-100 text-dark' },
    { value: 'cancelado', label: 'Cancelado', color: 'bg-red-100 text-dark' }
  ];

  const currentStatus = statusOptions.find(s => s.value === session.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(`/pacientes/${patient.id}`)}
            className="flex items-center gap-2 bg-white text-light hover:bg-gray-50 hover:scale-105 active:scale-95 border border-gray-200 px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md group"
          >
            <ArrowLeft size={20} className="transition-transform duration-200 group-hover:-translate-x-1" />
            Voltar
          </button>
          <h1 className="text-3xl font-bold text-white">Detalhes da Sessão</h1>
        </div>

        <div className="flex items-center gap-3">
          {!editing ? (
            <Button onClick={() => setEditing(true)} className="flex items-center gap-2">
              <Edit3 size={16} />
              Editar
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save size={16} />
                Salvar
              </Button>
              <Button variant="secondary" onClick={handleCancel} className="flex items-center gap-2">
                <X size={16} />
                Cancelar
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Informações da Sessão */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-dark">Sessão #{session.id}</h2>
              <p className="text-dark/60">{session.description}</p>
            </div>

            {editing ? (
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${currentStatus?.color}`}>
                {currentStatus?.label}
              </span>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-dark/60" />
              <div>
                <p className="text-sm text-dark/60">Paciente</p>
                <p className="font-semibold text-dark">{patient.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-dark/60" />
              <div>
                <p className="text-sm text-dark/60">Data e Hora</p>
                <p className="font-semibold text-dark">
                  {new Date(session.date).toLocaleDateString('pt-BR')} às {session.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-dark/60" />
              <div>
                <p className="text-sm text-dark/60">Duração</p>
                <p className="font-semibold text-dark">{session.duration} minutos</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Anotações Rápidas */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-dark" />
            <h3 className="text-xl font-bold text-dark">Anotações Rápidas</h3>
          </div>

          {editing ? (
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="Adicione anotações rápidas sobre a sessão..."
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light focus:border-transparent resize-none"
            />
          ) : (
            <div className="bg-white/50 p-4 rounded-lg min-h-[100px]">
              {session.notes ? (
                <p className="text-dark leading-relaxed">{session.notes}</p>
              ) : (
                <p className="text-dark/50 italic">Nenhuma anotação adicionada</p>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Relatório Completo */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-dark" />
            <h3 className="text-xl font-bold text-dark">Relatório Completo da Sessão</h3>
          </div>

          {editing ? (
            <textarea
              value={editReport}
              onChange={(e) => setEditReport(e.target.value)}
              placeholder="Relatório detalhado da sessão..."
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-light focus:border-transparent resize-none font-mono text-sm"
            />
          ) : (
            <div className="bg-white/50 p-4 rounded-lg min-h-[300px]">
              {session.fullReport ? (
                <pre className="text-dark leading-relaxed whitespace-pre-wrap font-sans">
                  {session.fullReport}
                </pre>
              ) : (
                <p className="text-dark/50 italic">Nenhum relatório adicionado</p>
              )}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
