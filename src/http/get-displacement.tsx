export interface Movement {
	id: string;
	vehicle_id: string;
	start_location: string;
	end_location: string;
	distance: number;
	movement_date: string;
	vehicle_plate: string;
}

export async function getVehiclesMovements(): Promise<Movement[]> {
	const response = await fetch("http://localhost:3000/movements");
	const data = await response.json();

	return data;
}
