require('../configurations/init');
const imageDownloader = require('image-downloader');
const AWS = require('aws-sdk');
const axios = require('node-fetch');
const fs = require('fs');

const bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY
});

(async function () {
    try {
        console.log("ENV", process.env.NODE_ENV);
        let vendorDocuments = await domain.Vendor.findAll({
            where: {
                isMSME: true
            },
            // limit: 2
        });
        console.log("******************************total vendor document ", vendorDocuments.length);
        let vendorCount = 1;
        //const vDoc = vendorDocuments.find(a => a.MSMECertificate);

         for (const vDoc of vendorDocuments) {
            if (vDoc.MSMECertificate && !vDoc.MSMECertificate.fileUrl.includes("bbqpartnerportal")) {
                const url = vDoc.MSMECertificate.fileUrl.split('/upload/').join('/upload/fl_attachment/');
                const name = vDoc.MSMECertificate.fileName.split(" ").join("-");
                if (url) {
                    const options = {
                        url,
                        dest: `../public/image/${Date.now()}-${name}`,
                    };
                    const file = await imageDownloader.image(options);

                    let fileUrl = file.filename;
                    //.split('/public')[1]
                    // fileUrl = `${process.env.APP_HOST}${fileUrl}`
                    // const fileBuffer = Buffer.from(fileUrl)
                    // let response = await axios(fileUrl);
                    // response = await response.buffer();

                    const fileRead = fs.readFileSync(fileUrl);

                    const result = await bucket.upload({
                        Body: fileRead,
                        Key: `${Date.now()}-${vDoc.MSMECertificate.fileName.split(" ").join("-")}`,
                        Bucket: process.env.AWS_BUCKET_NAME,
                        ACL: 'public-read'
                    }).promise();

                    await domain.Vendor.update({
                        MSMECertificate: {
                            ...vDoc.MSMECertificate,
                            fileUrl: result.Location,
                            // type: 'file'
                        }
                    }, {
                        where: {
                            id: vDoc.id
                        }
                    });
                    console.log(`Image - ${vDoc.MSMECertificate.fileName} - for Vendor Document ${vDoc.id} sucessfully migrated, count: ${vendorCount} `);
                } else {
                    console.log(`Url not found of vendor document ${vDoc.id}`);
                }
            }

            vendorCount++;
        }

        console.log("Script successfully completed!");
        console.log("All images from the DataBase has been sucessfully migrated from cloudinary to localServer! ");

        // process.exit(0);
    } catch (error) {
        console.log('Error occured', error);
        process.exit(1);
    }
}());
