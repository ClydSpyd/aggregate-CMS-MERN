import InputField from "../../components/input-field";
import { useAuth } from "../../contexts/auth-context";
import { useEffect, useState } from "react";
import spinner from "../../assets/loaders/spinner-white.svg";
import { cn } from "../../lib/utilities";

interface InputData {
  username: string;
  password: string;
}

const defaultInputData: InputData = {
  username: "",
  password: "",
};

export default function LoginForm() {
  const { login, error: submitError, submitting } = useAuth();
  const [error, setError] = useState<string | null>(submitError ?? null);
  const [inputVals, setInputVals] = useState<InputData>(defaultInputData);

  const handleInputChange = (val: string, key: keyof typeof inputVals) => {
    setInputVals((prev: InputData) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVals.username === "" || inputVals.password === "") return;
    login(inputVals.username, inputVals.password);
  };

  useEffect(() => {
    if (Object.values(inputVals).some((val: string) => val !== "")) {
      setError(null);
    }
  }, [inputVals]);

  useEffect(() => {
    if (submitError && !submitting) {
      setError(submitError);
      setInputVals(defaultInputData);
    }
  }, [submitError, submitting]);

  const formIncomplete = Object.values(inputVals).some(
    (val: string) => val === ""
  );

  return (
    <form
      onSubmit={handleLogin}
      className={cn(
        "flex flex-col gap-2 w-[600px] p-6 pb-8 pt-4 border rounded-lg relative shadow-md",
        error && !submitting ? "animate-shakeOnce" : ""
      )}
    >
      <img height={80} width={250} src={`/images/logo-mk2.jpeg`} alt="logo" />
      <InputField
        value={inputVals.username}
        placeholder="Username"
        onChange={(val: string) => handleInputChange(val, "username")}
      />
      <InputField
        value={inputVals.password}
        placeholder="Password"
        onChange={(val: string) => handleInputChange(val, "password")}
        secure
      />
      <button
        className={cn(
          formIncomplete ? "opacity-85 pointer-events-none" : "",
          "w-full h-[55px] flex items-center justify-center border-2 border-indigo-500 rounded-md font-semibold text-white bg-indigo-500 hover:text-indigo-500 hover:bg-white transition-all duration-200",
          submitting ? "!bg-indigo-500 !text-white" : ""
        )}
      >
        {!submitting ? (
          "LOGIN"
        ) : (
          <img src={spinner} className="h-[35px] w-[35px]" alt="spiner" />
        )}
      </button>
      {error && !submitting && (
        <p className="absolute-horiz bottom-[8px] h-fit text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  );
}
