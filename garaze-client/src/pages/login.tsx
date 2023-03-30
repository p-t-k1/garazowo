import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";
import { CredentialResponse } from "../interfaces/google";
import {Container, Box, Typography} from "@mui/material";

import { logo } from '../assets';
import {parseJwt} from "../utils/parse-jwt";

import { useNavigation } from "@refinedev/core";

export const Login: React.FC = () => {
    const { mutate: login } = useLogin<CredentialResponse>();

    const { list } = useNavigation();

    const loginTestAccount = async () => {
        const credential = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkcmVzQHRlc3Rvd3kucGwiLCJuYW1lIjoiS29udG8gdGVzdG93ZSIsInBpY3R1cmUiOiJodHRwczovL2ljb25zLWZvci1mcmVlLmNvbS9pY29uZmlsZXMvcG5nLzUxMi9hdmF0YXIraHVtYW4rcGVvcGxlK3Byb2ZpbGUrdXNlcitpY29uLTEzMjAxNjgxMzk0MzEyMTk1OTAucG5nIiwiaWF0IjoxNTE2MjM5MDIyfQ.c9IVg9kV0xUZfJE8rN_179jsX-VHB6ngPtvRz-18ovU';
        const profileObj = parseJwt(credential);
        console.log(profileObj.name, profileObj.email, profileObj.picture)
        if (profileObj) {
            const response = await fetch(
                "http://localhost:8080/api/v1/users",
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        name: profileObj.name,
                        email: profileObj.email,
                        avatar: profileObj.picture,
                    }),
                },
            );

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        ...profileObj,
                        avatar: profileObj.picture,
                        userid: data._id,
                    }),
                );
            } else {
                return Promise.reject();
            }
        }
        localStorage.setItem("token", `${credential}`);
        list("home");
    }

    const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
      <Box component="div" sx={{ backgroundColor: "#FCFCFC" }}>
        <Container
            component="main"
            maxWidth="xs"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100vh",
            }}
        >
          <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
          >
            <div>
              <img src={logo} alt="Logo" height="50px" width="50px" />
            </div>
            <Box mt={4} sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
              <GoogleButton />
                <Typography onClick={() => loginTestAccount()} mt={1} color="#4285F4" style={{cursor: 'pointer'}}>Użyj konta testowego</Typography>
            </Box>
          </Box>
        </Container>
      </Box>
  );
};
