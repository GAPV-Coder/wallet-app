import { v4 as uuidv4 } from 'uuid';

export const generateTokenAndSessionId = () => {
    const sessionId = uuidv4().replace(/-/g, '').slice(0, 14);
    const token = uuidv4().replace(/-/g, '').slice(0, 6);
    return { sessionId, token };
};
