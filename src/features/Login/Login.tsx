import React from 'react';
import Checkbox from "@mui/material/Checkbox";
import {FormControlLabel, FormGroup, FormLabel, Grid} from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useFormik} from "formik";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "utils/customHooks";
import {selectIsLoggedIn} from "common/selectors/auth-selectors";
import {loginTC} from "redux/thunks/thunks";


type FormValueType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(selectIsLoggedIn)

    const formik = useFormik({

        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'email is required!'
                }
            }

            if (!values.password) {
                return {
                    password: 'password is required'
                }
            }

        },

        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },

        onSubmit: async (values) => {
            dispatch(loginTC(values))

        }
    });

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

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

