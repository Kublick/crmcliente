import React, { useContext } from "react";
import PedidoContext from "../../context/pedidos/PedidoContext";

const Total = () => {
	const pedidoContext = useContext(PedidoContext);
	const { total } = pedidoContext;

	return (
		<div className="flex items-center justify-between p-3 mt-5 bg-white">
			<h2 className="mt-0 text-lg text-gray-800">Total</h2>
			<p className="mt-0 text-gray-800">$ {total}</p>
		</div>
	);
};

export default Total;
