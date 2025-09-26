// importações das biblioteca e componentes
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import toast from "react-hot-toast";
 
export const Register = () => {
  const [userType, setUserType] = useState("paciente");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    CRP: "",
    specialty: "",
    phone: "",
    birthDate: "",
  });

  const [loading, setLoading] = useState(false);
  // const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Senhas não coincidem");
      return;
    }
    try {
      const { user, token } = await mockApi.register({
        ...formData,
        type: userType,
      });
      login(user, token);
      toast.success("Conta criada com sucesso");
      // navigate("/dashboard")
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
      <Card className="bg-background w-full max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-dark mb-2 justify-center">
            Criar conta
          </h1>
          <p className="text-dark">Cadastre-se na PsicoAgenda</p>
        </div>

        {/* Seletor de tipo de usuário */}
        <div className="flex mb-6 bg-white/10 rounded-full p-1">
          <button
            type="button"
            onClick={() => setUserType("paciente")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              userType === "paciente"
                ? "bg-dark text-light"
                : "text-dark hover:text-accent"
            }`}
          >
            Paciente
          </button>
          <button
            type="button"
            onClick={() => setUserType("psicologo")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${
              userType === "psicologo"
                ? "bg-light text-dark"
                : "text-dark hover:text-accent"
            }`}
          >
            Psicólogo
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4 focus:ring border-accent">
          <Input
            label="Nome Completo"
            value={formData.name}
            onChange={handleInputChange("name")}
            placeholder="Seu nome"
            required
          />
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            placeholder="seu@email.com"
            required
          />
          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={handleInputChange("password")}
            placeholder="Sua senha"
            required
          />
          <Input
            label="Confirme sua senha"
            type="password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            placeholder="Confirme sua senha"
            required
          />
          <Input
            label="Telefone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange("phone")}
            placeholder="Digite o seu telefone"
            required
          />

          {userType === "paciente" && (
            <Input
              label="Data de Nascimento"
              type="date"
              value={formData.birthDate}
              onChange={handleInputChange("birthDate")}
              placeholder="Digite a sua data de nascimento"
              required
            />
          )}

          {userType === "psicologo" && (
            <>
              <Input
                label="CRP"
                value={formData.CRP}
                onChange={handleInputChange("CRP")}
                placeholder="Ex: 12/34567"
                required
              />
              <Input
                label="Especialidade"
                value={formData.specialty}
                onChange={handleInputChange("specialty")}
                placeholder="Ex: Psicologia Clínica, Terapia Cognitiva"
                required
              />
            </>
          )}

          <Button type="submit" loading={loading} className="w-full text-dark hover:text-light">
            Criar Conta
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-dark">Já possui conta?</p>
          <Link
            to="/login"
            className=" text-dark font-bold hover:text-medium"
          >
            Faça login
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Register;

 
 