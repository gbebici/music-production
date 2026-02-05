import { NextResponse } from "next/server";
import {Resend} from "resend";


export async function POST(request: Request){
    const resend = new Resend(process.env.RESEND_KEY)
    const data = await request.json();
    const {name, email, message} = data;
    await
    resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'contact@gabrielbebici.com',
        subject: `New Project Inquiry from ${name}`,
        
        html: `<p>Hello! You have a new message from ${email} .</p>
               <p><b>Message:</b></p>
               <p>${message}</p>`,
    }).then(() => {
        console.log('Email sent sucessfully');
    });
    return NextResponse.json({message: "Email sent successfully"});
}