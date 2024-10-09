interface PostMovimentacoesProps {
	vehicle_id: string;
	start_location: string;
	end_location: string;
	distance: number | undefined;
}

export async function PostMovimentacoes(body: PostMovimentacoesProps) {
	const url = "http://localhost:3000/movements";
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
	return data.error;
}
