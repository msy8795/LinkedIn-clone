const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://deepak:deepak@cluster0.jbizi7x.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected!'));