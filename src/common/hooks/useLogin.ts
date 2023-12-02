import {useActions} from "common/hooks/useActions";
import {authActions} from "features/auth/model/authSlice";
import {useFormik} from "formik";

export const useLogin = () => {
    const {login} = useActions(authActions)

    const formik = useFormik({

        validate: (values) => {
            if (!values.email) {
                return {email: 'email is required!'}
            }

            if (!values.password) {
                return {password: 'password is required'}
            }
        },

        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },

        onSubmit: async (values) => {
            login(values)
        }
    });
    return {formik}
}