/**
 * Função utilitária para simular delay de requisições HTTP
 * Simula latência de rede para tornar a experiência mais realista
 * @param {number} ms - Tempo em milissegundos para aguardar
 * @returns {Promise} Promise que resolve após o tempo especificado
 */
 const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 /**
  * Chaves para armazenamento no localStorage
  * Cada entidade do sistema possui sua própria chave de armazenamento
  * Prefixo 'lunysse_' evita conflitos com outros dados no localStorage
  */
 const STORAGE_KEYS = {
   USERS: 'lunysse_users',           // Usuários do sistema (psicólogos e pacientes)
   PATIENTS: 'lunysse_patients',     // Dados detalhados dos pacientes
   APPOINTMENTS: 'lunysse_appointments', // Agendamentos e sessões
   REQUESTS: 'lunysse_requests'      // Solicitações de novos pacientes
 };
 
 /**
  * Função para recuperar dados do localStorage com tratamento de erro
  * Tenta fazer parse do JSON armazenado, retorna dados padrão em caso de erro
  * @param {string} key - Chave do localStorage
  * @param {any} defaultData - Dados padrão caso não existam ou haja erro
  * @returns {any} Dados recuperados ou dados padrão
  */
 const getStorageData = (key, defaultData) => {
   try {
     const stored = localStorage.getItem(key);
     return stored ? JSON.parse(stored) : defaultData;
   } catch {
     // Em caso de erro no parse JSON, retorna dados padrão
     return defaultData;
   }
 };
 
 /**
  * Função para salvar dados no localStorage
  * Converte objeto JavaScript para JSON antes de armazenar
  * @param {string} key - Chave do localStorage
  * @param {any} data - Dados a serem salvos
  */
 const setStorageData = (key, data) => {
   localStorage.setItem(key, JSON.stringify(data));
 };
 
 /**
  * Dados iniciais dos usuários do sistema
  * Inclui psicólogos e pacientes de teste para demonstração
  * Cada usuário possui campos específicos baseados no seu tipo
  */
 const initialUsers = [
   // Psicólogos de teste com especialidades diferentes
   { 
     id: 2, 
     email: 'ana@test.com', 
     password: '123456', 
     type: 'psicologo', 
     name: 'Dra. Ana Costa', 
     specialty: 'Terapia Cognitivo-Comportamental', 
     crp: 'CRP 01/23456' 
   },
   { 
     id: 3, 
     email: 'carlos@test.com', 
     password: '123456', 
     type: 'psicologo', 
     name: 'Dr. Carlos Mendes', 
     specialty: 'Psicologia Infantil', 
     crp: 'CRP 01/34567' 
   },
   { 
     id: 4, 
     email: 'lucia@test.com', 
     password: '123456', 
     type: 'psicologo', 
     name: 'Dra. Lucia Ferreira', 
     specialty: 'Terapia Familiar', 
     crp: 'CRP 01/45678' 
   },
   // Paciente de teste
   { 
     id: 5, 
     email: 'paciente@test.com', 
     password: '123456', 
     type: 'paciente', 
     name: 'Maria Santos' 
   }
 ];
 
 /**
  * Dados iniciais dos pacientes cadastrados no sistema
  * Cada paciente está associado a um psicólogo específico (psychologistId)
  * Contém informações completas: dados pessoais, contato e status do tratamento
  */
 const initialPatients = [
   // Pacientes da Dra. Ana Costa (ID: 2) - Especialista em TCC
   { 
     id: 20, 
     name: 'Fernanda Lima', 
     email: 'fernanda.lima@email.com', 
     phone: '(11) 99999-5555', 
     birthDate: '1992-03-12', 
     age: 32, 
     status: 'Em tratamento', 
     psychologistId: 2 
   },
   { 
     id: 6, 
     name: 'Lucas Pereira', 
     email: 'lucas.pereira@email.com', 
     phone: '(11) 99999-6666', 
     birthDate: '1987-11-25', 
     age: 37, 
     status: 'Ativo', 
     psychologistId: 2 
   },
   { 
     id: 7, 
     name: 'Camila Rodrigues', 
     email: 'camila.rodrigues@email.com', 
     phone: '(11) 99999-7777', 
     birthDate: '1993-09-08', 
     age: 31, 
     status: 'Em tratamento', 
     psychologistId: 2 
   },
   { 
     id: 8, 
     name: 'Diego Santos', 
     email: 'diego.santos@email.com', 
     phone: '(11) 99999-8888', 
     birthDate: '1991-06-30', 
     age: 33, 
     status: 'Ativo', 
     psychologistId: 2 
   },
   
   // Pacientes do Dr. Carlos Mendes (ID: 3) - Especialista em Psicologia Infantil
   { 
     id: 9, 
     name: 'Isabella Martins', 
     email: 'isabella.martins@email.com', 
     phone: '(11) 99999-9999', 
     birthDate: '1994-04-14', 
     age: 30, 
     status: 'Em tratamento', 
     psychologistId: 3 
   },
   { 
     id: 10, 
     name: 'Gabriel Alves', 
     email: 'gabriel.alves@email.com', 
     phone: '(11) 99999-0000', 
     birthDate: '1989-10-07', 
     age: 35, 
     status: 'Ativo', 
     psychologistId: 3 
   },
   { 
     id: 11, 
     name: 'Sophia Ferreira', 
     email: 'sophia.ferreira@email.com', 
     phone: '(11) 88888-1111', 
     birthDate: '1996-01-20', 
     age: 28, 
     status: 'Em tratamento', 
     psychologistId: 3 
   },
   { 
     id: 12, 
     name: 'Mateus Barbosa', 
     email: 'mateus.barbosa@email.com', 
     phone: '(11) 88888-2222', 
     birthDate: '1986-12-11', 
     age: 38, 
     status: 'Ativo', 
     psychologistId: 3 
   },
   
   // Pacientes da Dra. Lucia Ferreira (ID: 4) - Especialista em Terapia Familiar
   { 
     id: 13, 
     name: 'Beatriz Souza', 
     email: 'beatriz.souza@email.com', 
     phone: '(11) 88888-3333', 
     birthDate: '1990-08-05', 
     age: 34, 
     status: 'Em tratamento', 
     psychologistId: 4 
   },
   { 
     id: 14, 
     name: 'Thiago Nascimento', 
     email: 'thiago.nascimento@email.com', 
     phone: '(11) 88888-4444', 
     birthDate: '1984-05-28', 
     age: 40, 
     status: 'Ativo', 
     psychologistId: 4 
   },
   { 
     id: 15, 
     name: 'Larissa Campos', 
     email: 'larissa.campos@email.com', 
     phone: '(11) 88888-5555', 
     birthDate: '1997-02-16', 
     age: 27, 
     status: 'Em tratamento', 
     psychologistId: 4 
   },
   { 
     id: 16, 
     name: 'André Moreira', 
     email: 'andre.moreira@email.com', 
     phone: '(11) 88888-6666', 
     birthDate: '1983-11-09', 
     age: 41, 
     status: 'Ativo', 
     psychologistId: 4 
   }
 ];
 
 /**
  * Função utilitária para gerar datas dinamicamente
  * Calcula uma data futura ou passada baseada no número de dias a partir de hoje
  * Usado para criar agendamentos com datas realistas nos dados de teste
  * @param {number} daysFromNow - Número de dias a partir de hoje (positivo = futuro, negativo = passado)
  * @returns {string} Data no formato YYYY-MM-DD
  */
 const generateFutureDate = (daysFromNow) => {
   const date = new Date();
   date.setDate(date.getDate() + daysFromNow);
   return date.toISOString().split('T')[0]; // Retorna apenas a parte da data (YYYY-MM-DD)
 };
 
 /**
  * Dados iniciais das solicitações de novos pacientes
  * Representa pedidos de pessoas que querem se tornar pacientes de psicólogos específicos
  * Inclui informações de contato, preferências e nível de urgência
  */
 const initialRequests = [
   {
     id: 1,
     patientName: 'João Silva',
     patientEmail: 'joao.silva@email.com',
     patientPhone: '(11) 99999-1111',
     preferredPsychologist: 2, // Dra. Ana Costa (TCC)
     description: 'Gostaria de agendar uma sessão. Preciso de ajuda com ansiedade e estresse no trabalho. Tenho disponibilidade nas tardes.',
     urgency: 'media',
     preferredDates: ['2024-12-20', '2024-12-21'],
     preferredTimes: ['14:00', '15:00'],
     status: 'pendente',
     createdAt: new Date().toISOString()
   },
   {
     id: 2,
     patientName: 'Ana Oliveira',
     patientEmail: 'ana.oliveira@email.com',
     patientPhone: '(11) 88888-2222',
     preferredPsychologist: 3, // Dr. Carlos Mendes (Psicologia Infantil)
     description: 'Gostaria de agendar uma sessão para meu filho de 8 anos que está com dificuldades comportamentais na escola. Preciso de um especialista em psicologia infantil.',
     urgency: 'alta',
     preferredDates: ['2024-12-19'],
     preferredTimes: ['09:00', '10:00'],
     status: 'pendente',
     createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 dia atrás
   }
 ];
 
 /**
  * Dados iniciais dos agendamentos e sessões do sistema
  * Inclui sessões passadas (concluídas) e futuras (agendadas)
  * Cada agendamento contém informações completas: paciente, psicólogo, data, status, anotações
  * Status possíveis: 'agendado', 'concluido', 'cancelado', 'reagendado'
  */
 const initialAppointments = [
   
   // Sessões da Dra. Ana Costa (ID: 2)
   { 
     id: 8, 
     patientId: 5, 
     psychologistId: 2, 
     date: generateFutureDate(-2), 
     time: '14:00', 
     status: 'concluido',
     description: 'Terapia cognitivo-comportamental',
     duration: 50,
     notes: 'Sessão produtiva com técnicas de TCC.',
     fullReport: 'Paciente respondeu bem às intervenções.'
   },
   { 
     id: 9, 
     patientId: 6, 
     psychologistId: 2, 
     date: generateFutureDate(2), 
     time: '15:00', 
     status: 'agendado',
     description: 'Sessão de acompanhamento',
     duration: 50,
     notes: '',
     fullReport: ''
   },
   { 
     id: 10, 
     patientId: 7, 
     psychologistId: 2, 
     date: generateFutureDate(-8), 
     time: '11:00', 
     status: 'concluido',
     description: 'Sessão inicial',
     duration: 60,
     notes: 'Primeira consulta bem-sucedida.',
     fullReport: 'Estabelecimento de vínculo terapêutico.'
   },
   
   // Sessões do Dr. Carlos Mendes (ID: 3)
   { 
     id: 11, 
     patientId: 9, 
     psychologistId: 3, 
     date: generateFutureDate(-1), 
     time: '09:00', 
     status: 'concluido',
     description: 'Psicologia infantil - Ludoterapia',
     duration: 45,
     notes: 'Sessão de ludoterapia muito produtiva.',
     fullReport: 'Criança demonstrou boa interação.'
   },
   { 
     id: 12, 
     patientId: 10, 
     psychologistId: 3, 
     date: generateFutureDate(4), 
     time: '10:00', 
     status: 'agendado',
     description: 'Avaliação comportamental',
     duration: 50,
     notes: '',
     fullReport: ''
   },
   
   // Sessões da Dra. Lucia Ferreira (ID: 4)
   { 
     id: 13, 
     patientId: 13, 
     psychologistId: 4, 
     date: generateFutureDate(-6), 
     time: '16:00', 
     status: 'concluido',
     description: 'Terapia familiar',
     duration: 60,
     notes: 'Sessão familiar muito produtiva.',
     fullReport: 'Família demonstrou boa comunicação.'
   },
   { 
     id: 14, 
     patientId: 14, 
     psychologistId: 4, 
     date: generateFutureDate(1), 
     time: '14:00', 
     status: 'agendado',
     description: 'Terapia de casal',
     duration: 60,
     notes: '',
     fullReport: ''
   },
   
   // Sessões do paciente de teste Maria Santos (ID: 5)
   { 
     id: 17, 
     patientId: 5, 
     psychologistId: 2, 
     date: generateFutureDate(-7), 
     time: '14:00', 
     status: 'concluido',
     description: 'Sessão inicial - Avaliação psicológica',
     duration: 60,
     notes: 'Primeira consulta realizada com sucesso. Paciente demonstrou boa receptividade.',
     fullReport: 'Anamnese completa. Identificados sintomas de ansiedade leve.'
   },
   { 
     id: 18, 
     patientId: 5, 
     psychologistId: 2, 
     date: generateFutureDate(-14), 
     time: '15:00', 
     status: 'concluido',
     description: 'Terapia cognitivo-comportamental',
     duration: 50,
     notes: 'Trabalhamos técnicas de respiração e reestruturação cognitiva.',
     fullReport: 'Paciente respondeu bem às técnicas de TCC aplicadas.'
   },
   { 
     id: 19, 
     patientId: 5, 
     psychologistId: 2, 
     date: generateFutureDate(-21), 
     time: '14:00', 
     status: 'concluido',
     description: 'Sessão de acompanhamento',
     duration: 50,
     notes: 'Progresso significativo observado. Paciente relatou melhora na qualidade do sono.',
     fullReport: 'Evolução positiva. Redução dos sintomas ansiosos.'
   },
   { 
     id: 21, 
     patientId: 5, 
     psychologistId: 2, 
     date: generateFutureDate(1), 
     time: '15:00', 
     status: 'agendado',
     description: 'Sessão de acompanhamento',
     duration: 50,
     notes: '',
     fullReport: ''
   },
   
   // Sessões antigas para dados históricos
   { 
     id: 15, 
     patientId: 1, 
     psychologistId: 1, 
     date: generateFutureDate(-28), 
     time: '14:00', 
     status: 'concluido',
     description: 'Sessão de acompanhamento',
     duration: 50,
     notes: 'Progresso contínuo observado.',
     fullReport: 'Paciente mantendo estabilidade.'
   },
   { 
     id: 16, 
     patientId: 2, 
     psychologistId: 1, 
     date: generateFutureDate(-35), 
     time: '10:00', 
     status: 'concluido',
     description: 'Sessão inicial',
     duration: 60,
     notes: 'Primeira consulta.',
     fullReport: 'Anamnese completa realizada.'
   },
 
 ];
 
 /**
  * Inicialização dos dados no localStorage
  * Verifica se os dados já existem, caso contrário, cria com os dados iniciais
  * Isso garante que o sistema funcione mesmo na primeira execução
  */
 if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
   setStorageData(STORAGE_KEYS.USERS, initialUsers);
 }
 if (!localStorage.getItem(STORAGE_KEYS.PATIENTS)) {
   setStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
 }
 if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
   setStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
 }
 if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
   setStorageData(STORAGE_KEYS.REQUESTS, initialRequests);
 }
 
 /**
  * Carregamento dos dados atuais do localStorage
  * Estes dados são usados pelas funções da API que não atualizam o localStorage
  * Para funções que atualizam dados, sempre use getStorageData() para obter dados atuais
  */
 const users = getStorageData(STORAGE_KEYS.USERS, initialUsers);
 const patients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
 const appointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
 const requests = getStorageData(STORAGE_KEYS.REQUESTS, initialRequests);
 
 /**
  * API Mock - Simulação de backend para o sistema Lunysse
  * Todas as funções simulam operações de um servidor real com delays e validações
  * Os dados são persistidos no localStorage do navegador
  */
 export const mockApi = {
   /**
    * Autenticação de usuário
    * Verifica email e senha nos dados armazenados
    * @param {string} email - Email do usuário
    * @param {string} password - Senha do usuário
    * @returns {Object} Objeto com dados do usuário (sem senha) e token
    * @throws {Error} Erro se credenciais forem inválidas
    */
   async login(email, password) {
     await delay(1000); // Simula latência de rede
     const currentUsers = getStorageData(STORAGE_KEYS.USERS, initialUsers);
     const user = currentUsers.find(u => u.email === email && u.password === password);
     if (!user) throw new Error('Credenciais inválidas');
     // Remove senha do retorno por segurança
     return { user: { ...user, password: undefined }, token: 'mock-token' };
   },
 
   /**
    * Registro de novo usuário no sistema
    * Cria conta para psicólogo ou paciente com validações específicas
    * Para pacientes, também cria registro completo na tabela de pacientes
    * @param {Object} userData - Dados do usuário a ser criado
    * @returns {Object} Objeto com dados do usuário criado e token
    */
   async register(userData) {
     await delay(1000); // Simula processamento do servidor
     const currentUsers = getStorageData(STORAGE_KEYS.USERS, initialUsers);
     const newUserId = Date.now(); // Gera ID único baseado no timestamp
     
     // Cria novo usuário com campos específicos por tipo
     const newUser = { 
       id: newUserId, 
       ...userData,
       // Adiciona campos específicos para psicólogos
       ...(userData.type === 'psicologo' && {
         crm: userData.crm,
         specialty: userData.specialty,
         phone: userData.phone
       })
     };
     currentUsers.push(newUser);
     setStorageData(STORAGE_KEYS.USERS, currentUsers);
 
     // Se for paciente, criar registro completo na tabela de pacientes
     if (userData.type === 'paciente') {
       const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
       
       /**
        * Função interna para calcular idade baseada na data de nascimento
        * Considera mês e dia para cálculo preciso
        */
       const calculateAge = (birthDate) => {
         const today = new Date();
         const birth = new Date(birthDate);
         let age = today.getFullYear() - birth.getFullYear();
         const monthDiff = today.getMonth() - birth.getMonth();
         // Ajusta idade se ainda não fez aniversário este ano
         if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
           age--;
         }
         return age;
       };
 
       // Cria registro completo do paciente
       const newPatient = {
         id: newUserId,
         name: userData.name,
         email: userData.email,
         phone: userData.phone,
         birthDate: userData.birthDate,
         age: calculateAge(userData.birthDate),
         status: 'Ativo',
         psychologistId: null // Será definido quando agendar primeira consulta
       };
       
       currentPatients.push(newPatient);
       setStorageData(STORAGE_KEYS.PATIENTS, currentPatients);
     }
 
     return { user: { ...newUser, password: undefined }, token: 'mock-token' };
   },
 
   /**
    * Busca agendamentos de um usuário específico
    * Filtra por psicólogo ou paciente dependendo do tipo de usuário
    * @param {number} userId - ID do usuário
    * @param {string} userType - Tipo do usuário ('psicologo' ou 'paciente')
    * @returns {Array} Lista de agendamentos do usuário
    */
   async getAppointments(userId, userType) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     // Filtra agendamentos baseado no tipo de usuário
     return currentAppointments.filter(apt => 
       userType === 'psicologo' ? apt.psychologistId === userId : apt.patientId === userId
     );
   },
 
   /**
    * Busca agendamentos de um paciente pelo email
    * Usado para pacientes que são usuários do sistema
    * @param {string} email - Email do paciente
    * @returns {Array} Lista de agendamentos do paciente
    */
   async getAppointmentsByEmail(email) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
     
     // Encontra o paciente pelo email
     const patient = currentPatients.find(p => p.email === email);
     if (!patient) return [];
     
     // Retorna agendamentos do paciente
     return currentAppointments.filter(apt => apt.patientId === patient.id);
   },
 
   /**
    * Cria novo agendamento no sistema
    * Define status inicial como 'agendado' automaticamente
    * @param {Object} appointmentData - Dados do agendamento
    * @returns {Object} Agendamento criado com ID gerado
    */
   async createAppointment(appointmentData) {
     await delay(1000);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     const newAppointment = { 
       id: Date.now(), // Gera ID único
       ...appointmentData, 
       status: 'agendado' // Status padrão para novos agendamentos
     };
     currentAppointments.push(newAppointment);
     setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
     return newAppointment;
   },
 
   /**
    * Busca lista de psicólogos disponíveis no sistema
    * Retorna apenas informações públicas (sem dados sensíveis)
    * @returns {Array} Lista de psicólogos com informações básicas
    */
   async getPsychologists() {
     await delay(500);
     const currentUsers = getStorageData(STORAGE_KEYS.USERS, initialUsers);
     // Filtra apenas psicólogos e remove informações sensíveis
     return currentUsers.filter(user => user.type === 'psicologo').map(psych => ({
       id: psych.id,
       name: psych.name,
       specialty: psych.specialty,
       crp: psych.crp
     }));
   },
 
   /**
    * Busca horários disponíveis para agendamento
    * Verifica conflitos com agendamentos existentes do psicólogo
    * @param {string} date - Data no formato YYYY-MM-DD
    * @param {number} psychologistId - ID do psicólogo
    * @returns {Array} Lista de horários disponíveis
    */
   async getAvailableSlots(date, psychologistId) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     
     // Horários padrão de funcionamento
     const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
     
     // Busca horários já ocupados na data específica
     const occupiedSlots = currentAppointments
       .filter(apt => 
         apt.date === date && 
         apt.psychologistId === psychologistId && 
         apt.status === 'agendado' // Apenas agendamentos ativos ocupam horários
       )
       .map(apt => apt.time);
     
     // Retorna apenas horários livres
     return allSlots.filter(slot => !occupiedSlots.includes(slot));
   },
 
   /**
    * Cancela um agendamento existente
    * Altera status para 'cancelado' sem remover o registro
    * @param {number} appointmentId - ID do agendamento
    * @returns {Object} Agendamento cancelado
    * @throws {Error} Erro se agendamento não for encontrado
    */
   async cancelAppointment(appointmentId) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     const appointment = currentAppointments.find(apt => apt.id === appointmentId);
     
     if (appointment) {
       appointment.status = 'cancelado';
       setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
       return appointment;
     }
     throw new Error('Agendamento não encontrado');
   },
 
   /**
    * Atualiza dados de um agendamento existente
    * Permite modificar qualquer campo do agendamento
    * @param {number} appointmentId - ID do agendamento
    * @param {Object} updateData - Dados a serem atualizados
    * @returns {Object} Agendamento atualizado
    * @throws {Error} Erro se agendamento não for encontrado
    */
   async updateAppointment(appointmentId, updateData) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     const appointmentIndex = currentAppointments.findIndex(apt => apt.id === appointmentId);
     
     if (appointmentIndex !== -1) {
       // Mescla dados existentes com novos dados
       currentAppointments[appointmentIndex] = { 
         ...currentAppointments[appointmentIndex], 
         ...updateData 
       };
       setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
       return currentAppointments[appointmentIndex];
     }
     throw new Error('Agendamento não encontrado');
   },
 
   /**
    * Busca pacientes de um psicólogo específico
    * Calcula automaticamente o total de sessões de cada paciente
    * @param {number} psychologistId - ID do psicólogo
    * @returns {Array} Lista de pacientes com total de sessões
    */
   async getPatients(psychologistId) {
     await delay(500);
     const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     
     // Filtra apenas pacientes do psicólogo específico
     const psychologistPatients = currentPatients.filter(patient => 
       patient.psychologistId === psychologistId
     );
     
     // Calcula total de sessões por paciente (incluindo todas as sessões)
     const patientSessions = {};
     currentAppointments.forEach(apt => {
       if (apt.psychologistId === psychologistId) {
         patientSessions[apt.patientId] = (patientSessions[apt.patientId] || 0) + 1;
       }
     });
 
     // Retorna pacientes com total de sessões calculado
     return psychologistPatients.map(patient => ({
       ...patient,
       totalSessions: patientSessions[patient.id] || 0
     }));
   },
 
   /**
    * Adiciona anotação a um paciente
    * Função placeholder - atualmente apenas simula a operação
    * @param {number} patientId - ID do paciente
    * @param {Object} noteData - Dados da anotação
    * @returns {Object} Anotação criada com ID
    */
   async addPatientNote(patientId, noteData) {
     await delay(500);
     // TODO: Implementar persistência de anotações
     return { id: Date.now(), ...noteData };
   },
 
   /**
    * Atualiza status de uma sessão específica
    * Status possíveis: 'agendado', 'concluido', 'cancelado', 'reagendado'
    * @param {number} sessionId - ID da sessão
    * @param {string} status - Novo status da sessão
    * @returns {Object} Sessão atualizada
    * @throws {Error} Erro se sessão não for encontrada
    */
   async updateSessionStatus(sessionId, status) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     const sessionIndex = currentAppointments.findIndex(apt => apt.id === sessionId);
     
     if (sessionIndex !== -1) {
       currentAppointments[sessionIndex].status = status;
       setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
       return currentAppointments[sessionIndex];
     }
     throw new Error('Sessão não encontrada');
   },
 
   /**
    * Atualiza anotações e relatório de uma sessão
    * Permite ao psicólogo adicionar observações e relatório completo
    * @param {number} sessionId - ID da sessão
    * @param {string} notes - Anotações breves da sessão
    * @param {string} fullReport - Relatório completo da sessão
    * @returns {Object} Sessão atualizada
    * @throws {Error} Erro se sessão não for encontrada
    */
   async updateSessionNotes(sessionId, notes, fullReport) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     const sessionIndex = currentAppointments.findIndex(apt => apt.id === sessionId);
     
     if (sessionIndex !== -1) {
       currentAppointments[sessionIndex].notes = notes;
       currentAppointments[sessionIndex].fullReport = fullReport;
       setStorageData(STORAGE_KEYS.APPOINTMENTS, currentAppointments);
       return currentAppointments[sessionIndex];
     }
     throw new Error('Sessão não encontrada');
   },
 
   /**
    * Busca detalhes completos de uma sessão específica
    * Retorna todas as informações da sessão incluindo anotações e relatórios
    * @param {number} sessionId - ID da sessão
    * @returns {Object} Dados completos da sessão
    * @throws {Error} Erro se sessão não for encontrada
    */
   async getSessionDetails(sessionId) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     const session = currentAppointments.find(apt => apt.id === sessionId);
     
     if (!session) throw new Error('Sessão não encontrada');
     return session;
   },
 
   /**
    * Gera dados para relatórios e analytics do psicólogo
    * Calcula estatísticas, gráficos e alertas baseados nos dados reais
    * @param {number} psychologistId - ID do psicólogo
    * @returns {Object} Dados completos para relatórios (stats, gráficos, alertas)
    */
   async getReportsData(psychologistId) {
     await delay(500);
     const currentAppointments = getStorageData(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
     const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
     
     // Filtra dados específicos do psicólogo
     const psychologistAppointments = currentAppointments.filter(apt => 
       apt.psychologistId === psychologistId
     );
     const psychologistPatients = currentPatients.filter(patient => 
       patient.psychologistId === psychologistId
     );
     
     // Calcula estatísticas principais
     const totalSessions = psychologistAppointments.length;
     const completedSessions = psychologistAppointments.filter(apt => 
       apt.status === 'concluido'
     ).length;
     const canceledSessions = psychologistAppointments.filter(apt => 
       apt.status === 'cancelado'
     ).length;
     const sessionStarted = psychologistAppointments.filter(apt => 
       apt.status === 'iniciado'
     ).length;
     
     // Pacientes sem nenhuma sessão cadastrada
     const patientsWithSessions = new Set(psychologistAppointments.map(apt => apt.patientId));
     const patientsWithoutSessions = psychologistPatients.filter(patient => 
       !patientsWithSessions.has(patient.id)
     ).length;
     
     // Dados para gráfico de frequência (simulados para demonstração)
     const frequencyData = [];
     const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
     
     months.forEach((month) => {
       // Simula dados de sessões por mês
       const monthSessions = Math.floor(Math.random() * 20) + 10;
       frequencyData.push({ month, sessions: monthSessions });
     });
     
     // Dados para gráfico de status das sessões (valores absolutos)
     const statusData = [];
     const agendadoSessions = psychologistAppointments.filter(apt => apt.status === 'agendado').length;
     
     if (completedSessions > 0) statusData.push({ name: 'Concluídas', value: completedSessions, color: '#26B0BF' });
     if (canceledSessions > 0) statusData.push({ name: 'Canceladas', value: canceledSessions, color: '#ef4444' });
     if (sessionStarted > 0) statusData.push({ name: 'Iniciadas', value: sessionStarted, color: '#f59e0b' });
     if (agendadoSessions > 0) statusData.push({ name: 'Agendadas', value: agendadoSessions, color: '#10b981' });
     
     // Adiciona pacientes sem sessões como item separado
    
     // Dados para gráfico de pacientes
     const patientsWithSessionsCount = psychologistPatients.length - patientsWithoutSessions;
     const patientsData = [];
     
     if (patientsWithSessionsCount > 0) {
       patientsData.push({ name: 'Com sessões', value: patientsWithSessionsCount, color: '#26B0BF' });
     }
     if (patientsWithoutSessions > 0) {
       patientsData.push({ name: 'Sem sessões', value: patientsWithoutSessions, color: '#ef4444' });
     }
 
     // Gera alertas de risco baseados nos pacientes (simulado)
     const riskAlerts = psychologistPatients.slice(0, 3).map((patient, index) => ({
       id: patient.id,
       patient: patient.name,
       risk: index === 0 ? 'Alto' : 'Médio',
       reason: index === 0 ? 'Faltas consecutivas' : 'Cancelamentos frequentes',
       date: new Date(Date.now() - (index + 1) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
     }));
     
     return {
       stats: {
         activePatients: psychologistPatients.length,
         totalSessions,
         completedSessions,
         attendanceRate: totalSessions > 0 ? ((completedSessions / totalSessions) * 100).toFixed(1) : 0,
         riskAlerts: riskAlerts.length
       },
       frequencyData,
       statusData,
       patientsData,
       riskAlerts
     };
   },
 
   /**
    * Busca solicitações de novos pacientes
    * Pode filtrar por psicólogo específico ou retornar todas
    * @param {number} psychologistId - ID do psicólogo (opcional)
    * @returns {Array} Lista de solicitações
    */
   async getRequests(psychologistId) {
     await delay(500);
     const currentRequests = getStorageData(STORAGE_KEYS.REQUESTS, initialRequests);
     // Se psychologistId for fornecido, filtra por ele, senão retorna todas
     return currentRequests.filter(req => 
       !psychologistId || req.preferredPsychologist === psychologistId
     );
   },
 
   /**
    * Atualiza status de uma solicitação de paciente
    * Permite aceitar, rejeitar ou adicionar observações
    * @param {number} requestId - ID da solicitação
    * @param {string} status - Novo status ('aceito', 'rejeitado', 'pendente')
    * @param {string} notes - Observações do psicólogo (opcional)
    * @returns {Object} Solicitação atualizada
    * @throws {Error} Erro se solicitação não for encontrada
    */
   async updateRequestStatus(requestId, status, notes = '') {
     await delay(500);
     const currentRequests = getStorageData(STORAGE_KEYS.REQUESTS, initialRequests);
     const requestIndex = currentRequests.findIndex(req => req.id === requestId);
     
     if (requestIndex !== -1) {
       currentRequests[requestIndex] = {
         ...currentRequests[requestIndex],
         status,
         notes,
         updatedAt: new Date().toISOString() // Marca quando foi atualizada
       };
       setStorageData(STORAGE_KEYS.REQUESTS, currentRequests);
       return currentRequests[requestIndex];
     }
     throw new Error('Solicitação não encontrada');
   },
 
   /**
    * Cria nova solicitação de paciente
    * Usado quando alguém quer se tornar paciente de um psicólogo específico
    * Verifica se já existe solicitação pendente do mesmo email para o mesmo psicólogo
    * @param {Object} requestData - Dados da solicitação
    * @returns {Object} Solicitação criada
    * @throws {Error} Erro se já existir solicitação pendente
    */
   async createRequest(requestData) {
     await delay(1000);
     const currentRequests = getStorageData(STORAGE_KEYS.REQUESTS, initialRequests);
     
     // Verifica se já existe solicitação pendente do mesmo email para o mesmo psicólogo
     const existingRequest = currentRequests.find(req => 
       req.patientEmail === requestData.patientEmail && 
       req.preferredPsychologist === requestData.preferredPsychologist &&
       req.status === 'pendente'
     );
     
     if (existingRequest) {
       throw new Error('Você já possui uma solicitação pendente para este psicólogo');
     }
     
     const newRequest = {
       id: Date.now(), // Gera ID único
       ...requestData,
       status: 'pendente', // Status inicial
       createdAt: new Date().toISOString() // Timestamp de criação
     };
     currentRequests.push(newRequest);
     setStorageData(STORAGE_KEYS.REQUESTS, currentRequests);
     return newRequest;
   },
 
   /**
    * Cria novo paciente no sistema
    * Usado para cadastro direto de pacientes por psicólogos
    * Verifica se já existe paciente com mesmo email para o psicólogo
    * @param {Object} patientData - Dados completos do paciente
    * @returns {Object} Paciente criado
    * @throws {Error} Erro se paciente já existir
    */
   async createPatient(patientData) {
     await delay(1000);
     const currentPatients = getStorageData(STORAGE_KEYS.PATIENTS, initialPatients);
     
     // Verifica se já existe paciente com mesmo email para o psicólogo
     const existingPatient = currentPatients.find(p => 
       p.email === patientData.email && 
       p.psychologistId === patientData.psychologistId
     );
     
     if (existingPatient) {
       throw new Error('Paciente com este email já está cadastrado');
     }
     
     const newPatient = {
       id: Date.now(), // Gera ID único
       ...patientData,
       status: 'Ativo' // Status padrão para novos pacientes
     };
     currentPatients.push(newPatient);
     setStorageData(STORAGE_KEYS.PATIENTS, currentPatients);
     return newPatient;
   }
 };
 
 /**
  * Exportação dos dados iniciais para uso em componentes (se necessário)
  * Estes são os dados carregados na inicialização, não os dados atuais
  * Para dados atuais, sempre use as funções da mockApi
  */
 export { users, patients, appointments, requests };