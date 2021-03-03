import React from "react";
import Swal from "sweetalert2";
import { gql, useMutation } from "@apollo/client";
import Router from "next/router";


const ELIMINAR_PRODUCTO = gql`
	mutation eliminarProducto($id: ID!) {
		eliminarProducto(id: $id)
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

const Producto = ({ producto }) => {
	const { nombre, precio, existencia, id } = producto;
	//Mutation para eliminar productos

	const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
		update(cache) {
			const { obtenerProductos } = cache.readQuery({
				query: OBTENER_PRODUCTOS,
			});
			cache.writeQuery({
				query: OBTENER_PRODUCTOS,
				data: {
					obtenerProductos: obtenerProductos.filter(
						(productoActual) => productoActual.id !== id
					),
				},
			});
		},
	});

	const confirmarEliminarProducto = () => {
		Swal.fire({
			title: "¿Deseas Eliminar a este producto?",
			text: "Esta accion no se puede deshacer!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar!",
			cancelButtonText: "No, cancelar",
		}).then(async (result) => {
			if (result.value) {
				try {
					console.log("entro");
					//Elimiar por id y mostrar la alerta
					const { data } = await eliminarProducto({
						variables: {
							id,
						},
					});
					Swal.fire("Correcto", data.eliminarProducto, "success");
				} catch (error) {
					console.log(error.message);
				}
			}
		});
	};

	const editarProducto = () => {
		Router.push({
			pathname: "/editProducto/[id]",
			query: { id },
		});
	};

	return (
		<>
			<tr>
				<td className="px-4 py-2 border">{nombre}</td>
				<td className="px-4 py-2 border">{existencia}</td>
				<td className="px-4 py-2 border">$ {precio}</td>
				<td className="px-4 py-2 border">
					<button
						className="flex items-center justify-center w-full px-4 py-2 text-xs font-bold text-white uppercase bg-red-800 rounded-lg"
						onClick={() => confirmarEliminarProducto()}
					>
						Eliminar
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							className="w-4 h-4 ml-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				</td>
				<td className="px-4 py-2 border">
					<button
						className="flex items-center justify-center w-full px-4 py-2 text-xs font-bold text-white uppercase bg-green-600 rounded-lg"
						onClick={() => editarProducto()}
					>
						Editar
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							className="w-4 h-4 ml-2"
						>
							<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
							<path
								fillRule="evenodd"
								d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
								clipRule="evenodd"
							/>
						</svg>
					</button>
				</td>
			</tr>
		</>
	);
};

export default Producto;
