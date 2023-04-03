import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import { useLink } from "@refinedev/core";
import { Button } from "@mui/material";

import { logo, miniLogo } from "assets/index";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const Link = useLink();
    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img src={miniLogo} alt="Garażowo" width="100%" height="100%" style={{ padding: "5px"}} />
                ) : (
                    <img src={logo} alt="Garażowo" width="100%" height="100%" style={{ padding: "10px"}} />
                )}
            </Link>
        </Button>
    );
};
