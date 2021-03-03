import React from "react";
import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import Router from "next/router";

const ELIMINAR_CLIENTE = gql`
	mutation eliminarCliente($id: ID!) {
		eliminarCliente(id: $id)
	}
`;

const OBTENER_CLIENTES_USUARIO = gql`
	query ObtenerClientesVendedor {
		obtenerClientesVendedor {
			id
			nombre
			apellido
			empresa
			email
		}
	}
`;

const Cliente = ({ cliente }) => {
	const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
		update(cache) {
			//obtener copia del objeto de cache

			const { obtenerClientesVendedor } = cache.readQuery({
				query: OBTENER_CLIENTES_USUARIO,
			});

			// Rescribir Cache
			cache.writeQuery({
				query: OBTENER_CLIENTES_USUARIO,
				data: {
					obtenerClientesVendedor: obtenerClientesVendedor.filter(
						(clienteActual) => clienteActual.id !== id
					),
				},
			});
		},
	});

	const { nombre, apellido, empresa, email, id } = cliente;

	//eliminar cliente

	const confirmarEliminarCliente = (id) => {
		Swal.fire({
			title: "¿Deseas Eliminar a este cliente?",
			text: "Esta accion no se puede deshacer!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, eliminar!",
			cancelButtonText: "No, cancelar",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					// Elimiar por id y mostrar la alerta
					const { data } = await eliminarCliente({
						variables: {
							id,
						},
					});

					Swal.fire("Eliminado!", data.eliminarCliente, "success");
				} catch (error) {
					console.log(error.message);
				}
			}
		});
	};

	const editarCiente = () => {
		Router.push({
			pathname: "/editarCliente/[id]",
			query: { id },
		});
	};

	return (
		<tr>
			<td className="px-4 py-2 border">
				{nombre} {apellido}
			</td>
			<td className="px-4 py-2 border">{empresa}</td>
			<td className="px-4 py-2 border">{email} </td>
			<td className="px-4 py-2 border">
				<button
					className="flex items-center justify-center w-full px-4 py-2 text-xs font-bold text-white uppercase bg-red-800 rounded-lg"
					onClick={() => confirmarEliminarCliente()}
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
					onClick={() => editarCiente()}
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
	);
};

export default Cliente;
