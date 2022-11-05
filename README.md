# Mail tracker component

A simple mail tracker component made with React.js.

It auto-detects the mailing service provider based on the tracking number provided.

I am using only 3 companies as a proof of conecept --> USPS, UPS and Fedex

to auto-detect the tracking number I used a regex based on each companies tracking number.


# Run the project using this command:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

# Example Tracking Numbers

| Tracking Number                    | Kind                                | Tracking Carrier |
|------------------------------------|-------------------------------------|------------------|
| 03071790000523483741               | USPS 20                             | USPS             |
| 71123456789123456787               | USPS 20                             | USPS             |
| 4201002334249200190132607600833457 | USPS 34v2                           | USPS             |
| 4201028200009261290113185417468510 | USPS 34v2                           | USPS             |
| 420221539101026837331000039521     | USPS 91                             | USPS             |
| 71969010756003077385               | USPS 91                             | USPS             |
| 9505511069605048600624             | USPS 91                             | USPS             |
| 9101123456789000000013             | USPS 91                             | USPS             |
| 92748931507708513018050063         | USPS 91                             | USPS             |
| 9400111201080805483016             | USPS 91                             | USPS             |
| 9361289878700317633795             | USPS 91                             | USPS             |
| 9405803699300124287899             | USPS 91                             | USPS             |
| EK115095696SA                      | S10                                 | USPS             |
| 1Z5R89390357567127                 | UPS                                 | UPS              |
| 1Z879E930346834440                 | UPS                                 | UPS              |
| 1Z410E7W0392751591                 | UPS                                 | UPS              |
| 1Z8V92A70367203024                 | UPS                                 | UPS              |
| 1ZXX3150YW44070023                 | UPS                                 | UPS              |
| 986578788855                       | FedEx Express (12)                  | FedEx            |
| 477179081230                       | FedEx Express (12)                  | FedEx            |
| 799531274483                       | FedEx Express (12)                  | FedEx            |
| 790535312317                       | FedEx Express (12)                  | FedEx            |
| 974367662710                       | FedEx Express (12)                  | FedEx            |
| 1001921334250001000300779017972697 | FedEx Express (34)                  | FedEx            |
| 1001921380360001000300639585804382 | FedEx Express (34)                  | FedEx            |
| 1001901781990001000300617767839437 | FedEx Express (34)                  | FedEx            |
| 1002297871540001000300790695517286 | FedEx Express (34)                  | FedEx            |
| 61299998820821171811               | FedEx SmartPost                     | USPS             |
| 9261292700768711948021             | FedEx SmartPost                     | USPS             |
| 041441760228964                    | FedEx Ground                        | FedEx            |
| 568283610012000                    | FedEx Ground                        | FedEx            |
| 568283610012734                    | FedEx Ground                        | FedEx            |
| 000123450000000027                 | FedEx Ground (SSCC-18)              | FedEx            |
| 9611020987654312345672             | FedEx Ground 96 (22)                | FedEx            |
| 9622001900000000000000776632517510 | FedEx Ground GSN                    | FedEx            |
| 9622001560000000000000794808390594 | FedEx Ground GSN                    | FedEx            |
| 9622001560001234567100794808390594 | FedEx Ground GSN                    | FedEx            |
| 9632001560123456789900794808390594 | FedEx Ground GSN                    | FedEx            |
| 9400100000000000000000             | USPS Tracking                       | USPS             |
| 9205500000000000000000             | Priority Mail                       | USPS             |
| 9407300000000000000000             | Certified Mail                      | USPS             |
| 9303300000000000000000             | Collect On Delivery Hold For Pickup | USPS             |
| 8200000000                         | Global Express Guaranteed           | USPS             |
| EC000000000US                      | Priority Mail Express International | USPS             |
| 9270100000000000000000             | Priority Mail Express               | USPS             |
| EA000000000US                      | Priority Mail Express               | USPS             |
| CP000000000US                      | Priority Mail International         | USPS             |
| 9208800000000000000000             | Registered Mail                     | USPS             |
| 9202100000000000000000             | Signature Confirmation              | USPS             |


# Source
I found the Regex in a Stakeoverflow answer to a question, Check it here:
https://stackoverflow.com/questions/619977/regular-expression-patterns-for-tracking-numbers

