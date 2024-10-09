interface SupplyProps {
	vehicle_id: string;
	price: number;
	mileage: number;
	fuel_type: string;
}

export async function PostSupply(body: SupplyProps) {
	const url = "http://localhost:3000/refills";
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		throw new Error(`Error: ${response.status} ${response.statusText}`);
	}

	const data = await response.json();
	return data.message;
}
