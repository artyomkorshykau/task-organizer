import React from 'react';
import Checkbox from "@mui/material/Checkbox";
import {FormControlLabel, FormGroup, FormLabel, Grid} from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "common/hooks/useAppSelector";
import {selectIsLoggedIn} from "features/auth/model/authSelectors";
import {useLogin} from "common/hooks/useLogin";

export const Login = () => {

    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const {formik} = useLogin()

    if (isLoggedIn) return <Navigate to={'/'}/>

    return <Grid container justifyContent='center'>
        <Grid item xs={4} display='flex' justifyContent='space-evenly' marginTop='100px'>
            <form onSubmit={formik.handleSubmit}>
                <FormLabel>
                    <p>
                        ..Здарова отец
                    </p>
                </FormLabel>
                <FormGroup>
                    <TextField
                        label='Email'
                        margin='normal'
                        {...formik.getFieldProps('email')}
                    />
                    {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                    <TextField
                        type='password'
                        label='Password'
                        margin='normal'
                        {...formik.getFieldProps('password')}
                    />
                    {formik.errors.password ? <div>{formik.errors.password}</div> : null}

                    <FormControlLabel
                        label={'Remember'}
                        control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                           checked={formik.values.rememberMe}
                        />}
                    />
                    <Button type={'submit'} variant={'contained'} color={'primary'}>Login
                    </Button>
                </FormGroup>
            </form>
        </Grid>
    </Grid>
}

