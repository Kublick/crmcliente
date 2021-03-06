import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";

const ACTUALIZAR_PEDIDO = gql`
	mutation actualizarPedido($id: ID!, $input: PedidoInput) {
		actualizarPedido(id: $id, input: $input) {
			estado
		}
	}
`;

const OBTENER_PEDIDOS = gql`
	query obtenerPedidosVendedor {
		obtenerPedidosVendedor {
			id
		}
	}
`;

const ELIMINAR_PEDIDO = gql`
	mutation eliminarPedido($id: ID!) {
		eliminarPedido(id: $id)
	}
`;

const Pedido = ({ pedido }) => {
	const {
		id,
		total,
		cliente: { nombre, apellido, telefono, email },
		estado,
		cliente,
	} = pedido;

	const [estadoPedido, setEstadoPedido] = useState(estado);

	const [clase, setClase] = useState("");

	const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);
	const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
		update(cache) {
			const { obtenerPedidosVendedor } = cache.readQuery({
				query: OBTENER_PEDIDOS,
			});

			cache.writeQuery({
				query: OBTENER_PEDIDOS,
				data: {
					obtenerPedidosVendedor: obtenerPedidosVendedor.filter(
						(pedido) => pedido.id !== id
					),
				},
			});
		},
	});

	useEffect(() => {
		if (estadoPedido) {
			setEstadoPedido(estadoPedido);
		}
		clasePedido();
	}, [estadoPedido]);

	//Modifica el color del pedido de acuerdo a su estado

	const clasePedido = () => {
		if (estadoPedido === "PENDIENTE") {
			setClase("border-yellow-500");
		} else if (estadoPedido === "COMPLETADO") {
			setClase("border-green-500");
		} else {
			setClase("border-red-800");
		}
	};

	const cambiarEstadoPedido = async (nuevoEstado) => {
		try {
			const { data } = await actualizarPedido({
				variables: {
					id,
					input: {
						estado: nuevoEstado,
						cliente: cliente.id,
					},
				},
			});

			setEstadoPedido(data.actualizarPedido.estado);
		} catch (error) {
			console.log(error);
		}
	};

	const confirmarEliminarPedido = async () => {
		try {
			Swal.fire({
				title: "¿Deseas eliminar este pedido?",
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
						await eliminarPedido({
							variables: {
								id,
							},
						});

						Swal.fire("Eliminado!", data.eliminarPedido, "success");
					} catch (error) {
						console.log(error.message);
					}
				}
			});
		} catch (error) {
			console.log(error);
		}

		console.log(id);
	};

	return (
		<>
			<div
				className={`${clase} border-t-4 p-6 mt-4 bg-white rounded shadow-lg md:grid md:grid-cols-2 md:gap-4`}
			>
				<div>
					<p className="font-bold text-gray-800">
						Cliente: {nombre} {apellido}
					</p>
					{email && (
						<p className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-4 h-4 mr-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
								/>
							</svg>
							{email}
						</p>
					)}

					{telefono && (
						<p className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								className="w-4 h-4 mr-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
								/>
							</svg>
							{telefono}
						</p>
					)}

					<h2 className="mt-10 font-bold text-gray-800">Estado pedido:</h2>
					<select
						className="p-2 mt-2 text-xs leading-tight text-center text-white uppercase bg-blue-600 border border-blue-600 rounded appearance-none focus:outline-none focus:bg-blue-600 focus:border-blue-500"
						value={estadoPedido}
						onChange={(e) => cambiarEstadoPedido(e.target.value)}
					>
						<option value="PENDIENTE">Pendiente</option>
						<option value="CANCELADO">Cancelado</option>
						<option value="COMPLETADO">Completado</option>
					</select>
				</div>

				<div>
					<h2 className="mt-2 font-bold text-gray-800">Resumen del pedido</h2>
					{pedido.pedido.map((articulo) => (
						<div key={articulo.id} className="mt-4">
							<p className="text-sm text-gray-600">
								Producto: {articulo.nombre}{" "}
							</p>
							<p className="text-sm text-gray-600">
								Cantidad: {articulo.cantidad}
							</p>
						</div>
					))}
					<p className="mt-3 font-bold text-gray-800">
						Total a pagar: <span className="font-light"> $ {total}</span>
					</p>
					<button
						className="flex items-center px-5 py-2 mt-4 text-xs font-bold leading-tight text-white uppercase bg-red-800 rounded"
						onClick={() => confirmarEliminarPedido()}
					>
						Eliminar Pedidos
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
				</div>
			</div>
		</>
	);
};

export default Pedido;
