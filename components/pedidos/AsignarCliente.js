import React, { useEffect, useState, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

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

const AsignarCliente = () => {
	const [cliente, setClientes] = useState([]);

	const pedidoContext = useContext(PedidoContext);
	const { agregarCliente } = pedidoContext;

	//Consultar DB

	const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

	const seleccionarCliente = (clientes) => {
		setClientes(clientes);
	};

	useEffect(() => {
		agregarCliente(cliente);
	}, [cliente]);

	if (loading) return null;

	const { obtenerClientesVendedor } = data;

	return (
		<div>
			<p className="p-2 my-2 mt-10 text-sm font-bold text-gray-400 bg-white border-l-4 border-gray-800">
				1.-Asigna un cliente al pedido
			</p>
			<Select
				className="mt-3"
				options={obtenerClientesVendedor}
				onChange={(opcion) => seleccionarCliente(opcion)}
				getOptionValue={(opciones) => opciones.id}
				getOptionLabel={(opciones) => opciones.nombre}
				placeholder="Busque o seleecione el Cliente"
				noOptionsMessage={() => "No hay Resultados"}
			/>
		</div>
	);
};

export default AsignarCliente;
