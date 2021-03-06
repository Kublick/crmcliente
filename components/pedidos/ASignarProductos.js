import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { gql, useQuery } from "@apollo/client";
import PedidoContext from "../../context/pedidos/PedidoContext";

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

const AsignarProductos = () => {
	const pedidoContext = useContext(PedidoContext);
	const { agregarProducto } = pedidoContext;

	const [productos, setProductos] = useState([]);

	const { loading, data, error } = useQuery(OBTENER_PRODUCTOS);

	const seleccionarProducto = (producto) => {
		setProductos(producto);
	};

	useEffect(() => {
		agregarProducto(productos);
	}, [productos]);

	if (loading) return null;

	const { obtenerProductos } = data;

	return (
		<>
			<p className="p-2 my-2 mt-10 text-sm font-bold text-gray-400 bg-white border-l-4 border-gray-800">
				2.- Selecciona o busca los productos
			</p>
			<Select
				className="mt-3"
				options={obtenerProductos}
				isMulti={true}
				onChange={(opcion) => seleccionarProducto(opcion)}
				getOptionValue={(opciones) => opciones.id}
				getOptionLabel={(opciones) =>
					`${opciones.nombre} - ${opciones.existencia} Disponibles`
				}
				placeholder="Busque o seleecione el Producto"
				noOptionsMessage={() => "No hay Resultados"}
			/>
		</>
	);
};

export default AsignarProductos;
