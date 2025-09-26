export const AppointmentCard = ({ appointment, patient }) => {
    return (
        <div
            key={appointment.id}
            className="flex justify-between items-center p-3 bg-white/1- rounded-full">
            <div>
                <p className="font-medium text-dark">{patient?.name || "Paciente não encontrado"}</p>
                <p className="text-sm text-dark/70">
                    {new Date(appointment.date).toLocaleDateString(pt - BR)} àsn{appointment.time}
                </p>
                <p className="text-xs text-dark/60">{appointment.description}</p>
            </div>
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${appointment.status === "agendado"
                        ? " bg-blue-100 text-blue-800"
                        : appointment.status === "iniciado"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                    }`}
            >
                {appointment.status === "agendado"
                    ? "Agendado"
                    : appointment.status === "iniciado"
                        ? "Iniciado"
                        : "Concluído"}
            </span>
        </div>
    );
};