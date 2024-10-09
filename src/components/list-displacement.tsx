import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MapPin, Search } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import { useQuery } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { getVehiclesMovements, type Movement } from "@/http/get-displacement";

export function ListDisplacements() {
	const [inputFilter, setInputFilter] = useState("");
	const [movementsFiltred, setMovementsFiltred] = useState<Movement[]>([]);

	const { data } = useQuery({
		queryKey: ["movements"],
		queryFn: () => getVehiclesMovements(),
	});

	useEffect(() => {
		if (!data) {
			setMovementsFiltred([]);
			return;
		}

		const inputToLowerCase = inputFilter?.toLocaleLowerCase();

		const Filtred = data.filter((movement) => {
			const startLocation = movement.start_location
				.toLowerCase()
				.includes(inputToLowerCase);

			const endLocation = movement.end_location
				.toLowerCase()
				.includes(inputToLowerCase);

			const plate = movement.vehicle_plate
				.toLowerCase()
				.includes(inputToLowerCase);

			const movementDate = new Date(movement.movement_date).toLocaleDateString(
				"pt-BR",
			);
			const movementDateFiltred = movementDate.includes(inputFilter);

			return startLocation || endLocation || movementDateFiltred || plate;
		});

		setMovementsFiltred(Filtred);
	}, [inputFilter, data]);

	console.log(movementsFiltred);

	return (
		<div className="container p-4 mx-auto">
			<h1 className="mb-6 text-3xl font-bold">Lista de Deslocamentos</h1>
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center justify-between">
						<span>Deslocamentos Registrados</span>
						<MapPin className="w-6 h-6 text-primary" />
					</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4">
						<Label htmlFor="filtro" className="sr-only">
							Filtrar deslocamentos
						</Label>
						<div className="relative">
							<Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								id="filtro"
								placeholder="Filtrar deslocamentos..."
								className="pl-8"
								onChange={(e) => setInputFilter(e.target.value)}
							/>
						</div>
					</div>
					<div className="border rounded-md">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Placa</TableHead>
									<TableHead>Origem</TableHead>
									<TableHead>Destino</TableHead>
									<TableHead>Data</TableHead>
									<TableHead className="text-right">Km</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{movementsFiltred?.map((deslocamento) => (
									<TableRow key={deslocamento.id}>
										<TableCell className="font-medium">
											{deslocamento.vehicle_plate}
										</TableCell>
										<TableCell>{deslocamento.start_location}</TableCell>
										<TableCell>{deslocamento.end_location}</TableCell>
										<TableCell>
											{new Date(deslocamento.movement_date).toLocaleDateString(
												"pt-BR",
											)}
										</TableCell>
										<TableCell className="text-right">
											{deslocamento.distance} km
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
