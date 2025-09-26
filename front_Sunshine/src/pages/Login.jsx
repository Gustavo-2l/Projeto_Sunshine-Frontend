import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // corrigido
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import toast from "react-hot-toast";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
   const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, token } = await mockApi.login(
        formData.email,
        formData.password
      );
      login(user, token);
      toast.success("Login realizado com sucesso!"); // corrigido

       navigate('/dashboard')
    } catch (error) {
      toast.error(error.message); // corrigido
    } finally {
      setLoading(false); // corrigido
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 ">
      <Card className="w-full max-w-md bg-dark ">
        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-dark mb-2">Login</h1>
          <p className="text-dark/70">Comece um novo dia fazendo sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="seu@email.com"
            required
          />

          <Input
            label="Senha"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Sua senha"
            required
          />

          <Button
            type="submit"
            loading={loading}
            className="w-full text-dark hover:text-light "
          >
            Entrar
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-dark/70">Ainda não tem uma conta?</p>
          <Link
            to="/register"
            className="text-dark font-bold hover:text-dark/50"
          >
            Crie a sua aqui!
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
