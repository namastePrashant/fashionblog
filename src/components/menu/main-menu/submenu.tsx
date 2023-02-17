import clsx from "clsx";
import Anchor from "@ui/anchor";
// import { TSubMenu } from "@utils/types";
// import Link from 'next/link'
import { removeCategoryString } from "@utils/transformMenu";

type TProps = React.HTMLAttributes<HTMLElement> & {
    className?: string;
    menu?: any;
};

const Submenu = ({ menu, className, onFocus, ...rest }: TProps) => {
    return (
        <ul className={clsx(className)} {...rest}>
            {menu.map(
                ({
                    key,
                    title,
                    uri,
                }: {
                    key: string;
                    title: string;
                    uri: string;
                }) => (
                    <li key={key}>
                        <Anchor
                            path={removeCategoryString(uri)}
                            role="menuitem"
                            className="dropdown-item"
                        >
                            {title}
                        </Anchor>
                    </li>
                )
            )}
        </ul>
    );
};

export default Submenu;
