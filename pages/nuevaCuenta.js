import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, gql } from "@apollo/client";
import { useRouter } from "next/router";

const NUEVA_CUENTA = gql`
	mutation nuevoUsuario($input: UsuarioInput) {
		nuevoUsuario(input: $input) {
			id
			nombre
			apellido
			email
		}
	}
`;

const NuevaCuenta = () => {
	const router = useRouter();
	//state para el mensaje
	const [mensaje, guardarMensaje] = useState(null);

	// Mutation para crear nuevos usuarios
	const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

	//validar Formulario

	const formik = useFormik({
		initialValues: {
			nombre: "",
			apellido: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required("El nombre es obligatorio"),
			apellido: Yup.string().required("El apellido es obligatorio"),
			email: Yup.string()
				.email("El email no es valido")
				.required("el email es obligatorio"),
			password: Yup.string()
				.required("El password no puede ir vacio")
				.min(6, "El password debe ser minimo 6 caracteres"),
		}),
		onSubmit: async (valores) => {
			const { nombre, apellido, email, password } = valores;

			try {
				const { data } = await nuevoUsuario({
					variables: {
						input: {
							nombre,
							apellido,
							email,
							password,
						},
					},
				});

				//usuario creado correctamente
				guardarMensaje(
					`Se creo correctamente el Usuario: ${data.nuevoUsuario.nombre}`
				);

				setTimeout(() => {
					guardarMensaje(null);
					router.push("/");
				}, 3000);

				// Redirigir al usuario
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
				{mensaje && mostrarMensaje()}
				<h1 className="text-2xl font-light text-center text-white">
					Crear Nueva Cuenta
				</h1>
				<div className="flex justify-center m-5">
					<div className="w-full max-w-sm">
						<form
							className="px-8 py-8 bg-white rounded shadow-md"
							onSubmit={formik.handleSubmit}
						>
							<div>
								<label htmlFor="nombre" className="form-label">
									Nombre
								</label>
								<input
									className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									type="text"
									id="nombre"
									placeholder="Nombre Usuario"
									value={formik.values.nombre}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.nombre &&
								formik.errors.nombre &&
								formik.touched.nombre ? (
									<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
										<p className="font-bold">Error</p>
										<p>{formik.errors.nombre}</p>
									</div>
								) : null}
							</div>
							<div className="py-4">
								<label htmlFor="apellido" className="form-label">
									Apellido
								</label>
								<input
									className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									type="text"
									id="apellido"
									placeholder="Apellido Usuario"
									value={formik.values.apellido}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
								{formik.touched.apellido &&
								formik.errors.apellido &&
								formik.touched.apellido ? (
									<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
										<p className="font-bold">Error</p>
										<p>{formik.errors.apellido}</p>
									</div>
								) : null}
							</div>
							<div>
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
									type="email"
									id="email"
									placeholder="Email Usuario"
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
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
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
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
								value="Crear Cuenta"
							/>
						</form>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default NuevaCuenta;
