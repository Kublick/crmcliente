import React from "react";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import Producto from "../components/Producto";
import Link from "next/link";

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

const Productos = () => {
	//Consultar productor
	const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);
	if (loading) return "cargando...";
	console.log(data);

	return (
		<>
			<Layout>
				<h1 className="text-2xl font-light text-gray-800">Productos</h1>
				<Link href="/nuevoproducto">
					<a className="inline-block px-5 py-2 mt-3 mb-3 text-sm font-bold text-white uppercase bg-blue-800 rounded hover:bg-gray-800 hover:text-gray-200">
						Nuevo Producto
					</a>
				</Link>
				<table className="w-full mt-10 shadow-md table-auto w-lg">
					<thead className="bg-gray-800">
						<tr className="text-white">
							<th className="w-1/5 py-2">Nombre</th>
							<th className="w-1/5 py-2">Existencia</th>
							<th className="w-1/5 py-2">Precio</th>
							<th className="w-1/5 py-2">Eliminar</th>
							<th className="w-1/5 py-2">Editar</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{data.obtenerProductos.map((producto) => (
							<Producto key={producto.id} producto={producto} />
						))}
					</tbody>
				</table>
			</Layout>
		</>
	);
};

export default Productos;
