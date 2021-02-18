import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
	const router = useRouter();

	console.log(router.pathname);
	return (
		<>
			<aside className="p-5 bg-gray-800 sm:w-1/3 xl:w-64 sm:min-h-screen">
				<div className="text-2xl font-black text-white">CRM Clientes</div>

				<nav className="mt-5 list-none">
					<li className={router.pathname === "/" ? "bg-blue-800 p-2" : "p-2"}>
						<Link href="/">
							<a className="block text-white ">Clientes</a>
						</Link>
					</li>
					<li
						className={
							router.pathname === "/pedidos" ? "bg-blue-800 p-2" : "p-2"
						}
					>
						<Link href="/pedidos">
							<a className="block text-white">Pedidos</a>
						</Link>
					</li>
					<li
						className={
							router.pathname === "/productos" ? "bg-blue-800 p-2" : "p-2"
						}
					>
						<Link href="/productos">
							<a className="block text-white">Productos</a>
						</Link>
					</li>
				</nav>
			</aside>
		</>
	);
};

export default Sidebar;
