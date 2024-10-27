/* eslint-disable import/extensions */
import axios from 'axios';
import { json2xml, xml2json } from 'xml-js';

const soap_url = 'http://localhost:3000/wsdl';

export const convertAndSendtoSoap = async (operation, jsonData) => {
    // Convert JSON from request to XML
    const jsonRequest = {
        'soapenv:Envelope': {
            _attributes: { 'xmlns:soapenv': 'http://schemas.xmlsoap.org/soap/envelope/', 'xmlns:tns': 'http://example.com/wallet' },
            'soapenv:Header': { 'Content-Type': 'application/json' },
            'soapenv:Body': {
                [`tns:${operation}`]: jsonData,
            },
        },
    };

    const xmlRequest = json2xml(jsonRequest, { compact: true });

    try {
        // Send the XML request to the SOAP service
        const soapResponse = await axios.post(soap_url, xmlRequest, {
            headers: { 'Content-Type': 'text/xml' },
            timeout: 7000,
        });

        if (!soapResponse || !soapResponse.data) {
            throw new Error('Empty or undefined response from SOAP service');
        }

        // Convert XML response to JSON
        const jsonResponse = JSON.parse(xml2json(soapResponse.data, { compact: true }));

        // Extract response data according to the type of operation
        const responseKey = `tns:${operation}Response`;
        if (jsonResponse['soap:Envelope']?.['soap:Body']?.[responseKey]?.['tns:data']?._text) {
            jsonResponse['soap:Envelope']['soap:Body'][responseKey]['tns:data'] = JSON.parse(
                jsonResponse['soap:Envelope']['soap:Body'][responseKey]['tns:data']._text,
            );
        }

        return jsonResponse;
    } catch (error) {
        console.error('SOAP Error response', error);
        throw new Error(`Error communicating with SOAP service: ${error.message}`);
    }
};
