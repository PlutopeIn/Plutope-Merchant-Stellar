import bcrypt from 'bcryptjs'

//#region password hashing functions
export const passwordHash = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
//#endregion

//#region password Compare function
export const passwordCompare = async(plainPassword, hashPassword) => {
    return await bcrypt.compare(plainPassword, hashPassword);
}
//#endregion

//#region generate 6 digit random number
export const  generateRandomNumber = () => {
    return Math.floor(100000 + Math.random() * 900000);
}