const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8100 });

const {createCompletion, loadModel} = require('gpt4all')

main()

async function main(){
    const model = await loadModel('gpt4all-falcon-q4_0.gguf', { verbose: true, device: 'gpu' });

    server.on('connection', (socket) => {
        console.log('Client connected');
    
        // Send a message to the client
    
        // Event listener for when a message is received from the client
        socket.on('message', async (message) => {
            const buffer = Buffer.from(message);
            const resultString = buffer.toString('utf-8');
            console.log('Message from client:', resultString);

            const response = await createCompletion(model, [
                { role : 'user', content: resultString  } 
              ]);
              socket.send(response.choices[0].message.content)
        });
    
        // Event listener for when the connection is closed
        socket.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

