const apiURL = import.meta.env.VITE_INFERENCE_API_URL;

export async function inference_single_sequence(sequence_string: string) {
    const response = await fetch(`${apiURL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({sequence: sequence_string})
    });

    if (!response.ok) {
        let errorData = await response.text()
        throw new Error(`Inferencing error! status: ${errorData}`);
    }
        let response_json = await response.json()
        console.log(response_json)
        return response_json
}

export async function inference_batch(file: File) {
    const formData = new FormData();
    formData.append('file', file)
}



