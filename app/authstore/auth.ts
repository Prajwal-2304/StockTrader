import CredentialsProvider from "next-auth/providers/credentials"
import db from "@/db/index"
import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth";
export const authOptions:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:'Email',
            credentials:{
                email:{label:"Email",type:"text",placeholder:"you@example.com"},
                password:{label:"Password",type:"password"}
            },
            async authorize(credentials){
                if(!credentials) return null;
            console.log(credentials)
            const res= await db.users.findUnique({
                select:{salt:true},
                where:{email:credentials.email}
            })
            console.log("salt is ",res?.salt)
            const password=await bcrypt.hash(credentials.password,res?.salt)
            const user = await db.users.findUnique({
                where:{email:credentials.email,password:password}
            })
            if(user){
                return {
                    id:user.id,
                    name:user.name
                }
            }
            return null
            }
        })
    ],
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
    callbacks:{
        jwt: async({token,user}:any)=>{
            if(user){
                token.id=user.id;
                token.name=user.name;
            }
           // console.log("token is ",token);
            return token;
        },
        session:async ({session,token}:any)=>{
            if(session?.user){
                session.user.name=token.name;
                session.user.id=token.id
            }
           // console.log("session details are ",session)
            return session;
        },
    },
}