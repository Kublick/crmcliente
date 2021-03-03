import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

const Pedidos = () => {
	return (
		<>
			<Layout>
				<h1 className="text-2xl font-light text-gray-800">Pedidos</h1>
				<Link href="/nuevopedido">
					<a className="inline-block px-5 py-2 mt-3 mb-3 text-sm font-bold text-white uppercase bg-blue-800 rounded hover:bg-gray-800">
						Nuevo Pedido
					</a>
				</Link>
			</Layout>
		</>
	);
};

export default Pedidos;
