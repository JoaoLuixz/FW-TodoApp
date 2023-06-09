import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { User } from "./tarefa";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TODOapp';

  arrayDeTarefas: Tarefa[] = [];
  apiURL: string;
  usuarioLogado = false;
  tokenJWT = '{ "token":""}';
  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000';

    this.READ_tarefas();
  }
  CREATE_tarefa(descricaoNovaTarefa: string) {
    var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); });

  }

  DELETE_tarefa(tarefaAserRemovida: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
      resultado => { console.log(resultado); this.READ_tarefas(); });
  }

  READ_tarefas() {
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { 'headers': idToken }).subscribe(
      (resultado) => { this.arrayDeTarefas = resultado; this.usuarioLogado = true },
      (error) => { this.usuarioLogado = false }
    )
  }


  // READ_tarefas() {
  //   this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe(
  //     resultado => this.arrayDeTarefas = resultado);
  // }


  // Feito dia 18.04
  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
      tarefaAserModificada).subscribe(
        resultado => { console.log(resultado); this.READ_tarefas(); });
  }

  login(username: string, password: string) {
    var credenciais = { "nome": username, "senha": password }
    this.http.post(`${this.apiURL}/api/login`, credenciais).subscribe(resultado => {
      this.tokenJWT = JSON.stringify(resultado);
      this.READ_tarefas();;
    });
  }

  addUser(username : string, password: string, isAdmin = false){
    if (username == "admin" && password == "admin")
    {

    }
  }

  loginADM(username: string, password: string) {
    var credenciaisADM = { "nome": username, "senha": password }
    if(credenciaisADM.nome == "ADM" && credenciaisADM.senha == "ADM")
    {

    }
    this.http.post(`${this.apiURL}/api/login`, credenciaisADM).subscribe(resultado => {
      this.tokenJWT = JSON.stringify(resultado);
      this.READ_tarefas();;
    });
  }


  // Criação de user
  CREATE_user(descricaoNovaTarefa: string) {
    var newUser = new User(descricaoNovaTarefa, false);
    this.http.post<Tarefa>(`${this.apiURL}/api/post`, newUser).subscribe(
      resultado => { console.log(resultado); this.READ_user(); });

  }

  DELETE_user(tarefaAserRemovida: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
      resultado => { console.log(resultado); this.READ_user(); });
  }

  READ_user() {
    const idToken = new HttpHeaders().set("id-token", JSON.parse(this.tokenJWT).token);
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`, { 'headers': idToken }).subscribe(
      (resultado) => { this.arrayDeTarefas = resultado; this.usuarioLogado = true },
      (error) => { this.usuarioLogado = false }
    )
  }

  UPDATE_user(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas.indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
      tarefaAserModificada).subscribe(
        resultado => { console.log(resultado); this.READ_user(); });
  }

}
