import React, { useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";
import ProductoResumen from "./ProductoResumen";

const ResumenPedido = () => {
	const pedidoContext = useContext(PedidoContext);
	const { productos } = pedidoContext;

	console.log(productos);
	return (
		<div>
			<p className="p-2 my-2 mt-10 text-sm font-bold text-gray-400 bg-white border-l-4 border-gray-800">
				3.- Ajusta las cantidades de los productos
			</p>

			{productos.length > 0 ? (
				<>
					{productos.map((producto) => (
						<ProductoResumen key={producto.id} producto={producto} />
					))}
				</>
			) : (
				<p className="mt-5 text-sm">Aun no hay productos</p>
			)}
		</div>
	);
};

export default ResumenPedido;
