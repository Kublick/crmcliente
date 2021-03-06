import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import Pedido from "../components/pedidos/Pedido";

const OBTENER_PEDIDOS = gql`
	query obtenerPedidosVendedor {
		obtenerPedidosVendedor {
			id
			pedido {
				id
				cantidad
				nombre
			}
			cliente {
				id
				nombre
				apellido
				email
				telefono
			}
			vendedor
			total
			estado
		}
	}
`;

const Pedidos = () => {
	const { data, loading, error } = useQuery(OBTENER_PEDIDOS);

	console.log(data);

	if (loading) return "Cargando...";

	const { obtenerPedidosVendedor } = data;

	return (
		<>
			<Layout>
				<h1 className="text-2xl font-light text-gray-800">Pedidos</h1>
				<Link href="/nuevopedido">
					<a className="inline-block px-5 py-2 mt-3 mb-3 text-sm font-bold text-white uppercase bg-blue-800 rounded hover:bg-gray-800">
						Nuevo Pedido
					</a>
				</Link>
				{obtenerPedidosVendedor === 0 ? (
					<p className="mt-5 text-2xl text-center">No hay pedidos aun</p>
				) : (
					obtenerPedidosVendedor.map((pedido) => (
						<Pedido key={pedido.id} pedido={pedido} />
					))
				)}
			</Layout>
		</>
	);
};

export default Pedidos;
