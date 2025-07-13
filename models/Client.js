const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  cpf: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String 
  },
  birthDate: { 
    type: Date 
  },
  gender: { 
    type: String 
  },
  address: { 
    type: String 
  },
  cep: { 
    type: String 
  },
  receiptImage: { 
    type: String 
  },
  notes: { 
    type: String 
  },
  possuiReceita: { 
    type: Boolean, 
    default: false 
  },
  longe: {
    esfericoDireito: { 
      type: String 
    },
    cilindricoDireito: { 
      type: String 
    },
    eixoDireito: { 
      type: String 
    },
    esfericoEsquerdo: { 
      type: String 
    },
    cilindricoEsquerdo: { 
      type: String 
    },
    eixoEsquerdo: { 
      type: String 
    },
    adicao: { 
      type: String 
    }
  },
  perto: {
    esfericoDireito: { 
      type: String 
    },
    cilindricoDireito: { 
      type: String 
    },
    eixoDireito: { 
      type: String 
    },
    esfericoEsquerdo: { 
      type: String 
    },
    cilindricoEsquerdo: { 
      type: String 
    },
    eixoEsquerdo: { 
      type: String 
    },
    adicao: { 
      type: String 
    }
  },
  vencimentoReceita: { 
    type: Date 
  },
  purchaseHistory: [ 
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Sale' 
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Client', clientSchema);