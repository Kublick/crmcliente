import React from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";

const NuevoCliente = () => {
	const formik = useFormik({
		initialValues: {
			nombre: "",
			apellido: "",
			empresa: "",
			email: "",
			telefono: "",
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required("El nombre del cliente es obligatorio"),
			apellido: Yup.string().required("El apellido del cliente es obligatorio"),
			empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
			email: Yup.string()
				.required("El email del cliente es obligatorio")
				.email("Email no valido"),
		}),
		onSubmit: (valores) => {
			console.log(valores);
		},
	});

	return (
		<Layout>
			<h1 className="text-2xl font-light text-gray-800">Nuevo Cliente</h1>
			<div className="flex justify-center mt-5">
				<form
					className="px-8 pt-6 pb-8 mb-4 bg-white shadow-md"
					onSubmit={formik.handleSubmit}
				>
					<div className="w-full max-w-lg">
						<div>
							<label htmlFor="nombre" className="form-label">
								Nombre
							</label>
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								type="text"
								id="nombre"
								placeholder="Nombre Usuario"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								values={formik.values.email}
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
						<div>
							<label htmlFor="apellido" className="mt-4 form-label">
								Apellido
							</label>
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								type="text"
								id="apellido"
								placeholder="Apellido Usuario"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								values={formik.values.email}
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
							<label htmlFor="empresa" className="mt-4 form-label">
								Empresa
							</label>
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								type="text"
								id="empresa"
								placeholder="Nombre Empresa"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								values={formik.values.email}
							/>
							{formik.touched.empresa &&
							formik.errors.empresa &&
							formik.touched.empresa ? (
								<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
									<p className="font-bold">Error</p>
									<p>{formik.errors.empresa}</p>
								</div>
							) : null}
						</div>
						<div>
							<label htmlFor="email" className="mt-4 form-label ">
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
							<label htmlFor="telefono" className="mt-4 form-label ">
								Telefono
							</label>
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								type="tel"
								id="telefono"
								placeholder="Email Usuario"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								values={formik.values.email}
							/>
							{/* {formik.touched.email &&
							formik.errors.email &&
							formik.touched.email ? (
								<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
									<p className="font-bold">Error</p>
									<p>{formik.errors.email}</p>
								</div>
							) : null} */}
						</div>
					</div>
					<input
						type="submit"
						className="w-full p-2 mt-5 font-bold text-white uppercase bg-gray-800 hover:bg-gray-900"
						value="registrar cliente"
					/>
				</form>
			</div>
		</Layout>
	);
};

export default NuevoCliente;
