import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ListVehicles } from "@/components/list-vehicles";
import { CreateVehicles } from "@/components/create-vehicles";
import { CreateDisplacement } from "@/components/create-displacement";
import { ListDisplacements } from "@/components/list-displacement";
import { CreateSuplly } from "@/components/create-supply";

export default function GerenciamentoVeiculos() {
	return (
		<div className="container p-4 mx-auto">
			<h1 className="mb-6 text-3xl font-bold">
				Sistema de Gerenciamento de Veículos
			</h1>
			<Tabs defaultValue="veiculos">
				<TabsList className="grid w-full grid-cols-5 mb-4">
					<TabsTrigger value="veiculos">Veículos</TabsTrigger>
					<TabsTrigger value="create-displacement">Deslocamento</TabsTrigger>
					<TabsTrigger value="supply">Abastecimento</TabsTrigger>
					<TabsTrigger value="list">Lista de Veículos</TabsTrigger>
					<TabsTrigger value="list-displacement">
						Lista de Deslocamentos
					</TabsTrigger>
				</TabsList>
				<TabsContent value="veiculos">
					<CreateVehicles />
				</TabsContent>
				<TabsContent value="create-displacement">
					<CreateDisplacement />
				</TabsContent>
				<TabsContent value="supply">
					<CreateSuplly />
				</TabsContent>
				<TabsContent value="list">
					<ListVehicles />
				</TabsContent>

				<TabsContent value="list-displacement">
					<ListDisplacements />
				</TabsContent>
			</Tabs>
		</div>
	);
}
