import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import { useLink } from "@refinedev/core";
import { Button } from "@mui/material";

import { logo } from "assets/index";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    const Link = useLink();
    return (
        <Button fullWidth variant="text" disableRipple>
            <Link to="/">
                {collapsed ? (
                    <img src={logo} alt="Yariga" width="28px" height="28px" />
                ) : (
                    <img src={logo} alt="Refine" width="28px" height="28px" />
                )}
            </Link>
        </Button>
    );
};
