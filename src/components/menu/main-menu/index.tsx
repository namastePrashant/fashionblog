import { TMenu } from "@utils/types";
import NavLink from "./nav-link";
import Submenu from "./submenu";
import { removeCategoryString } from "@utils/transformMenu";

type TProps = {
    className?: string;
    hoverStyle?: "A" | "B";
    color?: "light" | "dark";
    align?: "left" | "right" | "center";
    menu: TMenu[];
    activeKey?: string;
};

const MainMenu = ({ hoverStyle, menu, color, activeKey }: TProps) => {
    // const [focusId, setFocusId] = useState<string | number>("");
    const handleFocusEvent = () => {
        // setFocusId(e.target.id);
    };
    const handleBlurEvent = (e: React.FocusEvent<HTMLAnchorElement>) => {
        if (e.currentTarget.contains(e.relatedTarget)) {
            // setFocusId("");
        }
    };

    return (
        <nav aria-label="Main Menu" className="nav-main-menu">
            <ul
                aria-label="Main Menu"
                role="menubar"
                className="nav justify-content-center"
            >
                {menu.map(
                    ({
                        key,
                        title,
                        uri,
                        url,
                        children,
                    }: {
                        key: string;
                        title: string;
                        uri: string;
                        children: any;
                        url?: string;
                    }) => {
                        const hasSubmenu = children.length > 0;
                        return (
                            <>
                                <li
                                    key={key}
                                    className={`nav-item ${
                                        activeKey === title ? "active-menu" : ""
                                    }`}
                                    role="none"
                                >
                                    {title === "Shop" ? (
                                        <a
                                            href={url}
                                            className="main-menu tw-text-secondary"
                                            target="_blank"
                                        >
                                            SHOP
                                        </a>
                                    ) : (
                                        <NavLink
                                            id={`nav-${key}`}
                                            path={removeCategoryString(uri)}
                                            hoverStyle={hoverStyle}
                                            color={color}
                                            data-toggle={
                                                hasSubmenu ? true : undefined
                                            }
                                            aria-haspopup={
                                                hasSubmenu ? true : undefined
                                            }
                                            aria-expanded={
                                                hasSubmenu ? true : undefined
                                            }
                                            onFocus={handleFocusEvent}
                                            onBlur={handleBlurEvent}
                                        >
                                            {title}
                                            {hasSubmenu ? (
                                                <i className="fa fa-chevron-down tw-ml-2 tw-text-xs" />
                                            ) : (
                                                <></>
                                            )}
                                        </NavLink>
                                    )}
                                    {hasSubmenu && (
                                        <Submenu
                                            menu={children}
                                            className="dropdown-menu"
                                            role="menu"
                                            aria-labelledby={`nav-${key}`}
                                        />
                                    )}
                                    {/* {megamenu && (
                                <Megamenu
                                    menu={megamenu}
                                    align={align}
                                    className="group-hover:tw-visible group-hover:tw-opacity-100 group-hover:tw-mt-0 group-hover:tw-pointer-events-auto group-focus-within:tw-visible group-focus-within:tw-opacity-100 group-focus-within:tw-mt-0 group-focus-within:tw-pointer-events-auto"
                                />
                            )} */}
                                </li>
                            </>
                        );
                    }
                )}
                {/* <li className="subscribe-link">
                    <a href="https://google.com">Subscribe</a>
                </li> */}
            </ul>
        </nav>
    );
};

MainMenu.defaultProps = {
    color: "dark",
};

export default MainMenu;
