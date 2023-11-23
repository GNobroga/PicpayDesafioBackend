
export default class Validators {

    public static validateCPF(cpf: string) {
        cpf = cpf.replace(/[^\d]+/g, ''); 
    
        if (cpf.length !== 11) {
            return false;
        }
    
        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
    
        let resto = soma % 11;
        let digito1 = resto < 2 ? 0 : 11 - resto;
    
        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
    
        resto = soma % 11;
        let digito2 = resto < 2 ? 0 : 11 - resto;
    
        return parseInt(cpf.charAt(9)) === digito1 && parseInt(cpf.charAt(10)) === digito2;
    }

    public static validateCNPJ(cnpj: string) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
    
        if (cnpj.length !== 14) {
            return false;
        }
    
        let soma = 0;
        let pos = 5;
        for (let i = 0; i < 12; i++) {
            soma += parseInt(cnpj.charAt(i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
    
        let digito1 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    
        soma = 0;
        pos = 6;
        for (let i = 0; i < 13; i++) {
            soma += parseInt(cnpj.charAt(i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
    
        let digito2 = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    
        return parseInt(cnpj.charAt(12)) === digito1 && parseInt(cnpj.charAt(13)) === digito2;
    }
    
    
}