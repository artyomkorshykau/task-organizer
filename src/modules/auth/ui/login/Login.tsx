import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup, FormLabel, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import { selectIsLoggedIn } from "modules/auth/model/authSelectors";
import { useLogin } from "common/hooks/useLogin";

export const Login = () => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { formik } = useLogin();

  if (isLoggedIn) return <Navigate to={"/"} />;

  return <Grid container justifyContent="center">
    <Grid item xs={4} display="flex" justifyContent="space-evenly" marginTop="100px">
      <form onSubmit={formik.handleSubmit}>
        <FormLabel>
          <p>To log in get registered <a href="https://social-network.samuraijs.com/" target={"_blank"}>here</a>
            <br />
            or use common test account credentials:
            <br />
            <br />
            Email: free@samuraijs.com
            <br />
            Password: free</p>
        </FormLabel>
        <FormGroup>
          <TextField
            error={!!formik.errors.email}
            label="Email"
            margin="normal"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email ? <div style={{ color: "red" }}>{formik.errors.email}</div> : null}

          <TextField
            error={!!formik.errors.email}
            type="password"
            label="Password"
            margin="normal"
            {...formik.getFieldProps("password")}
          />
          {formik.errors.password ? <div style={{ color: "red" }}>{formik.errors.password}</div> : null}

          <FormControlLabel
            label={"Remember"}
            control={<Checkbox {...formik.getFieldProps("rememberMe")}
                               checked={formik.values.rememberMe}
            />}
          />
          <Button type={"submit"}
                  variant={"contained"}
                  color={"primary"}
                  disabled={formik.isSubmitting}>Sign in
          </Button>
        </FormGroup>
      </form>
    </Grid>
  </Grid>;
};

