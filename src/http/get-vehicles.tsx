export interface getVehiclesProps {
	brand: string;
	plate: string;
	model: string;
	year: number;
	id: string;
}

export async function getVehicles(): Promise<getVehiclesProps[]> {
	const response = await fetch("http://localhost:3000/vehicles");
	const data = await response.json();
	return data;
}
