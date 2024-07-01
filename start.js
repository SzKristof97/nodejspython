const express = require('express');
const {spawn} = require('child_process');

const app = express();

const port = 3001;

const executePython = async (script) => {
    const py = spawn('python', [script]);

    const result = await new Promise((resolve, reject) => {
        var output;

        py.stdout.on('data', data => {
            output = data.toString();
        });

        py.stderr.on('data', data => {
            console.error(`[Python] Error occurred: ${data.toString()}`);
            reject(`Error occurred in ${script} ${data.toString()}`);
        });

        py.on('close', code => {
            console.log(`${script} exited with code ${code}`);
            resolve(output);
        });
    });

    return result;
};


app.get('/', async (req, res, next) => {
    try{
        const result = await executePython('python/call.py');
        res.json(result);
    }catch(err){
        res.status(500).json({error: err.message});
    }
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    console.log('Press Ctrl+C to quit');
});