import React from 'react';
import Checkbox from "@mui/material/Checkbox";
import {FormControlLabel, FormGroup, FormLabel, Grid} from '@mui/material';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {FormikHelpers, useFormik} from "formik";
import {loginTC} from "./auth-reducer";
import {useAppDispatch, useAppSelector} from "app/customHooks";
import {Navigate} from "react-router-dom";
import {selectIsLoggedIn} from "features/Login/auth-selectors";

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

        onSubmit: async (values: FormValueType, formikHelpers: FormikHelpers<FormValueType>) => {
            const action = await dispatch(loginTC(values))
            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
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

