/*
    JSON.stringify para convertir objetos a JSON.
    JSON.parse para convertir JSON de vuelta a un objeto.

*/


const jsonForm = document.querySelector('#jsonform');
const csvForm = document.querySelector('#csvform');
const bConvert = document.querySelector('#bConvert');

bConvert.addEventListener('click', e => {
    convertJSONtoCSV();
});

function convertJSONtoCSV() {
    let json = '';
    let keys = [];
    let values = [];

    try {
        json = JSON.parse(jsonForm.value);
    } catch (error) {
        alert('Formato incorrecto');
        return;
    }

    if (Array.isArray(json)) {
        json.forEach(item => {
            const nKeys = Object.keys(item);

            if (keys.length === 0) {
                keys = [...nKeys];  //Obteniendo las cabeceras 
            } else {
                if (nKeys.length !== keys.length) {
                    //keys = [...nKeys];  //Actualizar las cabeceras?
                    throw new Error("Las propiedades de los objetos no son iguales")
                } else {
                    //console.log('Ok', nKeys);
                }
            }

            const row = keys.map(k => {
                return item[k];  //Retornando el valor
            });
            values.push([...row]);
        });
        values.unshift(keys);        

        const text = values.map((v) => {            
           return v.join(',');
        }).join('\n');        
        csvForm.value = text;

    } else {
        alert('No es un arreglo de objetos');
    }
}

