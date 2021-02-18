import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const AUTENTICAR_USUARIO = gql`
	mutation autenticarUsuario($input: AutenticarInput) {
		autenticarUsuario(input: $input) {
			token
		}
	}
`;

const Login = () => {
	const router = useRouter();
	const [mensaje, guardarMensaje] = useState(null);
	// Mutation para crear nuevos usuarios en Apollo

	const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("El email no es valido")
				.required("El email es requerido"),
			password: Yup.string().required("El password es obligatorio"),
		}),
		onSubmit: async (valores) => {
			const { email, password } = valores;

			try {
				const { data } = await autenticarUsuario({
					variables: {
						input: {
							email,
							password,
						},
					},
				});

				guardarMensaje("Autenticando...");

				//Guardar Token en localStorage

				const { token } = data.autenticarUsuario;
				localStorage.setItem("token", token);

				setTimeout(() => {
					guardarMensaje(null);
					router.push("/");
				}, 1500);
			} catch (error) {
				guardarMensaje(error.message);
				setTimeout(() => {
					guardarMensaje(null);
				}, 3000);
			}
		},
	});

	const mostrarMensaje = () => {
		return (
			<>
				<p className="w-full max-w-sm px-3 py-2 mx-auto my-3 text-center bg-white rounded-full">
					{mensaje}
				</p>
			</>
		);
	};

	return (
		<>
			<Layout>
				<h1 className="text-2xl font-light text-center text-white">Login</h1>
				{mensaje && mostrarMensaje()}
				<div className="flex justify-center m-5">
					<div className="w-full max-w-sm">
						<form
							className="px-8 py-8 bg-white rounded shadow-md"
							onSubmit={formik.handleSubmit}
						>
							<div>
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									type="email"
									id="email"
									placeholder="Email Usuario"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									values={formik.values.email}
								/>
								{formik.touched.email &&
								formik.errors.email &&
								formik.touched.email ? (
									<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
										<p className="font-bold">Error</p>
										<p>{formik.errors.email}</p>
									</div>
								) : null}
							</div>
							<div>
								<label htmlFor="password" className="mt-4 form-label">
									Password
								</label>
								<input
									className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									type="password"
									id="password"
									placeholder="Password Usuario"
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									values={formik.values.password}
								/>
								{formik.touched.password &&
								formik.errors.password &&
								formik.touched.password ? (
									<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
										<p className="font-bold">Error</p>
										<p>{formik.errors.password}</p>
									</div>
								) : null}
							</div>
							<input
								type="submit"
								className="w-full p-2 mt-5 text-white uppercase bg-gray-800 hover:bg-gray-900"
								value="iniciar sesion"
							/>
						</form>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default Login;
