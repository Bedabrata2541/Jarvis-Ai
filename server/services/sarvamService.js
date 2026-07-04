export const askSarvam = async (message) => {

    const SARVAM_API_KEY = process.env.SARVAM_API_KEY;

    const response = await fetch(
        "https://api.sarvam.ai/v1/chat/completions",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SARVAM_API_KEY}`
            },

            body: JSON.stringify({
                model: "sarvam-30b",

                messages: [
                    {
                        role: "user",
                        content: message
                    }
                ],

                temperature: 0.2
            })
        }
    );

    if (!response.ok) {

        const error = await response.text();

        throw new Error(error);

    }

    const data = await response.json();

    return data.choices[0].message.content;

};