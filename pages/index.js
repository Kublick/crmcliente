import Head from "next/head";
import Layout from "../components/Layout";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";

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

const Index = () => {
	const router = useRouter();

	/// Consulta de Apollo

	const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

	if (loading) return <p> Cargando...</p>;

	if (!data.obtenerClientesVendedor) {
		return router.push("/login");
	}

	return (
		<p>
			<Layout>
				<h1 className="text-2xl font-light text-gray-800">Clientes</h1>

				<Link href="/nuevoCliente">
					<a className="inline-block px-5 py-2 mt-3 mb-3 text-sm font-bold text-white uppercase bg-blue-800 rounded hover:bg-gray-800">
						Nuevo Cliente
					</a>
				</Link>
				<table className="w-full mt-10 shadow-md table-auto w-lg">
					<thead className="bg-gray-800">
						<tr className="text-white">
							<th className="w-1/5 py-2">Nombre</th>
							<th className="w-1/5 py-2">Empresa</th>
							<th className="w-1/5 py-2">Email</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{data.obtenerClientesVendedor.map((cliente) => (
							<tr key={cliente.id}>
								<td className="px-4 py-2 border">
									{cliente.nombre} {cliente.apellido}
								</td>
								<td className="px-4 py-2 border">{cliente.empresa}</td>
								<td className="px-4 py-2 border">{cliente.email} </td>
							</tr>
						))}
					</tbody>
				</table>
			</Layout>
		</p>
	);
};

export default Index;
