"use client"
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import * as React from "react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {tokenService} from "@/app/utils/cookies/tokenStorage";
import {ApiUtils} from "@/app/utils/api/apiMethods";

export async function postUserLogin(user: ILoginUser): Promise<string> {
    try {
        const response = await ApiUtils.postLogin('http://localhost:8080/register', user);

        // Verificar se a resposta não é nula e não é indefinida
        if (response !== null && response !== undefined) {
            // Verificar se a resposta contém uma mensagem de sucesso
            if (typeof response === 'object' && 'message' in response) {
                return response.message as string; // Retornar a mensagem de sucesso como uma string
            } else {
                throw new Error('A resposta do backend não contém uma mensagem de sucesso.');
            }
        } else {
            // Se a resposta for nula ou indefinida, lance um erro ou retorne um valor alternativo
            throw new Error('A autenticação não retornou um token válido.');
        }
    } catch (error) {
        // Se houver um erro na autenticação, você pode lidar com isso aqui.
        console.error('Erro durante a autenticação:', error);
        throw error; // Repasse o erro para quem chamou a função
    }
}

export default function RegisterPage(){
    const router = useRouter();
    const [isAutenticado, setIsAutenticado] = useState(false);
    const usuarioSchema = z.object({
        cpf: z
            .string()
            .refine((value) => /^\d+$/.test(value), {
                message: "Somente números",
            }),
        senha: z.string().min(4, "Mínimo de 4 caracteres"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUsuario>({
        resolver: zodResolver(usuarioSchema),
    });

    async function onSubmit (data: IUsuario) {
        try {
            // Chama a função postUserLogin e passa os dados do formulário
            const token = await postUserLogin(data);
            tokenService.save(token);
            router.push('/');
            setTimeout(() => {
                // Redireciona para a rota inicial
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error('Erro durante o login:', error);
            // Se necessário, você pode lidar com erros de login aqui
        }
    };
    return (
        <>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box className="mt-8 flex flex-col items-center">
                    <Avatar className="m-1 bg-secondary-main">
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" className="mt-4 text-center">
                        Software Hub - Unitins
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="mt-1 w-full"
                    >
                        <TextField
                            className="font-bold bg-white"
                            margin="normal"
                            required
                            fullWidth
                            id="cpf"
                            label={<label className="font-bold">CPF</label>}
                            autoComplete="cpf"
                            autoFocus
                            {...register("cpf")}
                            error={!!errors.cpf}
                            helperText={errors.cpf?.message}
                        />
                        <TextField
                            className="font-bold bg-white"
                            margin="normal"
                            required
                            fullWidth
                            label={<label className="font-bold">Senha</label>}
                            id="senha"
                            autoComplete="current-senha"
                            {...register("senha")}
                            error={!!errors.senha}
                            helperText={errors.senha?.message}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Me lembre"
                        />
                        <Grid className="flex flex-col" item xs>
                            <Link href="#" variant="body2">
                                Esqueceu a senha?
                            </Link>
                            <Button className="bg-blue-900" type="submit" variant="contained" color="primary">
                                Entrar
                            </Button>
                            {isAutenticado === false && (
                                <Typography color="error" align="center">
                                    Usuário não autenticado! Acesso negado.
                                </Typography>
                            )}
                        </Grid>
                    </Box>
                </Box>
            </Container>

        </>
    )
}