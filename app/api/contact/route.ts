import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const request = await req.json();
  console.log('got the request:', request)

//   return NextResponse.json({ error: false, emailSent: true, errors: []},
//     { status: 200 })
//   }

  const transporter: nodemailer.Transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_EMAIL_HOST,
    port: 465,
    secure: true,
    // service: 'yahoo',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS
    },
    logger: true
  });

  const messageBody = `<div>
        <p>First Name: ${request.firstName}</p>
        <p>Last Name: ${request.lastName}</p>
        <p>Email: ${request.email}</p>
        <p>Comments: ${request.comments}</p>
        </div>`

  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_USER, // sender address
    to: process.env.NEXT_PUBLIC_EMAIL_SEND_TO, // list of receivers
    subject: 'New Contact', // Subject line
    text: request.comments, // plain text body
    html: messageBody
  };

  return await transporter
    .sendMail(mailOptions)
    .then((response: nodemailer.SentMessageInfo) => {
      return NextResponse.json(
        { error: false, emailSent: true, errors: [], response },
        { status: 200 }
      );
    })
    .catch((error: nodemailer.SentMessageInfo) => {
        console.log('error from nodemailer:', error)
      return NextResponse.json(
        { error: true, emailSent: false, errors: [error] },
        { status: 500 }
      );
    });
}