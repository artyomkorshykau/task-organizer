import {useActions} from "common/hooks/useActions";
import {authActions} from "features/auth/model/authSlice";
import {useFormik} from "formik";
import {BaseResponseType} from "features/todolist-list/api/types/api.types";
import {appActions} from "features/app/model/appSlice";

export const useLogin = () => {
    const {login} = useActions(authActions)
    const {setAppError} = useActions(appActions)

    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },

        onSubmit: async (values, formikHelpers) => {
            formikHelpers.setSubmitting(true)
            login(values)
                .unwrap()
                .catch((error: BaseResponseType) => {
                    error.fieldsErrors.forEach(el => {
                        return formikHelpers.setFieldError(el.field, el.error)
                    })
                })
                .finally(() => {
                        formikHelpers.setSubmitting(false)
                        setAppError({error: null})
                    }
                )
        }
    });
    return {formik}
}