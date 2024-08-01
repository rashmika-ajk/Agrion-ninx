document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    const chatHistory = document.querySelector('.chat-history');

    let step = 0; // To keep track of conversation steps
    let soilType = '';
    let season = '';
    let location = '';
    let soilColor = '';
    let soilTexture = '';

    function addMessageToChat(message, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatHistory.appendChild(messageDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();

        switch (step) {
            case 0:
                addMessageToChat("Hello! How can I assist you today?", false);
                step++;
                break;
            case 1:
                if (userMessage.includes('hello')) {
                    addMessageToChat("Do you know the type of your soil? Reply with 'Yes' or 'No'.", false);
                    step++;
                } else {
                    addMessageToChat("I didn't quite get that. Could you please say hello?", false);
                }
                break;
            case 2:
                if (userMessage === 'yes') {
                    addMessageToChat("Great! What is the type of your soil?", false);
                    step = 6; // Skip to asking for soil type
                } else if (userMessage === 'no') {
                    addMessageToChat("No problem! Let's figure it out. First, can you tell me the color of the soil?", false);
                    step++;
                } else {
                    addMessageToChat("I didn't understand that. Please respond with 'Yes' or 'No'.", false);
                }
                break;
            case 3:
                soilColor = userMessage;
                addMessageToChat("Thanks! What is the texture of the soil? (e.g., clayey, loamy, sandy)", false);
                step++;
                break;
            case 4:
                soilTexture = userMessage;
                addMessageToChat("Got it. Can you tell me the location where the soil is found? (e.g., Telangana)", false);
                step++;
                break;
            case 5:
                location = userMessage;
                identifySoilType(soilColor, soilTexture, location);
                break;
            case 6:
                if (soilType === '') {
                    soilType = userMessage;
                }
                addMessageToChat("Thanks! Now, what agricultural season is currently going on? (e.g., Rabi, Kharif, Zaid)", false);
                step++;
                break;
            case 7:
                season = userMessage;
                recommendCrops(soilType, season);
                step = 0; // Reset the conversation after providing recommendations
                break;
            default:
                addMessageToChat("I didn't understand that. Can you please provide your input again?", false);
                break;
        }
    }

    function identifySoilType(color, texture, location) {
        color = color.toLowerCase();
        texture = texture.toLowerCase();
        location = location.toLowerCase();

        let identified = false;

        if (color === 'red') {
            if (location.includes('karnataka') || location.includes('andhra pradesh') || location.includes('tamil nadu') || location.includes('telangana') || location.includes('kerala')) {
                soilType = 'Red Soil';
                identified = true;
            }
        } else if (color === 'black') {
            if (location.includes('deccan plateau')) {
                soilType = 'Black Soil';
                identified = true;
            }
        } else if (location.includes('river valleys') || location.includes('floodplains')) {
            soilType = 'Alluvial Soil';
            identified = true;
        } else if (color === 'red' && location.includes('lateritic plateaus')) {
            soilType = 'Laterite Soil';
            identified = true;
        } else if (location.includes('mountains') || location.includes('forests')) {
            soilType = 'Mountain and Forest Soil';
            identified = true;
        } else if (location.includes('arid') || location.includes('desert')) {
            soilType = 'Desert Soil';
            identified = true;
        } else if (location.includes('peatlands') || location.includes('bogs') || location.includes('swamps') || location.includes('marshes')) {
            soilType = 'Peat and Marshy Soil';
            identified = true;
        }

        if (!identified) {
            addMessageToChat("Sorry, we couldn't identify the soil type based on your description. Our data is limited right now, and we will increase the data and update it soon. Exiting chat. Thanks for your understanding!", false);
            step = 9; // Exit the chat
        } else {
            describeSoilType(soilType);
            addMessageToChat(`Based on the information provided, the soil type is ${soilType}.`, false);
            step = 6; // Proceed to asking for the crop season
        }
    }

    function describeSoilType(soilType) {
        switch (soilType) {
            case 'Red Soil':
                addMessageToChat("Characteristics:\n - Color: Pronounced reddish hue (light pink to deep red).\n - Texture: Clayey, loamy, or sandy.\n - Location: Tropical and subtropical areas.", false);
                break;
            case 'Black Soil':
                addMessageToChat("Characteristics:\n - Color: Deep black to dark brown.\n - Texture: Clayey to sandy clay loam.\n - Moisture Retention: Good moisture retention qualities.\n - Location: Deccan Plateau region, including Maharashtra, Madhya Pradesh, Chhattisgarh, Gujarat, Karnataka, Telangana.", false);
                break;
            case 'Alluvial Soil':
                addMessageToChat("Characteristics:\n - Location: River valleys and floodplains.\n - Color: Light grey to yellowish-brown.\n - Texture: Mix of sand, silt, and clay; typically loamy.\n - Structure: Loose, crumbly aggregates when moistened.", false);
                break;
            case 'Laterite Soil':
                addMessageToChat("Characteristics:\n - Color: Red to brownish-red due to high iron oxides content.\n - Texture: Coarse-textured, often gravel or grit.\n - Hardness: Becomes extremely hard when dry.\n - Elements of the landscape: Lateritic plateaus, cliffs, and escarpments.", false);
                break;
            case 'Mountain and Forest Soil':
                addMessageToChat("Characteristics:\n - Color: Varies based on water flow, organic matter, and local geology.\n - Texture: Well-balanced with clay, silt, and sand.\n - Plants: Look for native trees, bushes, and other plants adapted to mountain and forest conditions.", false);
                break;
            case 'Desert Soil':
                addMessageToChat("Characteristics:\n - Location: Arid and semi-arid areas with little yearly precipitation.\n - Color: Light gray to reddish-brown.\n - Texture: Sand- or loamy-textured with large particles.\n - Low Moisture Content: Typically low moisture content.", false);
                break;
            case 'Peat and Marshy Soil':
                addMessageToChat("Characteristics:\n - Location: Wetland environments like peatlands, bogs, swamps, and marshes.\n - Color: Dark brown to black due to high organic matter.\n - Texture: Fibrous or spongy texture; retains water.\n - Smell: Earthy or mossy scent due to degrading organic matter.", false);
                break;
            default:
                addMessageToChat("Characteristics:\n - Unable to determine the characteristics based on the provided information.", false);
                break;
        }
    }

    function recommendCrops(soil, season) {
        // Debugging output
        console.log(`Soil Type: ${soil.toLowerCase()}`);
        console.log(`Season: ${season.toLowerCase()}`);

        const recommendations = {
            'red soil': {
                'kharif': ['Rice', 'Jowar', 'Maize'],
                'rabi': ['Wheat', 'Barley'],
                'zaid': ['Cucumber', 'Watermelon']
            },
            'black soil': {
                'kharif': ['Cotton', 'Soybean', 'Pulses'],
                'rabi': ['Wheat', 'Gram'],
                'zaid': ['Pumpkin', 'Cucumber']
            },
            'alluvial soil': {
                'kharif': ['Rice', 'Maize', 'Jute'],
                'rabi': ['Wheat', 'Barley'],
                'zaid': ['Lemon', 'Pumpkin']
            },
            'laterite soil': {
                'kharif': ['Cashew', 'Tapioca'],
                'rabi': ['Pulses', 'Peas'],
                'zaid': ['Pumpkin', 'Lettuce']
            },
            'mountain and forest soil': {
                'kharif': ['Potatoes', 'Cabbage'],
                'rabi': ['Wheat', 'Barley'],
                'zaid': ['Spinach', 'Lettuce']
            },
            'desert soil': {
                'kharif': ['Millets', 'Guar'],
                'rabi': ['Mustard', 'Barley'],
                'zaid': ['Dates', 'Pomegranates']
            },
            'peat and marshy soil': {
                'kharif': ['Rice'],
                'rabi': ['Vegetables'],
                'zaid': ['Lettuce', 'Spinach']
            }
        };

        const soilKey = soil.toLowerCase();
        const seasonKey = season.toLowerCase();
        const crops = recommendations[soilKey]?.[seasonKey] || ['Unknown crops for this combination.'];

        addMessageToChat(`Based on your inputs, here are some recommended crops for your soil type, season, and region:\n${crops.join(', ')}`, false);
    }

    function handleUserInput() {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessageToChat(userMessage, true);
            chatInput.value = '';
            getBotResponse(userMessage);
        }
    }

    sendButton.addEventListener('click', handleUserInput);
    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission if inside a form
            handleUserInput();
        }
    });
});
