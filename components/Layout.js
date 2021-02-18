import React from "react";
import Head from "next/head";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Login from "../pages/login";

const Layout = ({ children }) => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>CRM Administracion de clientes</title>
			</Head>
			{router.pathname === "/login" || router.pathname === "/nuevaCuenta" ? (
				<div className="flex flex-col justify-center min-h-screen bg-gray-800">
					<div>{children}</div>
				</div>
			) : (
				<div className="bg-gray-200 min-hscreen">
					<div className="flex min-h-screen">
						<Sidebar />
						<main className="p-5 xl:w-4/5 sm:w-2/3 sm:min-h-screen">
							{children}
						</main>
					</div>
				</div>
			)}
		</>
	);
};

export default Layout;
