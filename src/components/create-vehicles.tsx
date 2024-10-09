import { PostCadastroVehicle } from "@/http/post-vehicles";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export function CreateVehicles() {
	const [vehicleModel, setVehicleModel] = useState("");
	const [vehicleBrand, setVehicleBrand] = useState("");
	const [vehiclePlate, setVehiclePlate] = useState("");
	const [vehicleYear, setVehicleYear] = useState(0);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!vehicleModel || !vehicleBrand || !vehiclePlate || !vehicleYear) {
			toast.error("Todos os campos são obrigatórios");
			return;
		}

		try {
			await PostCadastroVehicle({
				model: vehicleModel,
				brand: vehicleBrand,
				plate: vehiclePlate,
				year: vehicleYear,
			});
			toast.success("Usuário cadastrado com sucesso");
		} catch (error) {
			toast.error("error");
			console.log(error);
		} finally {
			setVehicleBrand("");
			setVehicleModel("");
			setVehiclePlate("");
			setVehicleYear(0);
		}
	};

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			<h2 className="mb-4 text-2xl font-semibold">Cadastrar Novo Veículo</h2>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<div>
					<Label htmlFor="plate">Placa</Label>
					<Input
						id="plate"
						value={vehiclePlate}
						name="plate"
						placeholder="ABC1234"
						required
						onChange={(e) => setVehiclePlate(e.target.value)}
					/>
				</div>
				<div>
					<Label htmlFor="brand">Marca</Label>
					<Input
						id="brand"
						value={vehicleBrand}
						name="brand"
						placeholder="VolksWagem"
						required
						onChange={(e) => setVehicleBrand(e.target.value)}
					/>
				</div>

				<div>
					<Label htmlFor="model">Modelo</Label>
					<Input
						id="model"
						value={vehicleModel}
						name="model"
						type="text"
						placeholder="GOL"
						onChange={(e) => setVehicleModel(e.target.value)}
						required
					/>
				</div>
				<div>
					<Label htmlFor="year">Ano</Label>
					<Input
						id="year"
						value={vehicleYear === 0 ? "" : vehicleYear}
						name="year"
						type="number"
						placeholder="2023"
						onChange={(e) => setVehicleYear(Number(e.target.value))}
						required
					/>
				</div>
				<Button type="submit">Cadastrar Veículo</Button>
			</form>
			<Toaster />
		</div>
	);
}
