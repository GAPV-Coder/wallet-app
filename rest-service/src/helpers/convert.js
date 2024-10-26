/* eslint-disable import/extensions */
import axios from 'axios';
import { json2xml, xml2json } from 'xml-js';
import config from '../config/config.js';

const { soap_url } = config;

export const convertAndSendtoSoap = async (jsonData) => {
    // Convert JSON from request to XML
    const jsonRequest = {
        tns: {
            registerClient: {
                'tns:document': jsonData.document,
                'tns:name': jsonData.name,
                'tns:email': jsonData.email,
                'tns:phone': jsonData.phone,
            },
        },
    };
    const xmlRequest = json2xml(jsonRequest, { compact: true });

    try {
        // Send the XML request to the SOAP service
        const soapResponse = await axios.post(soap_url, xmlRequest, {
            headers: { 'Content-Type': 'text/xml' },
        });

        // Convert XML response to JSON
        const jsonResponse = xml2json(soapResponse.data, { compact: true });
        return jsonResponse;
    } catch (error) {
        throw new Error(`Error communicating with SOAP service: ${error.message}`);
    }
};
