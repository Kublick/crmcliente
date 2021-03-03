import React from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Formik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const OBTENER_PRODUCTO = gql`
	query obtenerProducto($id: ID!) {
		obtenerProducto(id: $id) {
			nombre
			precio
			existencia
		}
	}
`;

const ACTUALIZAR_PRODUCTO = gql`
	mutation actualizarProducto($id: ID!, $input: ProductoInput) {
		actualizarProducto(id: $id, input: $input) {
			id
			nombre
			existencia
			precio
		}
	}
`;

const EditarProducto = () => {
	const router = useRouter();
	const {
		query: { id },
	} = router;

	// consultar para obtener el producto

	const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
		variables: {
			id,
		},
	});

	const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO, {});

	const schemaValidacion = Yup.object({
		nombre: Yup.string().required("el nombre del producto es obligatorio"),
		existencia: Yup.number()
			.required("Agrega cantidad disponible")
			.positive("no se aceptan numeros negativos")
			.integer("la existencia debe ser numeros enteros"),
		precio: Yup.number()
			.required("El precio es requerido")
			.positive("No se aceptan precios negativos"),
	});

	if (loading) return "Cargando....";

	if (!data) return "Accion no permitida";

	const { obtenerProducto } = data;

	const actualizarInfoProducto = async (valores) => {
		const { existencia, precio, nombre } = valores;

		try {
			const { data } = await actualizarProducto({
				variables: {
					id,
					input: {
						nombre,
						existencia,
						precio,
					},
				},
			});

			Swal.fire(
				"Correcto",
				"El producto se actualizo correctamente",
				"success"
			);
			router.push("/productos");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<h1 className="text-2xl font-light text-gray-800">Editar Producto</h1>

			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<Formik
						enableReinitialize
						initialValues={obtenerProducto}
						validationSchema={schemaValidacion}
						onSubmit={(valores) => {
							actualizarInfoProducto(valores);
						}}
					>
						{(props) => {
							return (
								<form
									className="px-8 pt-6 pb-8 mb-4 bg-white shadow-md"
									onSubmit={props.handleSubmit}
								>
									<div className="mt-4">
										<label htmlFor="nombre" className="form-label">
											Nombre
										</label>
										<input
											className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											type="text"
											id="nombre"
											placeholder="Nombre Producto"
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
									<div className="mt-4">
										<label htmlFor="existencia" className="form-label">
											Cantidad Disponible
										</label>
										<input
											className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											type="number"
											id="existencia"
											placeholder="Cantidad Disponible"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.existencia}
										/>
										{props.touched.existencia &&
										props.errors.existencia &&
										props.touched.existencia ? (
											<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
												<p className="font-bold">Error</p>
												<p>{props.errors.existencia}</p>
											</div>
										) : null}
									</div>
									<div className="mt-4">
										<label htmlFor="precio" className="form-label">
											Precio
										</label>
										<input
											className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
											type="number"
											id="precio"
											placeholder="Precio Producto"
											onChange={props.handleChange}
											onBlur={props.handleBlur}
											value={props.values.precio}
										/>
										{props.touched.precio &&
										props.errors.precio &&
										props.touched.precio ? (
											<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
												<p className="font-bold">Error</p>
												<p>{props.errors.precio}</p>
											</div>
										) : null}
									</div>
									<input
										type="submit"
										className="w-full p-2 mt-5 font-bold text-white uppercase bg-gray-800 hover:bg-gray-900"
										value="Editar Productos"
									/>
								</form>
							);
						}}
					</Formik>
				</div>
			</div>
		</Layout>
	);
};

export default EditarProducto;
