import { AppDataSource } from "../data-source";
import { TLogin, TToken } from "../interfaces/loginInterfaces";
import { User } from "../entities/usersEntities";
import { AppError } from "../errors";
import bcrypt from "bcryptjs"
import  Jwt  from "jsonwebtoken";
import 'dotenv/config'

const secretKey=process.env.SECRET_KEY!

async function loginService(data:TLogin):Promise<TToken>{

    const userRepository=AppDataSource.getRepository(User)

    const userLogin= await userRepository.findOneBy({email:data.email})

    if (!userLogin || !userLogin.password){
        throw new AppError('user not found',404)
    }

    const comparePassword=await bcrypt.compare(
        data.password,userLogin.password
    )

    if (comparePassword==false){
        throw new AppError('user not found',404)
    }
    
    const token:string=Jwt.sign(
        {

        },
        secretKey,
        {
            expiresIn: "1d" ,
            subject: userLogin.id.toString()
        }
    )        

    return {token}
}

export default loginService