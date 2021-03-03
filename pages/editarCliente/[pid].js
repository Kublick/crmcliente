import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useQuery, gql, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const OBTENER_CLIENTE = gql`
	query obtenerCliente($id: ID!) {
		obtenerCliente(id: $id) {
			nombre
			email
			apellido
			empresa
			telefono
		}
	}
`;

const ACTUALZAR_CLIENTE = gql`
	mutation actualizarCliente($id: ID!, $input: ClienteInput) {
		actualizarCliente(id: $id, input: $input) {
			nombre
			email
			empresa
		}
	}
`;

const EditarCliente = () => {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
		variables: {
			id,
		},
	});

	const [actualizarCliente] = useMutation(ACTUALZAR_CLIENTE);

	//Schema Validation
	const schemaValidacion = Yup.object({
		nombre: Yup.string().required("El nombre del cliente es obligatorio"),
		apellido: Yup.string().required("El apellido del cliente es obligatorio"),
		empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
		email: Yup.string()
			.required("El email del cliente es obligatorio")
			.email("Email no valido"),
	});

	if (loading) return "Cargando...";

	const { obtenerCliente } = data;

	//Modifica cliente en DB
	const actualizarInfoCliente = async (valores) => {
		const { nombre, apellido, empresa, email, telefono } = valores;
		try {
			const { data } = await actualizarCliente({
				variables: {
					id,
					input: {
						nombre,
						apellido,
						empresa,
						email,
						telefono,
					},
				},
			});

			Swal.fire(
				"Actualizado",
				"Cliente se Actualizo Satisfactoriamente",
				"sucess"
			);

			router.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<h1 className="text-2xl font-light text-gray-800">Editar Cliente</h1>
			<div className="flex justify-center mt-5">
				<Formik
					validationSchema={schemaValidacion}
					enableReinitialize
					initialValues={obtenerCliente}
					onSubmit={(valores) => {
						actualizarInfoCliente(valores);
					}}
				>
					{(props) => {
						return (
							<form
								className="px-8 pt-6 pb-8 mb-4 bg-white shadow-md"
								onSubmit={props.handleSubmit}
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
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.nombre}
										/>
										{props.touched.nombre &&
										props.errors.nombre &&
										props.touched.nombre ? (
											<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
												<p className="font-bold">Error</p>
												<p>{props.errors.nombre}</p>
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
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.apellido}
										/>
										{props.touched.apellido &&
										props.errors.apellido &&
										props.touched.apellido ? (
											<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
												<p className="font-bold">Error</p>
												<p>{props.errors.apellido}</p>
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
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.empresa}
										/>
										{props.touched.empresa &&
										props.errors.empresa &&
										props.touched.empresa ? (
											<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
												<p className="font-bold">Error</p>
												<p>{props.errors.empresa}</p>
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
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.email}
										/>
										{props.touched.email &&
										props.errors.email &&
										props.touched.email ? (
											<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
												<p className="font-bold">Error</p>
												<p>{props.errors.email}</p>
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
											placeholder="numero telefonico"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.telefono}
										/>
									</div>
								</div>
								<input
									type="submit"
									className="w-full p-2 mt-5 font-bold text-white uppercase bg-gray-800 hover:bg-gray-900"
									value="editar cliente"
								/>
							</form>
						);
					}}
				</Formik>
			</div>
		</Layout>
	);
};

export default EditarCliente;
