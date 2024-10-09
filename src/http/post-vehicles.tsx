interface PostCadastroVehicles {
	brand: string;
	plate: string;
	model: string;
	year: number | undefined;
}

export async function PostCadastroVehicle(body: PostCadastroVehicles) {
	const url = "http://localhost:3000/vehicles";
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
