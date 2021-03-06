import React, { useReducer } from "react";
import PedidoContext from "./PedidoContext";
import {
	SELECCIONAR_CLIENTE,
	SELECCIONAR_PRODUCTO,
	CANTIDAD_PRODUCTO,
	ACTUALIZAR_TOTAL,
} from "../../types";
import PedidoReducer from "./PedidoReducer";

const PedidoState = ({ children }) => {
	const initialState = {
		cliente: {},
		productos: [],
		total: 0,
	};

	const [state, dispatch] = useReducer(PedidoReducer, initialState);

	// Modifica el cliente

	const agregarCliente = (cliente) => {
		dispatch({
			type: SELECCIONAR_CLIENTE,
			payload: cliente,
		});
	};

	// Modifica Producto

	const agregarProducto = (productosSeleccionados) => {
		let nuevoState;
		if (state.productos.length > 0) {
			//tomar del segundo arreglo un copia
			nuevoState = productosSeleccionados.map((producto) => {
				const nuevoObjeto = state.productos.find(
					(productoState) => productoState.id === producto.id
				);
				return {
					...producto,
					...nuevoObjeto,
				};
			});
		} else {
			nuevoState = productosSeleccionados;
		}

		dispatch({
			type: SELECCIONAR_PRODUCTO,
			payload: nuevoState,
		});
	};

	//Modifica cantidades de los productos
	const cantidadProductos = (nuevoProducto) => {
		dispatch({
			type: CANTIDAD_PRODUCTO,
			payload: nuevoProducto,
		});
	};

	const actualizarTotal = () => {
		dispatch({ type: ACTUALIZAR_TOTAL });
	};

	return (
		<PedidoContext.Provider
			value={{
				cliente: state.cliente,
				productos: state.productos,
				total: state.total,
				agregarCliente,
				agregarProducto,
				cantidadProductos,
				actualizarTotal,
			}}
		>
			{children}
		</PedidoContext.Provider>
	);
};

export default PedidoState;
