import React from "react";
import Layout from "../components/Layout";
import { useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const NUEVO_PRODUCTO = gql`
	mutation nuevoProducto($input: ProductoInput) {
		nuevoProducto(input: $input) {
			id
			nombre
			existencia
			precio
		}
	}
`;

const OBTENER_PRODUCTOS = gql`
	query obtenerProductos {
		obtenerProductos {
			id
			nombre
			precio
			existencia
		}
	}
`;

const NuevoProducto = () => {
	const router = useRouter();

	const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
		update(cache, { data: { nuevoProducto } }) {
			//obtener el objecto de cache

			const { obtenerProductos } = cache.readQuery({
				query: OBTENER_PRODUCTOS,
			});

			//rescribir el objeto

			cache.writeQuery({
				query: OBTENER_PRODUCTOS,
				data: {
					obtenerProductos: [...obtenerProductos, nuevoProducto],
				},
			});
		},
	});
	//Formulario nuevos productos

	const formik = useFormik({
		initialValues: {
			nombre: "",
			existencia: "",
			precio: "",
		},
		validationSchema: Yup.object({
			nombre: Yup.string().required("el nombre del producto es obligatorio"),
			existencia: Yup.number()
				.required("Agrega cantidad disponible")
				.positive("no se aceptan numeros negativos")
				.integer("la existencia debe ser numeros enteros"),
			precio: Yup.number()
				.required("El precio es requerido")
				.positive("No se aceptan precios negativos"),
		}),
		onSubmit: async (valores) => {
			const { nombre, precio, existencia } = valores;
			try {
				const { data } = await nuevoProducto({
					variables: {
						input: {
							nombre,
							precio,
							existencia,
						},
					},
				});

				// Mostrar Alerta
				Swal.fire("Creado", "se creo el producto correctamente", "success");
				// Redireccionar hacia productos

				router.push("/productos");
				console.log("paso por el push?");
			} catch (error) {
				console.log(error);
			}
		},
	});

	return (
		<Layout>
			<h1 className="text-2xl font-light text-gray-880">
				Crear Nuevo Producto
			</h1>
			<div className="flex justify-center mt-5">
				<div className="w-full max-w-lg">
					<form
						className="px-8 pt-6 pb-8 mb-4 bg-white shadow-md"
						onSubmit={formik.handleSubmit}
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
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.nombre}
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
						<div className="mt-4">
							<label htmlFor="existencia" className="form-label">
								Cantidad Disponible
							</label>
							<input
								className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
								type="number"
								id="existencia"
								placeholder="Cantidad Disponible"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.existencia}
							/>
							{formik.touched.existencia &&
							formik.errors.existencia &&
							formik.touched.existencia ? (
								<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
									<p className="font-bold">Error</p>
									<p>{formik.errors.existencia}</p>
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
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.precio}
							/>
							{formik.touched.precio &&
							formik.errors.precio &&
							formik.touched.precio ? (
								<div className="p-4 my-2 text-red-700 bg-red-100 border-l-4 border-red-500">
									<p className="font-bold">Error</p>
									<p>{formik.errors.precio}</p>
								</div>
							) : null}
						</div>
						<input
							type="submit"
							className="w-full p-2 mt-5 font-bold text-white uppercase bg-gray-800 hover:bg-gray-900"
							value="agregar nuevo producto"
						/>
					</form>
				</div>
			</div>
		</Layout>
	);
};

export default NuevoProducto;
