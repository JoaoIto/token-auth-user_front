"use client"
import { useEffect, useState } from 'react';
import { ApiUtils } from "@/app/utils/api/apiMethods";
import { tokenService } from "@/app/utils/cookies/tokenStorage";

export default function Home() {
    const [users, setUsers] = useState<IUsuario[]>([]); // Define o estado para armazenar os usuários

    useEffect(() => {
        async function fetchUsers() {
            try {
                const token = tokenService.get(); // Obtém o token de autenticação
                const endpoint = 'http://localhost:8080/users'; // Endpoint para obter usuários
                const fetchedData = await ApiUtils.get<{ users: IUsuario[] }>(endpoint, token); // Faz a solicitação para obter usuários

                if (fetchedData && fetchedData.users) { // Verifica se fetchedData e fetchedData.users são definidos
                    setUsers(fetchedData.users); // Atualiza o estado com os usuários obtidos
                }
            } catch (error) {
                console.error('Erro ao buscar usuários:', error);
                // Trate o erro conforme necessário
            }
        }

        fetchUsers(); // Chama a função para buscar usuários quando o componente é montado
    }, []); // O segundo argumento vazio faz com que useEffect seja executado apenas uma vez

    return (
        <div className={`h-screen w-screen flex flex-col items-center justify-center`}>
            <h1 className={`text-center my-2 text-3xl font-medium text-start`}>Gerência de usuários</h1>
            <div className={`w-3/4 h-3/4 bg-slate-700 p-2 flex flex-col items-center justify-center border border-2 border-slate-400 rounded`}>
                <h2 className={`text-2xl`}>Usuários</h2>
                <ul>
                    {users.map(user => (
                        <li className={`flex gap-2 bg-black m-4 p-2 rounded text-white border border-2`} key={user._id}>
                            _id:
                            <p className={`text-blue-500`}> {user._id}</p>
                            CPF:
                            <p className={`text-amber-300`}> {user.cpf}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
