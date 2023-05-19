const express = require('express');
const fs = require('fs');

const app = express();
const cors = require('cors');
const { error } = require('console');

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request body
app.use(express.json());
app.use(cors());


app.get('/status', (req, res) => {
  const data = fs.readFileSync('status.json');
  const dataJ = JSON.parse(data);

  res.send(data);
  console.log(dataJ);
  console.log(`Loading All Status`);
});


// handle POST requests to update the status
app.post('/status', (req, res) => {
  let body = '';
  
  req.on('data', chunk => {
    body += chunk.toString(); // convert buffer to string
  });
  
  req.on('end', () => {
    
    const rawData = fs.readFileSync('status.json');
    const dataP = JSON.parse(rawData);

    if(body === 'Ron'){
      dataP.Rstatus = 'on';
    } if (body === 'Roff') {
      dataP.Rstatus = 'off';
    } if (body === 'Gon') {
      dataP.Gstatus = 'on';
    } if (body === 'Goff'){
      dataP.Gstatus = 'off';
    } if(body === 'Yon'){
      dataP.Ystatus = 'on';
    } if (body === 'Yoff') {
      dataP.Ystatus = 'off';
    } if (body === 'Bon') {
      dataP.Bstatus = 'on';
    } if (body === 'Boff'){
      dataP.Bstatus = 'off';
    }
      
    jsonData = JSON.stringify(dataP);

        
    // write the new status to the JSON file
    fs.writeFile('status.json', jsonData, err => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
      } else {
        console.log(dataP);  
        console.log('Status Updated Successfully');
        res.status(200).send(body);
      }
    });
  });
});

// start the server
const server = app.listen(PORT, () => {
const address = server.address();
console.log(`Server is listening on http://${address.address}:${address.port}`);
});
