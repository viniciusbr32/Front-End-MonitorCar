import toast, { Toaster } from "react-hot-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { getVehicles } from "@/http/get-vehicles";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { PostSupply } from "@/http/post-supply";

export function CreateSuplly() {
	const [vehicleId, setVehicleId] = useState<string>("");
	const [fuelType, setFuelType] = useState<string>("");
	const [fuelAmount, setFuelAmount] = useState<number>();
	const [fuelPrice, setFuelPrice] = useState<number>();
	const [odometerReading, setOdometerReading] = useState<number>();

	const { data } = useQuery({
		queryKey: ["vehicles"],
		queryFn: () => getVehicles(),
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (
			!fuelType ||
			!fuelAmount ||
			!fuelPrice ||
			!odometerReading ||
			!vehicleId
		) {
			toast.error("Todos os campos são obrigatórios");
			return;
		}

		try {
			await PostSupply({
				vehicle_id: vehicleId,
				price: fuelPrice,
				mileage: odometerReading,
				fuel_type: fuelType,
			});
			toast.success("Abastecimento cadastrado com sucesso");
		} catch (error) {
			toast.error("error");
			console.log(error);
		} finally {
			setFuelAmount(0);
			setFuelPrice(0);
			setFuelType("");
			setOdometerReading(0);
			setVehicleId("");
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			<h2 className="mb-4 text-2xl font-semibold">Registrar Abastecimento</h2>
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
						{Array.isArray(data) &&
							data.length > 0 &&
							data.map((vehicle) => (
								<option key={vehicle.id} value={vehicle.id}>
									{vehicle.plate} - {vehicle.model}
								</option>
							))}
					</select>
				</div>
				<div>
					<Label htmlFor="fuelType">Tipo de Combustível</Label>
					<Select value={fuelType} onValueChange={setFuelType} required>
						<SelectTrigger id="fuelType">
							<SelectValue placeholder="Selecione o tipo de combustível" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="gasoline">Gasolina</SelectItem>
							<SelectItem value="ethanol">Etanol</SelectItem>
							<SelectItem value="diesel">Diesel</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label htmlFor="fuelAmount">Quantidade (Litros)</Label>
					<Input
						id="fuelAmount"
						value={fuelAmount === 0 ? "" : fuelAmount}
						onChange={(e) => setFuelAmount(Number(e.target.value))}
						type="number"
						step="0.01"
						placeholder="0.00"
						required
					/>
				</div>
				<div>
					<Label htmlFor="fuelPrice">Preço Total (R$)</Label>
					<Input
						id="fuelPrice"
						value={fuelPrice === 0 ? "" : fuelPrice}
						onChange={(e) => setFuelPrice(Number(e.target.value))}
						type="number"
						step="0.01"
						min="0"
						placeholder="0.00"
						required
					/>
				</div>
				<div>
					<Label htmlFor="odometerReading">Leitura do Odômetro (km)</Label>
					<Input
						id="odometerReading"
						value={odometerReading === 0 ? " " : odometerReading}
						onChange={(e) => setOdometerReading(Number(e.target.value))}
						type="number"
						placeholder="0"
						required
					/>
				</div>
				<Button type="submit">Registrar Abastecimento</Button>
			</form>
			<Toaster />
		</div>
	);
}
