
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "@/http/get-vehicles";
import { PostMovimentacoes } from "@/http/post-displacement";

export function CreateDisplacement() {
	const [vehicleId, setVehicleId] = useState("");
	const [startLocation, setStartLocation] = useState("");
	const [endLocation, setEndLocation] = useState("");
	const [distance, setDistance] = useState(0);

	console.log(startLocation);
	console.log(vehicleId);

	const { data } = useQuery({
		queryKey: ["vehicles"],
		queryFn: () => getVehicles(),
		staleTime: 1000 * 60,
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!vehicleId || !startLocation || !endLocation || !distance) {
			toast.error("Todos os campos são obrigatórios");
			return;
		}

		try {
			await PostMovimentacoes({
				start_location: startLocation,
				end_location: endLocation,
				vehicle_id: vehicleId,
				distance: distance,
			});
			toast.success("Deslocamento cadastrado com sucesso");
		} catch (error) {
			toast.error("error");
			console.log(error);
		} finally {
			setVehicleId("");
			setStartLocation("");
			setEndLocation("");
			setDistance(0);
		}
	};

	if (!data) {
		return null;
	}

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			<h2 className="mb-4 text-2xl font-semibold">Registrar Deslocamento</h2>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div>
					<Label htmlFor="veiculo">Veículo</Label>
					<select
						id="veiculo"
						className="w-full p-2 border rounded-md"
						onChange={(e) => setVehicleId(e.target.value)}
						value={vehicleId}
					>
						<option>Selecione uma opção</option>
						{data.map((vehicle) => (
							<option key={vehicle.id} value={vehicle.id}>
								{vehicle.plate} - {vehicle.model}
							</option>
						))}
					</select>
				</div>
				<div>
					<Label htmlFor="startLocation">Origem</Label>
					<Input
						id="startLocation"
						placeholder="Local de origem"
						value={startLocation}
						onChange={(e) => setStartLocation(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label htmlFor="endLocation">Destino</Label>
					<Input
						id="endLocation"
						placeholder="Local de destino"
						value={endLocation}
						onChange={(e) => setEndLocation(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label htmlFor="distance">Quilometragem</Label>
					<Input
						id="distance"
						type="number"
						placeholder="Distância em km"
						value={distance === 0 ? "" : distance}
						onChange={(e) => setDistance(Number(e.target.value))}
						required
					/>
				</div>
				<Button type="submit">Registrar Deslocamento</Button>
			</form>
			<Toaster />
		</div>
	);
}
