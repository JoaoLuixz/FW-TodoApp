export class Tarefa {
    _id: string | undefined;
    descricao: string;
    statusRealizada: boolean;
    constructor(_descricao: string, _statusRealizada: boolean) {
        this.descricao = _descricao;
        this.statusRealizada = _statusRealizada;
    }
}
export class User{
    id: string | undefined;
    usernameAdm: string;
    //passwordAdm: string;
    isAdm: boolean;
    constructor(_username: string, _isADM: boolean) {
        this.usernameAdm = _username;
        //this.passwordAdm = _password;
        this.isAdm = _isADM;
    }
}