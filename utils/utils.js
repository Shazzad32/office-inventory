

export const calculateAmount=devices=>{
    return devices.reduce((accumulator, currentValue) => accumulator + currentValue.device_price, 0);
}