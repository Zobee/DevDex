const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

/* NOTE Some VM's (like Vagrant) only has a handful of ports that it can use to 
connect to the outside world. If you're running this using a VM, check your port 
output to ensure that it's one your VM can emit from */

app.get('/', (req, res) => {
  res.send("HELLO EXPRESS")
})

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`)
})