import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
    document: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    balance: { type: Number, default: 0 },
    sessionId: { type: String },
    token: { type: String },
    currentTransactionAmount: { type: Number },
});

const ClientModel = mongoose.model('Client', ClientSchema);

export default ClientModel;
