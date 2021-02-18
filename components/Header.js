import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useRouter } from "next/router";

const OBTENER_USUARIO = gql`
	query obtenerUsuario {
		obtenerUsuario {
			id
			nombre
			apellido
		}
	}
`;

const Header = () => {
	const router = useRouter();

	//query apollo

	const { data, loading, error } = useQuery(OBTENER_USUARIO);

	// proteger que no accedamos a data

	if (loading) return null;
	const { nombre, apellido } = data.obtenerUsuario;

	if (!data) {
		return router.push("/login");
	}

	const cerrarSesion = () => {
		localStorage.removeItem("token");
		router.push("/login");
	};

	return (
		<div className="flex justify-between mb-6">
			<h1 className="mr-2">
				Hola {nombre} {apellido}
			</h1>

			<button
				type="button"
				className="w-full px-2 py-1 text-xs font-bold text-white uppercase bg-blue-800 rounded shadow-md sm:w-auto"
				onClick={() => cerrarSesion()}
			>
				Cerrar Sesion
			</button>
		</div>
	);
};

export default Header;
