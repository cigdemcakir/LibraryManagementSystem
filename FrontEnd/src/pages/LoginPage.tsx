import {AuthLoginCommand, LocalJwt} from "../types/AuthTypes.ts";
import React, {useContext, useState} from "react";
import {Button, Form, Grid, Header, Icon, Image, Segment} from "semantic-ui-react";
import api from "../utils/axiosInstance.ts";
import {getClaimsFromJwt} from "../utils/jwtHelper.ts";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";
import logo from '/logowithouttext.svg';
import {AppUserContext} from "../context/StateContext.tsx"; // import your image

const BASE_URL = import.meta.env.VITE_API_URL;


function LoginPage() {

    const { setAppUser } = useContext(AppUserContext);

    const navigate = useNavigate();

    const [authLoginCommand, setAuthLoginCommand] = useState<AuthLoginCommand>({email:"",password:""});

    const handleSubmit = async (event:React.FormEvent) => {

        event.preventDefault();

        try {
            const response = await api.post("/Authentication/Login", authLoginCommand);

            if(response.status === 200){
                const accessToken = response.data.accessToken;
                const { uid, email, given_name, family_name} = getClaimsFromJwt(accessToken);
                const expires:string = response.data.expires;

                setAppUser({ id:uid, email, firstName:given_name, lastName:family_name, expires, accessToken });

                const localJwt:LocalJwt ={
                    accessToken,
                    expires
                }

                localStorage.setItem("library_user",JSON.stringify(localJwt));
                navigate("/");
            } else{
                toast.error(response.statusText);
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuthLoginCommand({
            ...authLoginCommand,
            [event.target.name]: event.target.value
        });
    }

    const onGoogleLoginClick = (e:React.FormEvent) => {
        e.preventDefault();

        window.location.href = `${BASE_URL}/Authentication/GoogleSignInStart`;
    };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }}>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Image src={logo} size='massive'  centered style={{ marginTop: '1em', textAlign:'center', marginLeft:'170px', height:'150px'}}  />
                <Header as='h2' style={{ color: 'white', fontsize:'30px'}} textAlign='center'>
                    <h1 className="font-effect-outline">Library Management System</h1>
                </Header>
                <Header as='h2' style={{ color: 'white' }} textAlign='center'>
                    Log-in to your account
                </Header>
                <Form size='large' onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            fluid
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            value={authLoginCommand.email}
                            onChange={handleInputChange}
                            name="email"
                        />
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={authLoginCommand.password}
                            onChange={handleInputChange}
                            name="password"
                        />

                        <Button color='black' fluid size='large' type="submit">
                            Login
                        </Button>

                        <Button style={{ backgroundColor: '#dc502e', color: 'white', marginTop:"5px" }} fluid onClick={onGoogleLoginClick} size='large'  type="button">
                            <Icon name='google' /> Sign in with Google
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    );
}

export default LoginPage;
