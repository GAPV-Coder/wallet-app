import mongoose from 'mongoose';
import { v4: uuidv4 } from 'uuid';

const ClientSchema = new mongoose.Schema({
    doncument: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    balance: { type: Number, required: 0 },
    sessionId: {
        type: String,
        default: () => uuidv4().replace(/-/g, '').slice(0, 14),
    },
    token: {
        type: String,
        default: () => uuidv4().replace(/-/g, '').slice(0, 6),
    },
});

export default mongoose.model('Client', ClientSchema);
