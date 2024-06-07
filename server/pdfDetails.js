const mongoose = require('mongoose');

const PdfDetailsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  pdf: {
    type: String,
    required: true
  }
  
});

mongoose.model('PdfDetails', PdfDetailsSchema);
