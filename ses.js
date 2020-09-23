const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

exports.sendEmail = (to, subject, code, name) => {
    return ses
        .sendEmail({
            Source: "Productive Lycra <productive.lycra@spicedling.email>",
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Text: {
                        Data: `Hey ${name}! We received a request to reset your Antisocial password. Enter the following password reset code: ${code}. Please ignore this email if you didn't request this, it will time out.`,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise();
};
