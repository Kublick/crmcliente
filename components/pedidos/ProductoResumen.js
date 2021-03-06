import React, { useContext, useState, useEffect } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";

const ProductoResumen = ({ producto }) => {
	const pedidoContext = useContext(PedidoContext);
	const { cantidadProductos, actualizarTotal } = pedidoContext;

	const [cantidad, setCantidad] = useState(0);

	useEffect(() => {
		actualizarCantidad();
		actualizarTotal();
	}, [cantidad]);

	const actualizarCantidad = () => {
		const nuevoProducto = { ...producto, cantidad: Number(cantidad) };
		cantidadProductos(nuevoProducto);
	};

	const { nombre, precio } = producto;

	return (
		<div className="mt-5 md:flex md:justify-between md:items-center">
			<div className="mb-2 md:w-2/4 md:mb-0">
				<p className="text-sm">{nombre}</p>
				<p className="text-sm">$ {precio}</p>
			</div>
			<input
				type="number"
				placeholder="Cantidad"
				className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none fouycs:shadow-outline md:ml-4"
				value={cantidad}
				onChange={(e) => setCantidad(e.target.value)}
			/>
		</div>
	);
};

export default ProductoResumen;
