/* eslint-disable import/extensions */
import axios from 'axios';
import { json2xml, xml2json } from 'xml-js';
// import config from '../config/config.js';

// const { soap_url } = config;
const soap_url = 'http://localhost:3000/wsdl';

export const convertAndSendtoSoap = async (jsonData) => {
    // Convert JSON from request to XML
    const jsonRequest = {
        'soapenv:Envelope': {
            _attributes: { 'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/', 'xmlns:tns': 'http://example.com/wallet' },
            'soapenv:Header': { 'Content-Type': 'application/json' },
            'soapenv:Body': {
                'tns:registerClient': {
                    'tns:document': jsonData.document,
                    'tns:name': jsonData.name,
                    'tns:email': jsonData.email,
                    'tns:phone': jsonData.phone,
                },
            },
        },
    };
    console.log('DOCUMENT', jsonData.document);
    const xmlRequest = json2xml(jsonRequest, { compact: true });
    console.log('Request XML', xmlRequest);

    try {
        // Send the XML request to the SOAP service
        const soapResponse = await axios.post(soap_url, xmlRequest, {
            headers: { 'Content-Type': 'text/xml' },
        });

        // Convert XML response to JSON
        const jsonResponse = xml2json(soapResponse.data, { compact: true });
        if (jsonResponse['soap:Envelope']?.['soap:Body']?.['tns:registerClientResponse']?.['tns:data']?._text) {
            jsonResponse['soap:Envelope']['soap:Body']['tns:registerClientResponse']['tns:data'] = JSON.parse(
                jsonResponse['soap:Envelope']['soap:Body']['tns:registerClientResponse']['tns:data']._text,
            );
        }
        console.log('XML response to JSON', jsonResponse);
        return jsonResponse;
    } catch (error) {
        if (error.message) {
            console.error('SOAP Error response', error.response.data);
        }
        throw new Error(`Error communicating with SOAP service: ${error.message}`);
    }
};
