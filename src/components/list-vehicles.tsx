import { getVehicles } from "@/http/get-vehicles";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { useQuery } from "@tanstack/react-query";

export function ListVehicles() {
	const { data } = useQuery({
		queryKey: ["vehicles"],
		queryFn: () => getVehicles(),
	});

	if (!data) {
		return null;
	}
	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			<h2 className="mb-4 text-2xl font-semibold">Lista de Veículos</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Placa</TableHead>
						<TableHead>Modelo</TableHead>
						<TableHead>Ano</TableHead>
						<TableHead>Marca</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((vehicle) => (
						<TableRow key={vehicle.id}>
							<TableCell>{vehicle.plate}</TableCell>
							<TableCell>{vehicle.model}</TableCell>
							<TableCell>{vehicle.year}</TableCell>
							<TableCell>{vehicle.brand}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
