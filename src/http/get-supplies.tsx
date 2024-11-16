export interface VehicleRefill {
	id: string;
	vehicle_id: string;
	price: string;
	mileage: string;
	fuel_type: string;
	refill_date: string;
	vehicle_plate: string;
}

export async function getVehiclesSupplies(): Promise<VehicleRefill[]> {
	const response = await fetch("http://localhost:3000/refills");
	const data = await response.json();

	return data;
}
