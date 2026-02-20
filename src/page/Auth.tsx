import { useForm } from "react-hook-form";
import { createUser, getUsers } from "../services/user";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router";
import { useState } from "react";

type FormValues = {
  email: string;
  password: string;
};

interface ResolveProps {
  type: "success" | "error";
  message: string;
}

export function Auth() {
  const { fetchUser, user } = useAuth();
  const navigate = useNavigate();
  const { hash } = useLocation();

  const [resolve, setResolve] = useState<ResolveProps | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  async function onSubmit() {
    try {
      const match = users?.find((user) => {
        if (user.email === getValues("email")) {
          if (user.password === getValues("password")) {
            return true;
          }
        }
      });
      if (hash === "#signup") {
        if (match) {
          setResolve({
            type: "error",
            message: "This email already exists",
          });
          throw new Error(`This email already exists`);
        }
        const currentUser = await createUser({
          email: getValues("email"),
          password: getValues("password"),
        });
        if (currentUser) {
          reset();
          fetchUser(currentUser);
          setResolve({
            type: "success",
            message: "User registered with success!",
          });
          setTimeout(() => navigate("/"), 1500);
        }
      } else {
        if (match) {
          fetchUser(match);
          setResolve({
            type: "success",
            message: "User logged with success!",
          });
          setTimeout(() => navigate("/"), 1500);
        } else {
          setResolve({
            type: "error",
            message: "Email or password not valid",
          });
          throw new Error(`Email or password not valid`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
          {hash === "#login" && user ? <p>User logged id: {user.email}</p> : ""}
          {resolve && (
            <div
              className={
                resolve.type === "error" ? "error-message" : "success-message"
              }
            >
              {resolve.message}
            </div>
          )}
          <h1 className="page-title">
            {hash === "#signup" ? "Sign Up" : "Login"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-input"
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <span className="form-error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                className="form-input"
                id="password"
                type="password"
                {...register("password", {
                  minLength: {
                    message: "Password must be at least 6 characters",
                    value: 6,
                  },
                  maxLength: {
                    message: "Password mus be at less than 12 characters",
                    value: 12,
                  },
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <span className="form-error">{errors.password.message}</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {hash === "#signup" ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {hash === "#signup" ? (
              <p>
                Already have an account?{" "}
                <a href="#login" className="auth-link">
                  Login
                </a>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <a href="#signup" className="auth-link">
                  SignUp
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
