import { TContact } from "../interfaces/contactInterfaces"

async function createContactService(data:TContact):Promise<TContact>{

    return data

}

async function getUserContactsService(id:string):Promise<TContact[]>{

    return []

}

export{createContactService,getUserContactsService}