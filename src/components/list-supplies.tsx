import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { useQuery } from "@tanstack/react-query";
import { getVehiclesSupplies } from "@/http/get-supplies";

export function ListSupplies() {
	const { data } = useQuery({
		queryKey: ["supplies"],
		queryFn: () => getVehiclesSupplies(),
	});

	const formatPrice = (price: string) => {
		const priceNumber = Number.parseFloat(price);
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(priceNumber);
	};

	const formatMileage = (mileage: string) => {
		const mileageNumber = Number.parseFloat(mileage);

		return new Intl.NumberFormat("pt-BR").format(mileageNumber);
	};

	if (!data) {
		return null;
	}
	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			<h2 className="mb-4 text-2xl font-semibold">Lista de Abastecimentos</h2>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Placa</TableHead>
						<TableHead>Tipo</TableHead>
						<TableHead>KM</TableHead>
						<TableHead>Preço</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((vehicle) => (
						<TableRow key={vehicle.id}>
							<TableCell>{vehicle.vehicle_plate}</TableCell>
							<TableCell className="capitalize">{vehicle.fuel_type}</TableCell>
							<TableCell>{formatMileage(vehicle.mileage)}</TableCell>
							<TableCell>{formatPrice(vehicle.price)}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
